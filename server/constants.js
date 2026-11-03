// Single source of truth for allowed values on the server.
// Keep in sync with src/lib/validations/enquiry.ts (the public form).

const STATUSES = [
  'NEW', 'CONTACTED', 'COUNSELING_SCHEDULED', 'COUNSELING_COMPLETED',
  'DOCUMENTS_PENDING', 'APPLICATION_STARTED', 'OFFER_RECEIVED', 'VISA_PROCESSING',
  'VISA_GRANTED', 'ENROLLED', 'LOST', 'NOT_INTERESTED', 'INVALID', 'DUPLICATE',
];

const STAGES = [
  'NEW', 'CONTACTED', 'COUNSELLING', 'DOCUMENTATION', 'APPLICATION',
  'OFFER_RECEIVED', 'VISA_PROCESSING', 'VISA_APPROVED', 'VISA_REFUSED', 'CLOSED', 'LOST',
];

const STAGES_CLOSED = ['VISA_APPROVED', 'VISA_REFUSED', 'CLOSED', 'LOST'];

// Leads in these states no longer need a follow-up.
const CLOSED_STATUSES = ['ENROLLED', 'LOST', 'NOT_INTERESTED', 'INVALID', 'DUPLICATE'];

const PRIORITIES = ['LOW', 'NORMAL', 'HIGH', 'URGENT'];
const ROLES = ['ADMIN', 'COUNSELOR'];

// Allowed values for the public enquiry form (POST /api/enquiries).
// Keep in sync with src/lib/validations/enquiry.ts.
const FORM = {
  destinations: ['Australia', 'Canada', 'United Kingdom', 'USA', 'New Zealand', 'Germany', 'Japan', 'Europe', 'Not sure yet'],
  studyLevels: ['Diploma', 'Bachelor', 'Master', 'PhD', 'Not sure'],
  // No longer asked on the form; kept so the admin filter still offers the intakes
  // recorded against leads captured before the form was shortened.
  intakes: ['Next available intake', '2027 February', '2027 May', '2027 September', 'Not sure'],
};

module.exports = { STATUSES, STAGES, STAGES_CLOSED, CLOSED_STATUSES, PRIORITIES, ROLES, FORM };
