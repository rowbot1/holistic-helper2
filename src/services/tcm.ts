import { supabase } from '@/integrations/supabase/client';

export const tcmService = {
  async indexText(text: string, title?: string) {
    const { data, error } = await supabase.functions.invoke('tcm-vector', {
      body: {
        action: 'index',
        data: { text, title },
      },
    });

    if (error) throw error;
    return data;
  },

  async queryText(query: string, limit: number = 5) {
    const { data, error } = await supabase.functions.invoke('tcm-vector', {
      body: {
        action: 'query',
        data: { query, limit },
      },
    });

    if (error) throw error;
    return data;
  },
};