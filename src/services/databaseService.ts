import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type Tables = Database['public']['Tables'];

export const databaseService = {
  // Check if we're in demo mode
  isDemoMode: () => !supabase,

  // Users
  async createUser(userData: Partial<Tables['users']['Insert']>) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserById(id: string) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Contacts
  async getContacts(userId: string) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createContact(contactData: Partial<Tables['contacts']['Insert']>) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('contacts')
      .insert([contactData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateContact(id: string, updates: Partial<Tables['contacts']['Update']>) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('contacts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteContact(id: string) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Auto Responses
  async getAutoResponses(userId: string) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('auto_responses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createAutoResponse(responseData: Partial<Tables['auto_responses']['Insert']>) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('auto_responses')
      .insert([responseData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateAutoResponse(id: string, updates: Partial<Tables['auto_responses']['Update']>) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('auto_responses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteAutoResponse(id: string) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { error } = await supabase
      .from('auto_responses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Campaigns
  async getCampaigns(userId: string) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createCampaign(campaignData: Partial<Tables['campaigns']['Insert']>) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('campaigns')
      .insert([campaignData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateCampaign(id: string, updates: Partial<Tables['campaigns']['Update']>) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('campaigns')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Lead Pages
  async getLeadPages(userId: string) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('lead_pages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createLeadPage(pageData: Partial<Tables['lead_pages']['Insert']>) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('lead_pages')
      .insert([pageData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Messages
  async getMessages(userId: string, contactId: string) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', userId)
      .eq('contact_id', contactId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async createMessage(messageData: Partial<Tables['messages']['Insert']>) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('messages')
      .insert([messageData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Status Updates
  async getStatusUpdates(userId: string) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('status_updates')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createStatusUpdate(updateData: Partial<Tables['status_updates']['Insert']>) {
    if (!supabase) throw new Error('Database not available in demo mode');
    
    const { data, error } = await supabase
      .from('status_updates')
      .insert([updateData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};