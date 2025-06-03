import { faker } from '@faker-js/faker';
import { Contact, ContactGroup, Message, AutoResponse, Campaign, StatusUpdate, OptinPage } from '../types';

// Create 20 mock contacts
export const mockContacts: Contact[] = Array.from({ length: 20 }, (_, i) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  phoneNumber: faker.phone.number(),
  email: faker.internet.email(),
  notes: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.7 }),
  groups: faker.helpers.arrayElements(['friends', 'work', 'family', 'leads'], { min: 0, max: 2 }),
  tags: faker.helpers.arrayElements(['customer', 'prospect', 'hot-lead', 'cold-lead'], { min: 0, max: 3 }),
  createdAt: faker.date.past(),
  lastMessageAt: faker.helpers.maybe(() => faker.date.recent(), { probability: 0.8 }),
}));

// Create 5 mock contact groups
export const mockContactGroups: ContactGroup[] = [
  {
    id: '1',
    name: 'Friends',
    description: 'Personal friends and acquaintances',
    contactCount: 8,
    createdAt: faker.date.past(),
  },
  {
    id: '2',
    name: 'Work',
    description: 'Work-related contacts',
    contactCount: 12,
    createdAt: faker.date.past(),
  },
  {
    id: '3',
    name: 'Family',
    description: 'Family members',
    contactCount: 5,
    createdAt: faker.date.past(),
  },
  {
    id: '4',
    name: 'Leads',
    description: 'Potential customers',
    contactCount: 15,
    createdAt: faker.date.past(),
  },
  {
    id: '5',
    name: 'VIP Customers',
    description: 'High-priority customers',
    contactCount: 7,
    createdAt: faker.date.past(),
  },
];

// Create mock messages for a single conversation
export const mockMessages: Message[] = Array.from({ length: 10 }, (_, i) => ({
  id: faker.string.uuid(),
  content: faker.lorem.sentence(),
  sender: faker.helpers.arrayElement(['user', 'contact']),
  contactId: '1',
  timestamp: faker.date.recent({ days: 3 }),
  status: faker.helpers.arrayElement(['sent', 'delivered', 'read', 'failed']),
  isAutomated: faker.helpers.arrayElement([true, false]),
})).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

// Create 5 mock auto-responses
export const mockAutoResponses: AutoResponse[] = [
  {
    id: '1',
    name: 'Welcome Message',
    trigger: 'hello, hi, hey',
    response: 'Hello there! Thanks for reaching out. How can I help you today?',
    isActive: true,
    createdAt: faker.date.past(),
  },
  {
    id: '2',
    name: 'Business Hours',
    trigger: 'hours, open, business hours',
    response: 'Our business hours are Monday-Friday 9am to 5pm. How else can I assist you?',
    isActive: true,
    createdAt: faker.date.past(),
  },
  {
    id: '3',
    name: 'Pricing Information',
    trigger: 'price, pricing, cost, how much',
    response: 'Our pricing starts at $99/month. Would you like to schedule a demo to learn more?',
    isActive: true,
    createdAt: faker.date.past(),
  },
  {
    id: '4',
    name: 'Away Message',
    trigger: '*',
    response: "I'm currently away from my desk. I'll get back to you as soon as possible!",
    isActive: false,
    createdAt: faker.date.past(),
  },
  {
    id: '5',
    name: 'Support Request',
    trigger: 'support, help, issue, problem',
    response: "I understand you need help. Please provide more details about your issue, and I'll assist you promptly.",
    isActive: true,
    createdAt: faker.date.past(),
  },
];

// Create 3 mock campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale Announcement',
    message: "Don't miss our summer sale! Get 30% off all products until the end of the month. Shop now at example.com",
    status: 'completed',
    targetGroups: ['1', '4'],
    scheduledFor: faker.date.past(),
    sentCount: 23,
    deliveredCount: 23,
    readCount: 19,
    createdAt: faker.date.past(),
  },
  {
    id: '2',
    name: 'Product Launch',
    message: 'Exciting news! Our new product is now available. Be the first to try it at example.com/new',
    status: 'scheduled',
    targetGroups: ['4', '5'],
    scheduledFor: faker.date.future(),
    sentCount: 0,
    deliveredCount: 0,
    readCount: 0,
    createdAt: faker.date.past(),
  },
  {
    id: '3',
    name: 'Feedback Request',
    message: 'We value your opinion! Please take our short survey and help us improve: example.com/survey',
    status: 'draft',
    targetGroups: ['1', '2', '3', '4', '5'],
    sentCount: 0,
    deliveredCount: 0,
    readCount: 0,
    createdAt: faker.date.past(),
  },
];

// Create 4 mock status updates
export const mockStatusUpdates: StatusUpdate[] = [
  {
    id: '1',
    content: 'Limited time offer! 🔥 24-hour flash sale happening now. Message us to claim your discount.',
    mediaUrl: 'https://images.pexels.com/photos/5625013/pexels-photo-5625013.jpeg',
    status: 'posted',
    createdAt: faker.date.recent(),
  },
  {
    id: '2',
    content: 'New product sneak peek! Coming next week...',
    mediaUrl: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg',
    status: 'scheduled',
    scheduledFor: faker.date.future(),
    createdAt: faker.date.recent(),
  },
  {
    id: '3',
    content: 'Customer testimonial: "This product changed my life!" - Jane D.',
    status: 'draft',
    createdAt: faker.date.recent(),
  },
  {
    id: '4',
    content: "We'll be at the industry expo next month. Book a meeting with us!",
    mediaUrl: 'https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg',
    status: 'posted',
    createdAt: faker.date.recent(),
  },
];

// Create 2 mock optin pages
export const mockOptinPages: OptinPage[] = [
  {
    id: '1',
    name: 'Free Ebook Download',
    description: 'Lead capture for digital marketing ebook',
    fields: [
      { id: '1', type: 'text', label: 'Name', placeholder: 'Your full name', required: true },
      { id: '2', type: 'email', label: 'Email', placeholder: 'Your email address', required: true },
      { id: '3', type: 'phone', label: 'WhatsApp Number', placeholder: 'Your WhatsApp number', required: true },
      { id: '4', type: 'checkbox', label: 'I agree to receive marketing messages', required: true },
    ],
    theme: 'light',
    targetGroup: '4',
    createdAt: faker.date.past(),
    visits: 342,
    conversions: 128,
  },
  {
    id: '2',
    name: 'Webinar Registration',
    description: 'Registration page for upcoming webinar',
    fields: [
      { id: '1', type: 'text', label: 'Name', placeholder: 'Your full name', required: true },
      { id: '2', type: 'email', label: 'Email', placeholder: 'Your email address', required: true },
      { id: '3', type: 'phone', label: 'WhatsApp Number', placeholder: 'Your WhatsApp number', required: true },
      { id: '4', type: 'select', label: 'How did you hear about us?', required: false, options: ['Social Media', 'Friend', 'Google', 'Email', 'Other'] },
    ],
    theme: 'custom',
    customColors: {
      primary: '#4F46E5',
      background: '#F9FAFB',
      text: '#1F2937',
    },
    targetGroup: '4',
    createdAt: faker.date.past(),
    visits: 523,
    conversions: 217,
  },
];

// Dashboard stats
export const mockDashboardStats = {
  totalContacts: 287,
  activeAutomations: 5,
  messagesSent: {
    today: 42,
    thisWeek: 312,
    thisMonth: 1254,
  },
  responseRate: 86,
  leadsCaptured: {
    today: 7,
    thisWeek: 38,
    thisMonth: 145,
  },
};

// Mock weekly message data for chart
export const mockWeeklyMessageData = [
  { name: 'Mon', sent: 53, delivered: 52, read: 48 },
  { name: 'Tue', sent: 72, delivered: 70, read: 65 },
  { name: 'Wed', sent: 48, delivered: 48, read: 42 },
  { name: 'Thu', sent: 63, delivered: 62, read: 57 },
  { name: 'Fri', sent: 82, delivered: 79, read: 72 },
  { name: 'Sat', sent: 29, delivered: 29, read: 25 },
  { name: 'Sun', sent: 18, delivered: 18, read: 15 },
];