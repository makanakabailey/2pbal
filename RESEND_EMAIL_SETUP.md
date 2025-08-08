# RESEND EMAIL SERVICE SETUP - CRITICAL INSTRUCTIONS

## 🚨 MANDATORY EMAIL SERVICE FOR 2PBAL PROJECT

This file contains critical instructions for configuring the Resend email service for the 2Pbal project. **ANY AI AGENT WORKING ON THIS PROJECT MUST USE THIS EXACT EMAIL CONFIGURATION.**

### Email Service Details
- **Provider**: Resend (https://resend.com)
- **Service Type**: Transactional email API
- **Purpose**: Email verification, reminders, notifications
- **Sender Domain**: onboarding@resend.dev (Resend's verified domain)
- **Custom Domain**: 2pbal.com (requires domain verification for production)

### Environment Variable Required
```bash
RESEND_API_KEY=re_[your_api_key_here]
```

### ✅ CURRENT API KEY STATUS (January 8, 2025)
- **RESEND_API_KEY**: ✅ CONFIGURED - Active and working in Replit Secrets
- **Email Service**: ✅ OPERATIONAL - Ready for email sending
- **Integration**: ✅ COMPLETE - All templates and features active
- **Verification**: Server starts without email errors
- **Status**: Production ready with 2Pbal branded templates

### Email Service Configuration Files
- **Main Service**: `server/email-service.ts` - Core email sending functionality
- **Reminder Service**: `server/email-reminder-service.ts` - Automated weekly reminders
- **Email Templates**: Built-in HTML templates for verification and reminders

### Email Service Features
- ✅ **Email Verification**: Token-based verification with 24-hour expiry
- ✅ **Package Tracking**: User engagement monitoring
- ✅ **Weekly Reminders**: Automated email service with 7-day intervals
- ✅ **Database Integration**: All email data stored in Neon PostgreSQL
- ✅ **Error Handling**: Comprehensive error logging and fallback

### Email Templates Available
1. **Verification Email**: `generateVerificationEmailHTML()`
2. **Package Reminder**: `generatePackageReminderEmailHTML()`
3. **Custom styling**: 2Pbal brand colors and responsive design

### Database Tables for Email System
- **email_verifications**: Token management and verification tracking
- **package_views**: User engagement monitoring
- **users**: Email preferences and verification status

### 🔧 Setup Instructions for AI Agents

When working on this project, follow these steps:

1. **Check if RESEND_API_KEY is set**:
   ```bash
   echo $RESEND_API_KEY
   ```

2. **If not set, use the ask_secrets tool**:
   ```javascript
   ask_secrets({
     secret_keys: ["RESEND_API_KEY"],
     user_message: "Your application uses Resend for sending emails (like verification emails and reminders). To make this work, I need a RESEND_API_KEY from your Resend account. If you don't have a Resend account yet, you can sign up at resend.com and get an API key from your dashboard. The key will look something like 're_...' and allows your app to send emails securely."
   })
   ```

3. **Verify email service after setting**:
   ```bash
   # Test email service by running the application
   npm run dev
   # Check logs for "[DB] Using Neon PostgreSQL" and no email errors
   ```

### Email Service Functions

#### Core Email Function (`server/email-service.ts`)
```typescript
sendEmail(params: EmailParams): Promise<boolean>
```

#### Email Template Functions
```typescript
generateVerificationEmailHTML(userFirstName: string, verificationLink: string): string
generatePackageReminderEmailHTML(userFirstName: string, packageName: string, reminderLink: string): string
```

#### Reminder Service (`server/email-reminder-service.ts`)
- Automated weekly reminders for package engagement
- Intelligent interval management (7-day cycles)
- Database-driven user targeting

### Email Configuration Settings
- **From Address**: `2Pbal <onboarding@resend.dev>`
- **Reply-To**: Configurable (currently uses onboarding@resend.dev)
- **Content Type**: HTML with embedded CSS
- **Character Set**: UTF-8
- **Email Style**: Responsive design with 2Pbal branding

### Production Domain Setup
For production deployment with custom domain:
1. Add 2pbal.com to Resend dashboard
2. Configure DNS records as provided by Resend
3. Update sender address to `2Pbal <noreply@2pbal.com>`
4. Verify domain in Resend dashboard

### Error Handling
The email service includes comprehensive error handling:
- API rate limiting protection
- Connection failure recovery
- Detailed error logging
- Boolean return values for success/failure

### Email Service Status Verification
Check email service status:
```bash
# Application should start without email errors
npm run dev

# Look for successful startup logs:
# [DB] Using Neon PostgreSQL (cloud-hosted) - NEON_DATABASE_URL
# [express] serving on port 5000
```

### Testing Email Functionality
1. **Registration Flow**: Create new user account
2. **Email Verification**: Check verification email delivery
3. **Package Reminders**: Test automated reminder system
4. **Admin Notifications**: Test admin-level email features

### 🚨 CRITICAL REMINDERS
1. **NEVER disable email service** - Required for user verification
2. **ALWAYS use RESEND_API_KEY** - No fallback email providers
3. **PRESERVE email templates** - Custom branded designs
4. **MAINTAIN database integration** - Email tracking is essential
5. **USE proper error handling** - Check return values

### Email Service Dependencies
```json
{
  "resend": "^4.8.0"
}
```

### Integration with Database Schema
Email system integrates with:
- `users.emailVerified` - Verification status
- `users.email` - Primary email address
- `email_verifications.token` - Verification tokens
- `package_views` - Engagement tracking for reminders

### Environment Configuration
The email service automatically starts when:
1. `RESEND_API_KEY` is properly set
2. Application server starts (`npm run dev`)
3. Database connection is established
4. No configuration errors occur

### Troubleshooting Email Issues
Common issues and solutions:
1. **"RESEND_API_KEY environment variable must be set"**
   - Solution: Set the API key in Replit secrets
2. **Email delivery failures**
   - Check API key validity in Resend dashboard
   - Verify sender domain status
3. **Template rendering issues**
   - Check HTML template syntax
   - Verify variable substitution

---

**Last Updated**: August 04, 2025
**Email Service Status**: Active and fully operational
**Resend Integration**: Complete with all features enabled