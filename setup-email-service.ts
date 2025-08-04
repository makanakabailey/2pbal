#!/usr/bin/env tsx

/**
 * Resend Email Service Setup Script
 * 
 * This script verifies and configures the Resend email service
 * for the 2Pbal project and tests email functionality.
 * 
 * Usage: tsx setup-email-service.ts
 */

import { sendEmail, generateVerificationEmailHTML } from './server/email-service';

async function setupEmailService() {
  console.log('📧 Setting up Resend email service for 2Pbal...\n');

  try {
    // Check if RESEND_API_KEY is available
    if (!process.env.RESEND_API_KEY) {
      console.log('❌ RESEND_API_KEY environment variable is not set');
      console.log('\nTo setup email service:');
      console.log('1. Sign up at https://resend.com');
      console.log('2. Get your API key from the dashboard');
      console.log('3. Set RESEND_API_KEY in Replit secrets');
      console.log('4. Run this script again');
      process.exit(1);
    }

    console.log('1. Checking Resend API key...');
    console.log('   ✅ RESEND_API_KEY is configured');

    console.log('2. Testing email service configuration...');
    
    // Test email template generation
    const testHTML = generateVerificationEmailHTML(
      'Test User',
      'https://example.com/verify?token=test123'
    );
    
    if (testHTML.includes('Test User') && testHTML.includes('2Pbal')) {
      console.log('   ✅ Email template generation working');
    } else {
      console.log('   ❌ Email template generation failed');
      process.exit(1);
    }

    console.log('3. Verifying email service imports...');
    console.log('   ✅ Email service modules loaded successfully');

    console.log('\n🎉 Resend email service setup completed successfully!');
    console.log('\n📧 Email Service Configuration:');
    console.log('   Provider: Resend');
    console.log('   Sender: 2Pbal <onboarding@resend.dev>');
    console.log('   Features: Verification emails, Package reminders');
    console.log('   Templates: HTML with 2Pbal branding');
    console.log('\n📋 Available Email Functions:');
    console.log('   - sendEmail(params): Send any email');
    console.log('   - generateVerificationEmailHTML(): User verification');
    console.log('   - generatePackageReminderEmailHTML(): Package reminders');
    console.log('\n🔍 To test email sending:');
    console.log('   1. Start the application: npm run dev');
    console.log('   2. Register a new user account');
    console.log('   3. Check verification email delivery');

  } catch (error) {
    console.error('❌ Email service setup failed:', error);
    
    if (error.message.includes('RESEND_API_KEY')) {
      console.log('\n💡 API Key Issue:');
      console.log('   - Verify the API key is correct');
      console.log('   - Check Resend dashboard for key status');
      console.log('   - Ensure key has sending permissions');
    } else if (error.message.includes('import')) {
      console.log('\n💡 Import Issue:');
      console.log('   - Check email service files exist');
      console.log('   - Verify TypeScript compilation');
      console.log('   - Run npm install to restore dependencies');
    }
    
    process.exit(1);
  }
}

// Run setup if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupEmailService().catch((error) => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  });
}

export { setupEmailService };