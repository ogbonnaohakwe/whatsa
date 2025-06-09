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
    accent?: string;
    border?: string;
  };
  redirectUrl?: string;
  targetGroup?: string;
  createdAt: Date;
  visits: number;
  conversions: number;
  formSettings?: FormSettings;
  textFormatting?: TextFormatting;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'checkbox' | 'select';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    customMessage?: string;
  };
}

export interface FormSettings {
  submitButtonText: string;
  successMessage: string;
  errorMessage: string;
  enableProgressBar: boolean;
  enableFieldValidation: boolean;
  enableAutoSave: boolean;
  enableCaptcha: boolean;
  enableAnalytics: boolean;
  maxSubmissions: number;
  enableScheduling: boolean;
  startDate: string;
  endDate: string;
  enableGeoTargeting: boolean;
  allowedCountries: string[];
  enableDeviceTargeting: boolean;
  allowedDevices: string[];
  enableABTesting: boolean;
  formWidth: 'small' | 'medium' | 'large' | 'full';
  formAlignment: 'left' | 'center' | 'right';
  enableShadow: boolean;
  enableBorder: boolean;
  borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full';
  enableAnimation: boolean;
  animationType: 'fadeIn' | 'slideUp' | 'slideDown' | 'zoomIn';
  enableTypography: boolean;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  lineHeight: 'tight' | 'normal' | 'relaxed';
  enableSpacing: boolean;
  fieldSpacing: 'small' | 'medium' | 'large';
  sectionSpacing: 'small' | 'medium' | 'large';
}

export interface TextFormatting {
  headingStyle: {
    fontSize: string;
    fontWeight: string;
    color: string;
    alignment: 'left' | 'center' | 'right';
    decoration: string;
  };
  descriptionStyle: {
    fontSize: string;
    fontWeight: string;
    color: string;
    alignment: 'left' | 'center' | 'right';
    decoration: string;
  };
  labelStyle: {
    fontSize: string;
    fontWeight: string;
    color: string;
    alignment: 'left' | 'center' | 'right';
    decoration: string;
  };
  buttonStyle: {
    fontSize: string;
    fontWeight: string;
    color: string;
    backgroundColor: string;
    borderRadius: string;
    padding: string;
  };
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