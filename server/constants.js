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

const FORM = {
  destinations: ['Australia', 'Canada', 'United Kingdom', 'USA', 'New Zealand', 'Japan', 'Europe', 'Not sure / Need guidance'],
  intakes: ['Next available intake', '2027 February', '2027 May', '2027 September', 'Not sure'],
  education: ['SEE', '+2', 'Bachelor', 'Master', 'Other'],
  resultTypes: ['GPA', 'Percentage', 'Division', 'Not sure'],
  englishTests: ['IELTS', 'PTE', 'TOEFL', 'Duolingo', 'Not taken yet', 'Not sure'],
  studyLevels: ['Diploma', 'Bachelor', 'Master', 'PhD', 'Not sure'],
  budgets: ['Under NPR 15 lakh', 'NPR 15–25 lakh', 'NPR 25–40 lakh', 'NPR 40+ lakh', 'Need guidance'],
  contactMethods: ['Phone call', 'WhatsApp', 'Office visit', 'Online meeting'],
  contactTimes: ['Morning', 'Afternoon', 'Evening', 'Any time'],
};

module.exports = { STATUSES, STAGES, STAGES_CLOSED, CLOSED_STATUSES, PRIORITIES, ROLES, FORM };
