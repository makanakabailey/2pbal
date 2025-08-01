#!/usr/bin/env tsx

/**
 * Test User Creation Script
 * 
 * Creates a test user account for testing the profile completion system
 */

import { db } from './server/db';
import { users } from './shared/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

async function createTestUser() {
  console.log('🧪 Creating test user for profile completion testing...\n');

  try {
    const email = 'testuser@example.com';
    const password = 'test123';
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Check if test user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    
    if (existingUser.length > 0) {
      console.log('⚠️ Test user already exists, updating...');
      await db
        .update(users)
        .set({
          password: hashedPassword,
          role: 'user',
          emailVerified: true,
          isActive: true,
          profileComplete: false, // Reset profile completion for testing
          recommendedPackage: null,
          recommendationScore: null,
          recommendationReason: null,
          recommendationDate: null,
          updatedAt: new Date()
        })
        .where(eq(users.email, email));
      console.log('   ✅ Updated existing test user');
    } else {
      // Create new test user
      const newUser = await db
        .insert(users)
        .values({
          email: email,
          password: hashedPassword,
          firstName: 'Test',
          lastName: 'User',
          role: 'user',
          emailVerified: true,
          isActive: true,
          profileComplete: false
        })
        .returning();
      
      console.log('   ✅ Created new test user:', newUser[0].email);
    }
    
    console.log('\n🎉 Test user setup completed successfully!');
    console.log('\n📝 Test User Login Details:');
    console.log('   Email: testuser@example.com');
    console.log('   Password: test123');
    console.log('   Role: user');
    console.log('   Profile Complete: false (ready for testing)');
    console.log('\n🧪 Testing Instructions:');
    console.log('1. Login with the test user credentials');
    console.log('2. Navigate to profile setup page');
    console.log('3. Complete the profile form');
    console.log('4. Verify recommendation system works');
    console.log('5. Check redirect to package details page');
    
  } catch (error) {
    console.error('❌ Error creating test user:', error);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createTestUser().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error('❌ Test user creation failed:', error);
    process.exit(1);
  });
}

export { createTestUser };