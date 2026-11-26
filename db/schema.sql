-- Schema exported from the live database by `npm run db:export`.
-- Plain PostgreSQL — apply to an empty database:
--   psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f db/schema.sql

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Sequences
CREATE SEQUENCE public."enquiry_lead_seq"
  START WITH 1 INCREMENT BY 1
  MINVALUE 1 MAXVALUE 9223372036854775807
  NO CYCLE;

-- Functions
CREATE OR REPLACE FUNCTION public.append_audit_event(p_id uuid, p_certificate_id uuid, p_event_type text, p_actor_id text, p_created_at timestamp with time zone, p_metadata jsonb, p_metadata_canonical text, p_expected_previous text, p_event_hash text, p_request_id text, p_ip text, p_user_agent text)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_previous TEXT;
    v_version BIGINT;
BEGIN
    INSERT INTO certificate_audit_heads (certificate_id, last_event_hash, version, updated_at)
    VALUES (p_certificate_id, NULL, 0, now())
    ON CONFLICT (certificate_id) DO NOTHING;

    SELECT last_event_hash, version
    INTO v_previous, v_version
    FROM certificate_audit_heads
    WHERE certificate_id = p_certificate_id
    FOR UPDATE;

    IF COALESCE(v_previous, '') <> COALESCE(p_expected_previous, '') THEN
        -- Someone appended since we read the head. Report the real predecessor.
        RETURN jsonb_build_object(
            'ok', false,
            'previous_event_hash', v_previous,
            'version', v_version
        );
    END IF;

    INSERT INTO certificate_events (
        id, certificate_id, event_type, actor_id, metadata, metadata_canonical,
        created_at, previous_event_hash, event_hash, request_id, ip_address, user_agent
    ) VALUES (
        p_id, p_certificate_id, p_event_type, p_actor_id, p_metadata, p_metadata_canonical,
        p_created_at, v_previous, p_event_hash, p_request_id, p_ip, p_user_agent
    );

    UPDATE certificate_audit_heads
    SET last_event_hash = p_event_hash,
        version = v_version + 1,
        updated_at = now()
    WHERE certificate_id = p_certificate_id;

    RETURN jsonb_build_object(
        'ok', true,
        'previous_event_hash', v_previous,
        'version', v_version + 1
    );
END;
$function$;

CREATE OR REPLACE FUNCTION public.bootstrap_admin_user(p_username text, p_password_hash text, p_role text DEFAULT 'super_admin'::text, p_permissions jsonb DEFAULT '{"issue": true, "create": true, "revoke": true, "preview": true, "download": true, "manageTemplates": true}'::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_id UUID;
BEGIN
    SELECT id INTO v_id FROM admin_users WHERE username = p_username;
    IF v_id IS NOT NULL THEN
        RETURN v_id;
    END IF;

    INSERT INTO admin_users (username, password_hash, role, permissions, is_active)
    VALUES (p_username, p_password_hash, p_role, p_permissions, TRUE)
    RETURNING id INTO v_id;

    RETURN v_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.certificate_event_digest(event_id text, certificate_id text, event_type text, actor_id text, evt_ts timestamp with time zone, evt_metadata jsonb, previous_hash text)
 RETURNS text
 LANGUAGE plpgsql
 IMMUTABLE
AS $function$
BEGIN
    RETURN encode(
        sha256(
            convert_to(
                COALESCE(event_id, '') || '|' ||
                COALESCE(certificate_id, '') || '|' ||
                COALESCE(event_type, '') || '|' ||
                COALESCE(actor_id, '') || '|' ||
                COALESCE(evt_ts, NOW())::text || '|' ||
                COALESCE(evt_metadata::text, '') || '|' ||
                COALESCE(previous_hash, ''),
                'UTF8'
            )
        ),
        'hex'
    );
END;
$function$;

CREATE OR REPLACE FUNCTION public.consume_mfa_challenge(p_token_hash text)
 RETURNS TABLE(ok boolean, admin_user_id uuid, expires_at timestamp with time zone)
 LANGUAGE plpgsql
AS $function$
#variable_conflict use_column
DECLARE
    v_row admin_mfa_challenges%ROWTYPE;
BEGIN
    UPDATE admin_mfa_challenges
    SET consumed_at = NOW(), attempts = attempts + 1
    WHERE token_hash = p_token_hash
      AND consumed_at IS NULL
      AND expires_at > NOW()
    RETURNING * INTO v_row;

    IF NOT FOUND THEN
        -- Consume-then-verify means a wrong code would burn the challenge and
        -- let an attacker lock a legitimate admin out. Instead: only count the
        -- failed attempt here and leave the challenge usable until it expires.
        UPDATE admin_mfa_challenges
        SET attempts = attempts + 1
        WHERE token_hash = p_token_hash
          AND consumed_at IS NULL
          AND expires_at > NOW();

        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TIMESTAMPTZ;
        RETURN;
    END IF;

    RETURN QUERY SELECT TRUE, v_row.admin_user_id, v_row.expires_at;
END;
$function$;

CREATE OR REPLACE FUNCTION public.consume_recovery_code(p_admin_user_id uuid, p_code_hash text)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_rows INTEGER;
BEGIN
    UPDATE admin_mfa_recovery_codes
    SET used_at = NOW()
    WHERE admin_user_id = p_admin_user_id
      AND code_hash = p_code_hash
      AND used_at IS NULL;

    GET DIAGNOSTICS v_rows = ROW_COUNT;
    RETURN v_rows > 0;
END;
$function$;

CREATE OR REPLACE FUNCTION public.finalize_reissue(p_operation_id uuid, p_original_id uuid, p_replacement_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_status TEXT;
BEGIN
    SELECT status INTO v_status
    FROM certificates
    WHERE id = p_original_id
    FOR UPDATE;

    IF v_status IS NULL THEN
        RAISE EXCEPTION 'Original certificate % not found', p_original_id;
    END IF;

    IF v_status NOT IN ('ISSUED', 'REISSUED') THEN
        RAISE EXCEPTION 'Original certificate % is not supersedable (status %)',
            p_original_id, v_status;
    END IF;

    UPDATE certificates
    SET status = 'SUPERSEDED',
        superseded_at = NOW(),
        superseded_by_id = p_replacement_id,
        updated_at = NOW()
    WHERE id = p_original_id;

    UPDATE certificates
    SET reissued_from_id = p_original_id,
        updated_at = NOW()
    WHERE id = p_replacement_id;

    IF p_operation_id IS NOT NULL THEN
        UPDATE reissue_operations
        SET status = 'COMPLETED',
            replacement_certificate_id = p_replacement_id,
            completed_at = NOW()
        WHERE id = p_operation_id;
    END IF;
END;
$function$;

CREATE OR REPLACE FUNCTION public.mark_session_mfa_verified(p_token_hash text)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_rows INTEGER;
BEGIN
    UPDATE admin_sessions
    SET mfa_verified_at = NOW()
    WHERE token_hash = p_token_hash
      AND revoked_at IS NULL
      AND expires_at > NOW();

    GET DIAGNOSTICS v_rows = ROW_COUNT;
    RETURN v_rows > 0;
END;
$function$;

CREATE OR REPLACE FUNCTION public.next_certificate_number(p_prefix text, p_year integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_key TEXT;
    v_next INTEGER;
BEGIN
    v_key := p_prefix || '-' || p_year;

    INSERT INTO certificate_number_sequence (sequence_key, last_value)
    VALUES (v_key, 1)
    ON CONFLICT (sequence_key) DO UPDATE
    SET last_value = certificate_number_sequence.last_value + 1,
        updated_at = NOW()
    RETURNING last_value INTO v_next;

    RETURN v_next;
END;
$function$;

CREATE OR REPLACE FUNCTION public.purge_expired_mfa_state()
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_count INTEGER := 0;
BEGIN
    DELETE FROM admin_mfa_challenges WHERE expires_at < NOW() - INTERVAL '1 day';
    GET DIAGNOSTICS v_count = ROW_COUNT;

    DELETE FROM admin_sessions
    WHERE expires_at < NOW() - INTERVAL '30 days'
       OR (revoked_at IS NOT NULL AND revoked_at < NOW() - INTERVAL '30 days');
    RETURN v_count;
END;
$function$;

CREATE OR REPLACE FUNCTION public.record_totp_step(p_admin_user_id uuid, p_step bigint)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_rows INTEGER;
BEGIN
    UPDATE admin_users
    SET mfa_last_step = p_step,
        updated_at = NOW()
    WHERE id = p_admin_user_id
      AND (mfa_last_step IS NULL OR mfa_last_step < p_step);

    GET DIAGNOSTICS v_rows = ROW_COUNT;
    RETURN v_rows > 0;
END;
$function$;

CREATE OR REPLACE FUNCTION public.reset_admin_mfa(p_admin_user_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
BEGIN
    DELETE FROM admin_mfa_recovery_codes WHERE admin_user_id = p_admin_user_id;
    UPDATE admin_users
    SET mfa_secret = NULL,
        mfa_enabled = FALSE,
        mfa_last_step = NULL,
        mfa_enrolled_at = NULL,
        mfa_required = (role = 'super_admin'),
        updated_at = NOW()
    WHERE id = p_admin_user_id;
    RETURN FOUND;
END;
$function$;

CREATE OR REPLACE FUNCTION public.revoke_admin_session(p_token_hash text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE admin_sessions
    SET revoked_at = NOW()
    WHERE token_hash = p_token_hash
      AND revoked_at IS NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION public.revoke_all_admin_sessions(p_admin_user_id uuid)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_count INTEGER;
BEGIN
    UPDATE admin_sessions
    SET revoked_at = NOW()
    WHERE admin_user_id = p_admin_user_id
      AND revoked_at IS NULL;
    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
END;
$function$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_course_with_modules(p_course_id uuid, p_fields jsonb, p_modules jsonb)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_mod JSONB;
BEGIN
    UPDATE courses
    SET code = COALESCE(p_fields->>'code', code),
        title = COALESCE(p_fields->>'title', title),
        duration = COALESCE(p_fields->>'duration', duration),
        active = (CASE WHEN p_fields ? 'active' THEN (p_fields->>'active')::boolean ELSE active END),
        certificate_title = COALESCE(p_fields->>'certificate_title', certificate_title),
        certificate_template_id = COALESCE(p_fields->>'certificate_template_id', certificate_template_id),
        certificate_template_version = COALESCE(p_fields->>'certificate_template_version', certificate_template_version),
        provider_name = COALESCE(p_fields->>'provider_name', provider_name),
        completion_statement = COALESCE(p_fields->>'completion_statement', completion_statement),
        updated_at = NOW()
    WHERE id = p_course_id;

    IF NOT FOUND THEN
        RETURN false;
    END IF;

    IF p_modules IS NOT NULL AND jsonb_array_length(p_modules) >= 0 THEN
        DELETE FROM course_modules WHERE course_id = p_course_id;

        FOR v_mod IN SELECT * FROM jsonb_array_elements(p_modules) LOOP
            INSERT INTO course_modules (course_id, sort_order, title, subtitle, active)
            VALUES (
                p_course_id,
                (v_mod->>'order')::int,
                COALESCE(v_mod->>'title', ''),
                COALESCE(v_mod->>'subtitle', NULL),
                COALESCE((v_mod->>'active')::boolean, true)
            );
        END LOOP;
    END IF;

    RETURN true;
END;
$function$;

-- Tables
CREATE TABLE public."admin_users" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "username" text NOT NULL,
  "password_hash" text NOT NULL,
  "role" text DEFAULT 'staff'::text NOT NULL,
  "permissions" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "is_active" boolean DEFAULT true NOT NULL,
  "mfa_enabled" boolean DEFAULT false NOT NULL,
  "mfa_secret" text,
  "last_login_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "mfa_last_step" bigint,
  "mfa_enrolled_at" timestamp with time zone,
  "mfa_required" boolean DEFAULT false NOT NULL
);

CREATE TABLE public."certificate_number_sequence" (
  "sequence_key" text NOT NULL,
  "last_value" integer DEFAULT 0 NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public."certificate_templates" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "template_id" text NOT NULL,
  "version" text NOT NULL,
  "status" text DEFAULT 'DRAFT'::text NOT NULL,
  "config" jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "published_at" timestamp with time zone
);

CREATE TABLE public."courses" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "code" text NOT NULL,
  "title" text NOT NULL,
  "duration" text NOT NULL,
  "active" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "certificate_title" text,
  "certificate_template_id" text,
  "certificate_template_version" text,
  "provider_name" text,
  "completion_statement" text
);

CREATE TABLE public."signatories" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "position" text NOT NULL,
  "signature_storage_key" text,
  "active" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "is_default_secondary" boolean DEFAULT false NOT NULL
);

CREATE TABLE public."users" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "email" text NOT NULL,
  "name" text NOT NULL,
  "role" text NOT NULL,
  "password_hash" text NOT NULL,
  "active" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "last_login_at" timestamp with time zone
);

CREATE TABLE public."admin_login_events" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "admin_user_id" uuid,
  "username" text,
  "event_type" text DEFAULT 'login'::text NOT NULL,
  "success" boolean NOT NULL,
  "ip_address" text,
  "user_agent" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public."admin_mfa_challenges" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "admin_user_id" uuid NOT NULL,
  "token_hash" text NOT NULL,
  "consumed_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "expires_at" timestamp with time zone NOT NULL,
  "attempts" integer DEFAULT 0 NOT NULL
);

CREATE TABLE public."admin_mfa_recovery_codes" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "admin_user_id" uuid NOT NULL,
  "code_hash" text NOT NULL,
  "used_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public."admin_sessions" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "admin_user_id" uuid NOT NULL,
  "token_hash" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "expires_at" timestamp with time zone NOT NULL,
  "revoked_at" timestamp with time zone,
  "last_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
  "ip_address" text,
  "user_agent" text,
  "mfa_verified_at" timestamp with time zone,
  "mfa_pending_enrollment" boolean DEFAULT false NOT NULL
);

CREATE TABLE public."certificates" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "certificate_number" text NOT NULL,
  "template_id" text NOT NULL,
  "template_version" text NOT NULL,
  "renderer_version" text NOT NULL,
  "recipient_name" text NOT NULL,
  "student_id" text,
  "program_id" uuid,
  "program_title" text NOT NULL,
  "duration" text NOT NULL,
  "completion_date" date,
  "issue_date" date NOT NULL,
  "grade" text,
  "status" text DEFAULT 'DRAFT'::text NOT NULL,
  "signatory_id" uuid,
  "signatory_name_snapshot" text NOT NULL,
  "signatory_position_snapshot" text NOT NULL,
  "public_visibility" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "pdf_storage_key" text,
  "preview_storage_key" text,
  "issued_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "revoked_at" timestamp with time zone,
  "revocation_reason" text,
  "reissued_from_id" uuid,
  "data_snapshot" jsonb,
  "pdf_sha256" text,
  "pdf_size" bigint,
  "superseded_by_id" uuid,
  "superseded_at" timestamp with time zone,
  "revocation_category" text,
  "verification_token_hash" text,
  "issuing_started_at" timestamp with time zone,
  "last_attempt_at" timestamp with time zone,
  "attempt_count" integer DEFAULT 0 NOT NULL,
  "last_error" text
);

CREATE TABLE public."course_modules" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "course_id" uuid NOT NULL,
  "sort_order" integer NOT NULL,
  "title" text NOT NULL,
  "subtitle" text,
  "active" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public."sessions" (
  "token_hash" text NOT NULL,
  "user_id" uuid NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "expires_at" timestamp with time zone NOT NULL,
  "last_used_at" timestamp with time zone,
  "revoked_at" timestamp with time zone,
  "ip_hash" text,
  "user_agent" text
);

CREATE TABLE public."student_enquiries" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "lead_number" text DEFAULT ('ENQ-'::text || lpad((nextval('enquiry_lead_seq'::regclass))::text, 6, '0'::text)) NOT NULL,
  "full_name" text NOT NULL,
  "phone" text NOT NULL,
  "email" text,
  "preferred_country" text NOT NULL,
  "preferred_intake" text,
  "education_level" text,
  "academic_result_type" text,
  "academic_result" text,
  "english_test" text,
  "english_score" text,
  "study_level" text NOT NULL,
  "preferred_course" text,
  "budget_range" text,
  "preferred_contact_method" text,
  "preferred_contact_time" text,
  "message" text,
  "source_page" text,
  "referrer" text,
  "utm_source" text,
  "utm_medium" text,
  "utm_campaign" text,
  "utm_content" text,
  "utm_term" text,
  "status" text DEFAULT 'NEW'::text NOT NULL,
  "priority" text DEFAULT 'NORMAL'::text NOT NULL,
  "assigned_to" uuid,
  "next_follow_up_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "fingerprint" text
);

CREATE TABLE public."certificate_audit_heads" (
  "certificate_id" uuid NOT NULL,
  "last_event_hash" text,
  "version" bigint DEFAULT 0 NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public."certificate_event_outbox" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "certificate_id" uuid NOT NULL,
  "event_type" text NOT NULL,
  "payload" jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "processed_at" timestamp with time zone,
  "attempt_count" integer DEFAULT 0 NOT NULL,
  "last_error" text
);

CREATE TABLE public."certificate_events" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "certificate_id" uuid NOT NULL,
  "event_type" text NOT NULL,
  "actor_id" text,
  "metadata" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "previous_event_hash" text,
  "event_hash" text,
  "request_id" text,
  "ip_address" text,
  "user_agent" text,
  "metadata_canonical" text
);

CREATE TABLE public."certificate_modules" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "certificate_id" uuid NOT NULL,
  "sort_order" integer NOT NULL,
  "title" text NOT NULL,
  "subtitle" text
);

CREATE TABLE public."enquiry_events" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "enquiry_id" uuid NOT NULL,
  "type" text NOT NULL,
  "actor_id" uuid,
  "actor_name" text,
  "detail" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public."enquiry_notes" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "enquiry_id" uuid NOT NULL,
  "author_id" uuid,
  "author_name" text NOT NULL,
  "body" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public."reissue_operations" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "idempotency_key" text NOT NULL,
  "original_certificate_id" uuid NOT NULL,
  "replacement_certificate_id" uuid,
  "requested_by" text,
  "status" text DEFAULT 'REISSUING'::text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "completed_at" timestamp with time zone
);

-- Constraints
ALTER TABLE public."admin_users" ADD CONSTRAINT "admin_users_pkey" PRIMARY KEY (id);
ALTER TABLE public."admin_users" ADD CONSTRAINT "admin_users_username_key" UNIQUE (username);
ALTER TABLE public."admin_users" ADD CONSTRAINT "admin_users_role_check" CHECK ((role = ANY (ARRAY['super_admin'::text, 'admin'::text, 'staff'::text])));
ALTER TABLE public."certificate_number_sequence" ADD CONSTRAINT "certificate_number_sequence_pkey" PRIMARY KEY (sequence_key);
ALTER TABLE public."certificate_templates" ADD CONSTRAINT "certificate_templates_pkey" PRIMARY KEY (id);
ALTER TABLE public."courses" ADD CONSTRAINT "courses_pkey" PRIMARY KEY (id);
ALTER TABLE public."courses" ADD CONSTRAINT "courses_code_key" UNIQUE (code);
ALTER TABLE public."signatories" ADD CONSTRAINT "signatories_pkey" PRIMARY KEY (id);
ALTER TABLE public."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY (id);
ALTER TABLE public."users" ADD CONSTRAINT "users_role_check" CHECK ((role = ANY (ARRAY['ADMIN'::text, 'COUNSELOR'::text])));
ALTER TABLE public."admin_login_events" ADD CONSTRAINT "admin_login_events_pkey" PRIMARY KEY (id);
ALTER TABLE public."admin_login_events" ADD CONSTRAINT "admin_login_events_admin_user_id_fkey" FOREIGN KEY (admin_user_id) REFERENCES admin_users(id) ON DELETE SET NULL;
ALTER TABLE public."admin_mfa_challenges" ADD CONSTRAINT "admin_mfa_challenges_pkey" PRIMARY KEY (id);
ALTER TABLE public."admin_mfa_challenges" ADD CONSTRAINT "admin_mfa_challenges_token_hash_key" UNIQUE (token_hash);
ALTER TABLE public."admin_mfa_challenges" ADD CONSTRAINT "admin_mfa_challenges_admin_user_id_fkey" FOREIGN KEY (admin_user_id) REFERENCES admin_users(id) ON DELETE CASCADE;
ALTER TABLE public."admin_mfa_recovery_codes" ADD CONSTRAINT "admin_mfa_recovery_codes_pkey" PRIMARY KEY (id);
ALTER TABLE public."admin_mfa_recovery_codes" ADD CONSTRAINT "admin_mfa_recovery_codes_admin_user_id_fkey" FOREIGN KEY (admin_user_id) REFERENCES admin_users(id) ON DELETE CASCADE;
ALTER TABLE public."admin_sessions" ADD CONSTRAINT "admin_sessions_pkey" PRIMARY KEY (id);
ALTER TABLE public."admin_sessions" ADD CONSTRAINT "admin_sessions_token_hash_key" UNIQUE (token_hash);
ALTER TABLE public."admin_sessions" ADD CONSTRAINT "admin_sessions_admin_user_id_fkey" FOREIGN KEY (admin_user_id) REFERENCES admin_users(id) ON DELETE CASCADE;
ALTER TABLE public."certificates" ADD CONSTRAINT "certificates_pkey" PRIMARY KEY (id);
ALTER TABLE public."certificates" ADD CONSTRAINT "certificates_certificate_number_key" UNIQUE (certificate_number);
ALTER TABLE public."certificates" ADD CONSTRAINT "certificates_dates_check" CHECK (((completion_date IS NULL) OR (issue_date IS NULL) OR (completion_date <= issue_date)));
ALTER TABLE public."certificates" ADD CONSTRAINT "certificates_status_check" CHECK ((status = ANY (ARRAY['DRAFT'::text, 'ISSUING'::text, 'PREVIEW'::text, 'ISSUE_FAILED'::text, 'ADMIN_REVIEW'::text, 'ISSUED'::text, 'SUPERSEDED'::text, 'REVOKED'::text, 'REISSUED'::text, 'CANCELLED'::text])));
ALTER TABLE public."certificates" ADD CONSTRAINT "certificates_program_id_fkey" FOREIGN KEY (program_id) REFERENCES courses(id);
ALTER TABLE public."certificates" ADD CONSTRAINT "certificates_reissued_from_id_fkey" FOREIGN KEY (reissued_from_id) REFERENCES certificates(id);
ALTER TABLE public."certificates" ADD CONSTRAINT "certificates_signatory_id_fkey" FOREIGN KEY (signatory_id) REFERENCES signatories(id);
ALTER TABLE public."certificates" ADD CONSTRAINT "certificates_superseded_by_id_fkey" FOREIGN KEY (superseded_by_id) REFERENCES certificates(id);
ALTER TABLE public."course_modules" ADD CONSTRAINT "course_modules_pkey" PRIMARY KEY (id);
ALTER TABLE public."course_modules" ADD CONSTRAINT "course_modules_course_id_fkey" FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE;
ALTER TABLE public."sessions" ADD CONSTRAINT "sessions_pkey" PRIMARY KEY (token_hash);
ALTER TABLE public."sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE public."student_enquiries" ADD CONSTRAINT "student_enquiries_pkey" PRIMARY KEY (id);
ALTER TABLE public."student_enquiries" ADD CONSTRAINT "student_enquiries_lead_number_key" UNIQUE (lead_number);
ALTER TABLE public."student_enquiries" ADD CONSTRAINT "student_enquiries_priority_check" CHECK ((priority = ANY (ARRAY['LOW'::text, 'NORMAL'::text, 'HIGH'::text, 'URGENT'::text])));
ALTER TABLE public."student_enquiries" ADD CONSTRAINT "student_enquiries_status_check" CHECK ((status = ANY (ARRAY['NEW'::text, 'CONTACTED'::text, 'COUNSELING_SCHEDULED'::text, 'COUNSELING_COMPLETED'::text, 'DOCUMENTS_PENDING'::text, 'APPLICATION_STARTED'::text, 'OFFER_RECEIVED'::text, 'VISA_PROCESSING'::text, 'VISA_GRANTED'::text, 'ENROLLED'::text, 'LOST'::text, 'NOT_INTERESTED'::text, 'INVALID'::text, 'DUPLICATE'::text])));
ALTER TABLE public."student_enquiries" ADD CONSTRAINT "student_enquiries_assigned_to_fkey" FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE public."certificate_audit_heads" ADD CONSTRAINT "certificate_audit_heads_pkey" PRIMARY KEY (certificate_id);
ALTER TABLE public."certificate_audit_heads" ADD CONSTRAINT "certificate_audit_heads_certificate_id_fkey" FOREIGN KEY (certificate_id) REFERENCES certificates(id) ON DELETE CASCADE;
ALTER TABLE public."certificate_event_outbox" ADD CONSTRAINT "certificate_event_outbox_pkey" PRIMARY KEY (id);
ALTER TABLE public."certificate_event_outbox" ADD CONSTRAINT "certificate_event_outbox_certificate_id_fkey" FOREIGN KEY (certificate_id) REFERENCES certificates(id) ON DELETE CASCADE;
ALTER TABLE public."certificate_events" ADD CONSTRAINT "certificate_events_pkey" PRIMARY KEY (id);
ALTER TABLE public."certificate_events" ADD CONSTRAINT "certificate_events_certificate_id_fkey" FOREIGN KEY (certificate_id) REFERENCES certificates(id) ON DELETE CASCADE;
ALTER TABLE public."certificate_modules" ADD CONSTRAINT "certificate_modules_pkey" PRIMARY KEY (id);
ALTER TABLE public."certificate_modules" ADD CONSTRAINT "certificate_modules_certificate_id_fkey" FOREIGN KEY (certificate_id) REFERENCES certificates(id) ON DELETE CASCADE;
ALTER TABLE public."enquiry_events" ADD CONSTRAINT "enquiry_events_pkey" PRIMARY KEY (id);
ALTER TABLE public."enquiry_events" ADD CONSTRAINT "enquiry_events_actor_id_fkey" FOREIGN KEY (actor_id) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE public."enquiry_events" ADD CONSTRAINT "enquiry_events_enquiry_id_fkey" FOREIGN KEY (enquiry_id) REFERENCES student_enquiries(id) ON DELETE CASCADE;
ALTER TABLE public."enquiry_notes" ADD CONSTRAINT "enquiry_notes_pkey" PRIMARY KEY (id);
ALTER TABLE public."enquiry_notes" ADD CONSTRAINT "enquiry_notes_author_id_fkey" FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE public."enquiry_notes" ADD CONSTRAINT "enquiry_notes_enquiry_id_fkey" FOREIGN KEY (enquiry_id) REFERENCES student_enquiries(id) ON DELETE CASCADE;
ALTER TABLE public."reissue_operations" ADD CONSTRAINT "reissue_operations_pkey" PRIMARY KEY (id);
ALTER TABLE public."reissue_operations" ADD CONSTRAINT "reissue_operations_idempotency_key_key" UNIQUE (idempotency_key);
ALTER TABLE public."reissue_operations" ADD CONSTRAINT "reissue_operations_status_check" CHECK ((status = ANY (ARRAY['REISSUE_REQUESTED'::text, 'REISSUING'::text, 'REPLACEMENT_CREATED'::text, 'ORIGINAL_SUPERSEDED'::text, 'COMPLETED'::text, 'REISSUE_FAILED'::text])));
ALTER TABLE public."reissue_operations" ADD CONSTRAINT "reissue_operations_original_certificate_id_fkey" FOREIGN KEY (original_certificate_id) REFERENCES certificates(id);
ALTER TABLE public."reissue_operations" ADD CONSTRAINT "reissue_operations_replacement_certificate_id_fkey" FOREIGN KEY (replacement_certificate_id) REFERENCES certificates(id);

-- Indexes
CREATE UNIQUE INDEX IF NOT EXISTS one_default_secondary_signatory ON public.signatories USING btree (is_default_secondary) WHERE (is_default_secondary = true);
CREATE UNIQUE INDEX IF NOT EXISTS uq_signatories_default_secondary ON public.signatories USING btree (is_default_secondary) WHERE ((is_default_secondary = true) AND (active = true));
CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx ON public.users USING btree (lower(email));
CREATE INDEX IF NOT EXISTS idx_admin_login_events_user ON public.admin_login_events USING btree (admin_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_mfa_challenges_expiry ON public.admin_mfa_challenges USING btree (expires_at);
CREATE INDEX IF NOT EXISTS idx_admin_mfa_challenges_user ON public.admin_mfa_challenges USING btree (admin_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_mfa_recovery_codes_user ON public.admin_mfa_recovery_codes USING btree (admin_user_id) WHERE (used_at IS NULL);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_active ON public.admin_sessions USING btree (expires_at) WHERE (revoked_at IS NULL);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_user ON public.admin_sessions USING btree (admin_user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_certificate_number ON public.certificates USING btree (certificate_number);
CREATE INDEX IF NOT EXISTS idx_certificates_issue_date ON public.certificates USING btree (issue_date);
CREATE INDEX IF NOT EXISTS idx_certificates_issuing_started ON public.certificates USING btree (status, issuing_started_at) WHERE (status = 'ISSUING'::text);
CREATE INDEX IF NOT EXISTS idx_certificates_number_prefix ON public.certificates USING btree (certificate_number text_pattern_ops);
CREATE INDEX IF NOT EXISTS idx_certificates_recipient_name ON public.certificates USING btree (recipient_name);
CREATE INDEX IF NOT EXISTS idx_certificates_status ON public.certificates USING btree (status);
CREATE INDEX IF NOT EXISTS idx_certificates_superseded_by ON public.certificates USING btree (superseded_by_id);
CREATE UNIQUE INDEX IF NOT EXISTS uq_certificates_verification_token_hash ON public.certificates USING btree (verification_token_hash) WHERE (verification_token_hash IS NOT NULL);
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON public.course_modules USING btree (course_id);
CREATE INDEX IF NOT EXISTS sessions_expires_idx ON public.sessions USING btree (expires_at);
CREATE INDEX IF NOT EXISTS sessions_revoked_idx ON public.sessions USING btree (revoked_at) WHERE (revoked_at IS NULL);
CREATE INDEX IF NOT EXISTS sessions_user_idx ON public.sessions USING btree (user_id);
CREATE INDEX IF NOT EXISTS enq_assigned_idx ON public.student_enquiries USING btree (assigned_to);
CREATE INDEX IF NOT EXISTS enq_created_idx ON public.student_enquiries USING btree (created_at DESC);
CREATE INDEX IF NOT EXISTS enq_followup_idx ON public.student_enquiries USING btree (next_follow_up_at) WHERE (next_follow_up_at IS NOT NULL);
CREATE INDEX IF NOT EXISTS enq_phone_idx ON public.student_enquiries USING btree (phone, created_at DESC);
CREATE INDEX IF NOT EXISTS enq_status_idx ON public.student_enquiries USING btree (status);
CREATE UNIQUE INDEX IF NOT EXISTS enquiries_fingerprint_idx ON public.student_enquiries USING btree (fingerprint) WHERE (fingerprint IS NOT NULL);
CREATE INDEX IF NOT EXISTS idx_enquiries_country ON public.student_enquiries USING btree (preferred_country);
CREATE INDEX IF NOT EXISTS idx_enquiries_priority ON public.student_enquiries USING btree (priority);
CREATE INDEX IF NOT EXISTS idx_certificate_event_outbox_pending ON public.certificate_event_outbox USING btree (created_at) WHERE (processed_at IS NULL);
CREATE UNIQUE INDEX IF NOT EXISTS uq_certificate_event_outbox_event_id ON public.certificate_event_outbox USING btree (((payload ->> 'id'::text)));
CREATE INDEX IF NOT EXISTS idx_certificate_events_certificate_id ON public.certificate_events USING btree (certificate_id);
CREATE INDEX IF NOT EXISTS idx_certificate_events_request_id ON public.certificate_events USING btree (request_id);
CREATE INDEX IF NOT EXISTS idx_certificate_modules_certificate_id ON public.certificate_modules USING btree (certificate_id);
CREATE INDEX IF NOT EXISTS events_enquiry_idx ON public.enquiry_events USING btree (enquiry_id, created_at DESC);
CREATE INDEX IF NOT EXISTS notes_enquiry_idx ON public.enquiry_notes USING btree (enquiry_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reissue_operations_original ON public.reissue_operations USING btree (original_certificate_id);
CREATE INDEX IF NOT EXISTS idx_reissue_operations_status ON public.reissue_operations USING btree (status);

-- Triggers
CREATE TRIGGER trg_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_signatories_updated_at BEFORE UPDATE ON public.signatories FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_certificates_updated_at BEFORE UPDATE ON public.certificates FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_student_enquiries_updated_at BEFORE UPDATE ON public.student_enquiries FOR EACH ROW EXECUTE FUNCTION set_updated_at();
