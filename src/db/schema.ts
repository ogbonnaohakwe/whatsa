import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  profilePicture: text('profile_picture'),
  whatsappNumber: text('whatsapp_number'),
  whatsappConnected: integer('whatsapp_connected', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const contacts = sqliteTable('contacts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  phoneNumber: text('phone_number').notNull(),
  email: text('email'),
  notes: text('notes'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  lastMessageAt: integer('last_message_at', { mode: 'timestamp' })
});

export const contactGroups = sqliteTable('contact_groups', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const contactGroupMemberships = sqliteTable('contact_group_memberships', {
  contactId: text('contact_id').notNull().references(() => contacts.id),
  groupId: text('group_id').notNull().references(() => contactGroups.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const autoResponses = sqliteTable('auto_responses', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  trigger: text('trigger').notNull(),
  response: text('response').notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const campaigns = sqliteTable('campaigns', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull(),
  scheduledFor: integer('scheduled_for', { mode: 'timestamp' }),
  sentCount: integer('sent_count').default(0),
  deliveredCount: integer('delivered_count').default(0),
  readCount: integer('read_count').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const leadPages = sqliteTable('lead_pages', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  description: text('description'),
  fields: text('fields').notNull(), // JSON string
  theme: text('theme').notNull(),
  customColors: text('custom_colors'), // JSON string
  visits: integer('visits').default(0),
  conversions: integer('conversions').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  contactId: text('contact_id').notNull().references(() => contacts.id),
  content: text('content').notNull(),
  direction: text('direction').notNull(), // 'inbound' or 'outbound'
  status: text('status').notNull(),
  isAutomated: integer('is_automated', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const statusUpdates = sqliteTable('status_updates', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  mediaUrl: text('media_url'),
  status: text('status').notNull(),
  scheduledFor: integer('scheduled_for', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});