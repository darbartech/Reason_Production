import { PREFERRED_DESTINATIONS, STUDY_LEVELS } from '@/lib/validations/enquiry';

// Single source of truth for allowed values on the server.
// The form lists are imported from the client schema so the two cannot drift.

export const STATUSES = [
  'NEW', 'CONTACTED', 'COUNSELING_SCHEDULED', 'COUNSELING_COMPLETED',
  'DOCUMENTS_PENDING', 'APPLICATION_STARTED', 'OFFER_RECEIVED', 'VISA_PROCESSING',
  'VISA_GRANTED', 'ENROLLED', 'LOST', 'NOT_INTERESTED', 'INVALID', 'DUPLICATE',
];

export const STAGES = [
  'NEW', 'CONTACTED', 'COUNSELLING', 'DOCUMENTATION', 'APPLICATION',
  'OFFER_RECEIVED', 'VISA_PROCESSING', 'VISA_APPROVED', 'VISA_REFUSED', 'CLOSED', 'LOST',
];

export const STAGES_CLOSED = ['VISA_APPROVED', 'VISA_REFUSED', 'CLOSED', 'LOST'];

// Leads in these states no longer need a follow-up.
export const CLOSED_STATUSES = ['ENROLLED', 'LOST', 'NOT_INTERESTED', 'INVALID', 'DUPLICATE'];

export const PRIORITIES = ['LOW', 'NORMAL', 'HIGH', 'URGENT'];
export const ROLES = ['ADMIN', 'COUNSELOR'];

export const FORM = {
  destinations: [...PREFERRED_DESTINATIONS],
  studyLevels: [...STUDY_LEVELS],
  // No longer asked on the form; kept so the admin filter still offers the intakes
  // recorded against leads captured before the form was shortened.
  intakes: ['Next available intake', '2027 February', '2027 May', '2027 September', 'Not sure'],
};
