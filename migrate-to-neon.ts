#!/usr/bin/env tsx

/**
 * Neon Database Migration Script
 * 
 * This script helps migrate from Replit PostgreSQL to Neon PostgreSQL
 * by creating the schema and admin account in the Neon database.
 * 
 * Usage: 
 * 1. Set NEON_DATABASE_URL environment variable
 * 2. Run: tsx migrate-to-neon.ts
 */

import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import bcrypt from 'bcryptjs';
import ws from "ws";
import * as schema from "./shared/schema";
import { eq } from 'drizzle-orm';

neonConfig.webSocketConstructor = ws;

async function migrateToNeon() {
  console.log('🚀 Starting migration to Neon PostgreSQL...\n');

  // Check if NEON_DATABASE_URL is provided
  if (!process.env.NEON_DATABASE_URL) {
    console.error('❌ NEON_DATABASE_URL environment variable is required');
    console.log('\nTo migrate to Neon:');
    console.log('1. Create a Neon database at https://neon.tech');
    console.log('2. Set the NEON_DATABASE_URL environment variable');
    console.log('3. Run this script again');
    process.exit(1);
  }

  try {
    // Connect to Neon database
    console.log('1. Connecting to Neon PostgreSQL...');
    const neonPool = new Pool({ connectionString: process.env.NEON_DATABASE_URL });
    const neonDb = drizzle({ client: neonPool, schema });
    console.log('   ✅ Connected to Neon database');

    // Test connection
    console.log('2. Testing database connection...');
    await neonDb.select().from(schema.users).limit(1);
    console.log('   ✅ Database connection successful');

    // Create admin account
    console.log('3. Creating admin account...');
    const email = 'mkanakabailey@gmail.com';
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Check if admin already exists
    const existingUser = await neonDb
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);
    
    if (existingUser.length > 0) {
      console.log('   ⚠️ Admin user already exists, updating...');
      await neonDb
        .update(schema.users)
        .set({
          password: hashedPassword,
          role: 'admin',
          emailVerified: true,
          isActive: true,
          updatedAt: new Date()
        })
        .where(eq(schema.users.email, email));
      console.log('   ✅ Updated existing admin user');
    } else {
      await neonDb
        .insert(schema.users)
        .values({
          email: email,
          password: hashedPassword,
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          emailVerified: true,
          isActive: true,
          profileComplete: true
        });
      console.log('   ✅ Created new admin user');
    }

    // Verify admin account
    console.log('4. Verifying admin account...');
    const adminUser = await neonDb
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);
    
    if (adminUser.length > 0 && adminUser[0].role === 'admin') {
      console.log('   ✅ Admin account verified');
    } else {
      console.log('   ❌ Admin account verification failed');
      process.exit(1);
    }

    await neonPool.end();

    console.log('\n🎉 Migration to Neon PostgreSQL completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Update your environment to use NEON_DATABASE_URL');
    console.log('2. Remove or rename DATABASE_URL to use Neon');
    console.log('3. Restart your application');
    console.log('\nAdmin Login Details:');
    console.log('   Email: mkanakabailey@gmail.com');
    console.log('   Password: admin123');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateToNeon().catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });
}

export { migrateToNeon };