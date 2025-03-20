import { Injectable } from '@angular/core';
import { supabase } from '../../../../supabase';

@Injectable({
  providedIn: 'root'
})
export class SupabaseContactFormService {
  constructor() {}

  async sendMessage(name: string, email: string, message: string) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, message }]);

    if (error) {
      console.error('Error inserting data:', error);
      throw error; // Хвърляме грешката, за да я обработи компонентът
    }

    return data;
  }
}
