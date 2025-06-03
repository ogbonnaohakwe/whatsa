export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          password: string
          profile_picture: string | null
          whatsapp_number: string | null
          whatsapp_connected: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          password: string
          profile_picture?: string | null
          whatsapp_number?: string | null
          whatsapp_connected?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          password?: string
          profile_picture?: string | null
          whatsapp_number?: string | null
          whatsapp_connected?: boolean
          created_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          user_id: string
          name: string
          phone_number: string
          email: string | null
          notes: string | null
          created_at: string
          last_message_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          phone_number: string
          email?: string | null
          notes?: string | null
          created_at?: string
          last_message_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          phone_number?: string
          email?: string | null
          notes?: string | null
          created_at?: string
          last_message_at?: string | null
        }
      }
      contact_groups: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      contact_group_memberships: {
        Row: {
          contact_id: string
          group_id: string
          created_at: string
        }
        Insert: {
          contact_id: string
          group_id: string
          created_at?: string
        }
        Update: {
          contact_id?: string
          group_id?: string
          created_at?: string
        }
      }
      auto_responses: {
        Row: {
          id: string
          user_id: string
          name: string
          trigger: string
          response: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          trigger: string
          response: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          trigger?: string
          response?: string
          is_active?: boolean
          created_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          user_id: string
          name: string
          message: string
          status: string
          scheduled_for: string | null
          sent_count: number
          delivered_count: number
          read_count: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          message: string
          status: string
          scheduled_for?: string | null
          sent_count?: number
          delivered_count?: number
          read_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          message?: string
          status?: string
          scheduled_for?: string | null
          sent_count?: number
          delivered_count?: number
          read_count?: number
          created_at?: string
        }
      }
      lead_pages: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          fields: Json
          theme: string
          custom_colors: Json | null
          visits: number
          conversions: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          fields: Json
          theme: string
          custom_colors?: Json | null
          visits?: number
          conversions?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          fields?: Json
          theme?: string
          custom_colors?: Json | null
          visits?: number
          conversions?: number
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          user_id: string
          contact_id: string
          content: string
          direction: string
          status: string
          is_automated: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          contact_id: string
          content: string
          direction: string
          status: string
          is_automated?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          contact_id?: string
          content?: string
          direction?: string
          status?: string
          is_automated?: boolean
          created_at?: string
        }
      }
      status_updates: {
        Row: {
          id: string
          user_id: string
          content: string
          media_url: string | null
          status: string
          scheduled_for: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          media_url?: string | null
          status: string
          scheduled_for?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          media_url?: string | null
          status?: string
          scheduled_for?: string | null
          created_at?: string
        }
      }
    }
  }
}