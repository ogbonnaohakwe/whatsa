import { supabase } from '../lib/db';
import { Database } from '../types/supabase';

type Tables = Database['public']['Tables'];

export const databaseService = {
  // Users
  async createUser(userData: Partial<Tables['users']['Insert']>) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Contacts
  async getContacts(userId: string) {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Lead Pages
  async createLeadPage(pageData: Partial<Tables['lead_pages']['Insert']>) {
    const { data, error } = await supabase
      .from('lead_pages')
      .insert([pageData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getLeadPages(userId: string) {
    const { data, error } = await supabase
      .from('lead_pages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Auto Responses
  async createAutoResponse(responseData: Partial<Tables['auto_responses']['Insert']>) {
    const { data, error } = await supabase
      .from('auto_responses')
      .insert([responseData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Campaigns
  async createCampaign(campaignData: Partial<Tables['campaigns']['Insert']>) {
    const { data, error } = await supabase
      .from('campaigns')
      .insert([campaignData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Messages
  async getMessages(userId: string, contactId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', userId)
      .eq('contact_id', contactId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  // Status Updates
  async createStatusUpdate(updateData: Partial<Tables['status_updates']['Insert']>) {
    const { data, error } = await supabase
      .from('status_updates')
      .insert([updateData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};