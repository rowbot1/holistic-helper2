export interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: string;
  chief_complaint: string;
  tongue_color?: string;
  created_at: string;
  complaint_duration?: string;
}

export type NewPatient = Omit<Patient, 'id' | 'created_at'>;