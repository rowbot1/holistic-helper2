export interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: string;
  chief_complaint: string;
  tongue_color?: string;
  created_at: string;
  complaint_duration?: string;
  tcm_inspection?: any;
  tcm_auscultation?: any;
  tcm_inquiry?: any;
  tcm_palpation?: any;
}

export type NewPatient = Omit<Patient, 'id' | 'created_at'>;