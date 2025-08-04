#!/usr/bin/env tsx

/**
 * Neon Database Connection Setup Script
 * 
 * This script automatically configures the Neon database connection
 * for the 2Pbal project and verifies everything is working correctly.
 * 
 * Usage: tsx setup-neon-connection.ts
 */

import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "./shared/schema";

neonConfig.webSocketConstructor = ws;

// Official 2Pbal Neon Database Connection String
const NEON_CONNECTION_STRING = "postgresql://neondb_owner:npg_t9xbTn7YIyPK@ep-raspy-feather-afz1ts7h-pooler.c-2.us-west-2.aws.neon.tech/2pal?sslmode=require&channel_binding=require";

async function setupNeonConnection() {
  console.log('🔧 Setting up Neon PostgreSQL connection for 2Pbal...\n');

  try {
    // Test the connection
    console.log('1. Testing Neon database connection...');
    const neonPool = new Pool({ connectionString: NEON_CONNECTION_STRING });
    const neonDb = drizzle({ client: neonPool, schema });

    // Verify connection
    const connectionTest = await neonDb.select().from(schema.users).limit(1);
    console.log('   ✅ Neon database connection successful');

    // Check database details
    const result = await neonPool.query('SELECT current_database(), current_user, version()');
    const dbInfo = result.rows[0];
    
    console.log(`   ✅ Connected to database: ${dbInfo.current_database}`);
    console.log(`   ✅ User: ${dbInfo.current_user}`);
    console.log(`   ✅ PostgreSQL version: ${dbInfo.version.split(',')[0]}`);

    // Verify admin account exists
    console.log('2. Checking admin account...');
    const { eq } = await import('drizzle-orm');
    const adminCheck = await neonDb.select()
      .from(schema.users)
      .where(eq(schema.users.email, 'mkanakabailey@gmail.com'))
      .limit(1);

    if (adminCheck.length > 0) {
      console.log('   ✅ Admin account found and verified');
    } else {
      console.log('   ⚠️ Admin account not found - may need to be created');
    }

    await neonPool.end();

    console.log('\n🎉 Neon database connection setup completed successfully!');
    console.log('\n📝 Connection Details:');
    console.log('   Database: 2pal');
    console.log('   Host: ep-raspy-feather-afz1ts7h-pooler.c-2.us-west-2.aws.neon.tech');
    console.log('   User: neondb_owner');
    console.log('   Region: us-west-2 (AWS)');
    console.log('\n📋 Environment Variable:');
    console.log('   NEON_DATABASE_URL=postgresql://neondb_owner:npg_t9xbTn7YIyPK@ep-raspy-feather-afz1ts7h-pooler.c-2.us-west-2.aws.neon.tech/2pal?sslmode=require&channel_binding=require');
    console.log('\n🔍 To verify the setup worked:');
    console.log('   tsx verify-db.ts');

  } catch (error) {
    console.error('❌ Neon connection setup failed:', error);
    
    if (error.message.includes('connect')) {
      console.log('\n💡 Possible issues:');
      console.log('   - Check internet connection');
      console.log('   - Verify Neon database is active');
      console.log('   - Ensure credentials are correct');
    }
    
    process.exit(1);
  }
}

// Run setup if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupNeonConnection().catch((error) => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  });
}

export { setupNeonConnection, NEON_CONNECTION_STRING };