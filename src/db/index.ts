import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

// Initialize SQLite database
const sqlite = new Database('whatsapp.db');

// Create drizzle database instance
export const db = drizzle(sqlite, { schema });

// Initialize database tables
export const initDb = () => {
  // Users table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      profile_picture TEXT,
      whatsapp_number TEXT,
      whatsapp_connected INTEGER DEFAULT 0,
      created_at INTEGER NOT NULL
    );
  `);

  // Contacts table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      email TEXT,
      notes TEXT,
      created_at INTEGER NOT NULL,
      last_message_at INTEGER,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `);

  // Contact groups table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS contact_groups (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `);

  // Contact group memberships table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS contact_group_memberships (
      contact_id TEXT NOT NULL,
      group_id TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      PRIMARY KEY (contact_id, group_id),
      FOREIGN KEY (contact_id) REFERENCES contacts (id),
      FOREIGN KEY (group_id) REFERENCES contact_groups (id)
    );
  `);

  // Auto responses table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS auto_responses (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      trigger TEXT NOT NULL,
      response TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `);

  // Campaigns table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS campaigns (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL,
      scheduled_for INTEGER,
      sent_count INTEGER DEFAULT 0,
      delivered_count INTEGER DEFAULT 0,
      read_count INTEGER DEFAULT 0,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `);

  // Lead pages table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS lead_pages (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      fields TEXT NOT NULL,
      theme TEXT NOT NULL,
      custom_colors TEXT,
      visits INTEGER DEFAULT 0,
      conversions INTEGER DEFAULT 0,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `);

  // Messages table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      contact_id TEXT NOT NULL,
      content TEXT NOT NULL,
      direction TEXT NOT NULL,
      status TEXT NOT NULL,
      is_automated INTEGER DEFAULT 0,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (contact_id) REFERENCES contacts (id)
    );
  `);

  // Status updates table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS status_updates (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      content TEXT NOT NULL,
      media_url TEXT,
      status TEXT NOT NULL,
      scheduled_for INTEGER,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `);
};