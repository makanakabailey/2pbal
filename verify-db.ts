#!/usr/bin/env tsx

/**
 * Database Connection Verification Script
 * 
 * This script verifies that the database connection is working properly
 * and that the admin account is accessible.
 * 
 * Usage: npm run db:check
 */

import { db } from './server/db';
import { users } from './shared/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

async function verifyDatabase() {
  console.log('🔍 Verifying database connection and admin account...\n');

  try {
    // Test 1: Basic connection
    console.log('1. Testing database connection...');
    const connectionTest = await db.select().from(users).limit(1);
    console.log('   ✅ Database connection successful');

    // Test 2: Check admin account exists
    console.log('2. Checking admin account...');
    const adminUser = await db.select()
      .from(users)
      .where(eq(users.email, 'mkanakabailey@gmail.com'))
      .limit(1);

    if (!adminUser[0]) {
      console.log('   ❌ Admin account not found');
      process.exit(1);
    }

    const admin = adminUser[0];
    console.log(`   ✅ Admin account found: ${admin.email}`);
    console.log(`   ✅ Account active: ${admin.isActive}`);
    console.log(`   ✅ Role: ${admin.role}`);
    console.log(`   ✅ Email verified: ${admin.emailVerified}`);
    
    if (admin.lastLogin) {
      console.log(`   ✅ Last login: ${admin.lastLogin.toISOString()}`);
    }

    // Test 3: Verify password works
    console.log('3. Testing admin password...');
    const passwordValid = await bcrypt.compare('admin123', admin.password);
    
    if (!passwordValid) {
      console.log('   ❌ Admin password verification failed');
      process.exit(1);
    }
    console.log('   ✅ Admin password verification successful');

    // Test 4: Count total users
    console.log('4. Checking user count...');
    const totalUsers = await db.select().from(users);
    console.log(`   ✅ Total users in database: ${totalUsers.length}`);

    console.log('\n🎉 All database checks passed!');
    console.log('\n📝 Admin Login Details:');
    console.log('   Email: mkanakabailey@gmail.com');
    console.log('   Password: admin123');
    console.log('   URL: /login');

  } catch (error) {
    console.error('❌ Database verification failed:');
    console.error(error);
    process.exit(1);
  }
}

// Run verification if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  verifyDatabase().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  });
}

export { verifyDatabase };