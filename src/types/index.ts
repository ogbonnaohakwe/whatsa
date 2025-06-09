export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  phoneNumber?: string;
  whatsappConnected: boolean;
  createdAt: Date;
}

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  notes?: string;
  groups: string[];
  tags: string[];
  createdAt: Date;
  lastMessageAt?: Date;
}

export interface ContactGroup {
  id: string;
  name: string;
  description?: string;
  contactCount: number;
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'contact';
  contactId: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  isAutomated: boolean;
}

export interface AutoResponse {
  id: string;
  name: string;
  trigger: string;
  response: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Campaign {
  id: string;
  name: string;
  message: string;
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'failed';
  targetGroups: string[];
  scheduledFor?: Date;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  createdAt: Date;
}

export interface StatusUpdate {
  id: string;
  content: string;
  mediaUrl?: string;
  status: 'draft' | 'scheduled' | 'posted';
  scheduledFor?: Date;
  createdAt: Date;
}

export interface OptinPage {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
  theme: 'light' | 'dark' | 'custom';
  customColors?: {
    primary: string;
    background: string;
    text: string;
  };
  redirectUrl?: string;
  targetGroup?: string;
  createdAt: Date;
  visits: number;
  conversions: number;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'checkbox' | 'select';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface DashboardStats {
  totalContacts: number;
  activeAutomations: number;
  messagesSent: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  responseRate: number;
  leadsCaptured: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
}