import { supabase } from '@/integrations/supabase/client';
import { Patient, NewPatient } from '@/types/patient';

export const patientsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Patient[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as Patient;
  },

  async create(patient: NewPatient) {
    const { data, error } = await supabase
      .from('patients')
      .insert([patient])
      .select()
      .maybeSingle();

    if (error) throw error;
    return data as Patient;
  },

  async update(id: string, patient: Partial<NewPatient>) {
    const { data, error } = await supabase
      .from('patients')
      .update(patient)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data as Patient;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};