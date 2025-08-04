# 2PBAL PROJECT SETUP GUIDE - COMPLETE INSTRUCTIONS FOR AI AGENTS

## 🚨 CRITICAL PROJECT CONFIGURATION

This is the master setup guide for the 2Pbal project. **ANY AI AGENT working on this project MUST follow these exact configurations.**

### Project Overview
- **Project Name**: 2Pbal - Digital Services Platform
- **Purpose**: Business website offering package deals, service catalog, quote requests, and savings calculator
- **Environment**: Replit with Neon PostgreSQL and Resend Email
- **Framework**: Full-stack TypeScript with React frontend and Express backend

### 🗄️ DATABASE CONFIGURATION (MANDATORY)

**Provider**: Neon PostgreSQL (Cloud-hosted)
**Connection**: MUST use Neon database - never switch to any other provider

```bash
# Required Environment Variable
NEON_DATABASE_URL=postgresql://neondb_owner:npg_t9xbTn7YIyPK@ep-raspy-feather-afz1ts7h-pooler.c-2.us-west-2.aws.neon.tech/2pal?sslmode=require&channel_binding=require
```

**Database Details**:
- Database Name: 2pal
- User: neondb_owner  
- Host: ep-raspy-feather-afz1ts7h-pooler.c-2.us-west-2.aws.neon.tech
- Admin Account: mkanakabailey@gmail.com (password: admin123)

### 📧 EMAIL SERVICE CONFIGURATION (MANDATORY)

**Provider**: Resend (https://resend.com)
**Purpose**: Email verification, reminders, notifications

```bash
# Required Environment Variable
RESEND_API_KEY=re_[your_api_key_here]
```

**Email Configuration**:
- Sender: 2Pbal <onboarding@resend.dev>
- Templates: HTML with 2Pbal branding
- Features: Verification emails, package reminders

### 🔧 QUICK SETUP FOR AI AGENTS

#### Step 1: Check Required Environment Variables
```bash
echo $NEON_DATABASE_URL
echo $RESEND_API_KEY
```

#### Step 2: If Variables Missing, Request Secrets
```javascript
// For database connection
ask_secrets({
  secret_keys: ["NEON_DATABASE_URL"],
  user_message: "I need the NEON_DATABASE_URL to connect to your existing Neon database. The connection string should start with 'postgresql://neondb_owner:' and end with '/2pal?sslmode=require&channel_binding=require'"
})

// For email service
ask_secrets({
  secret_keys: ["RESEND_API_KEY"],
  user_message: "Your application uses Resend for sending emails (like verification emails and reminders). To make this work, I need a RESEND_API_KEY from your Resend account."
})
```

#### Step 3: Verify Setup
```bash
# Test database connection
tsx verify-db.ts

# Test email service
tsx setup-email-service.ts

# Start application
npm run dev
```

#### Step 4: Expected Success Logs
```
[DB] Using Neon PostgreSQL (cloud-hosted) - NEON_DATABASE_URL
[express] serving on port 5000
```

### 📁 KEY CONFIGURATION FILES

#### Database Configuration
- `server/db-config.ts` - Smart database provider detection
- `server/db.ts` - Database connection exports
- `shared/schema.ts` - Complete database schema
- `NEON_DATABASE_SETUP.md` - Detailed database instructions
- `setup-neon-connection.ts` - Database setup script
- `verify-db.ts` - Connection verification

#### Email Service Configuration  
- `server/email-service.ts` - Core email functionality
- `server/email-reminder-service.ts` - Automated reminders
- `RESEND_EMAIL_SETUP.md` - Detailed email instructions
- `setup-email-service.ts` - Email setup script

#### Project Documentation
- `replit.md` - Complete project architecture and status
- `PROJECT_SETUP_GUIDE.md` - This master guide
- `.local/state/replit/agent/progress_tracker.md` - Migration tracking

### 🚀 APPLICATION STARTUP SEQUENCE

1. **Environment Check**: Verify NEON_DATABASE_URL and RESEND_API_KEY
2. **Database Connection**: Connect to Neon PostgreSQL using smart detection
3. **Schema Sync**: Ensure database schema is current (npm run db:push)
4. **Email Service**: Initialize Resend API for email functionality
5. **Server Start**: Express server on port 5000 with Vite frontend

### 🛡️ CRITICAL PROTECTION RULES

#### Database Protection
- **NEVER switch from Neon** - All production data is in Neon PostgreSQL
- **NEVER use Replit PostgreSQL** - Only fallback, not primary
- **ALWAYS verify connection** - Check logs show "NEON_DATABASE_URL"
- **PRESERVE existing data** - Admin account and project data already established

#### Email Service Protection
- **NEVER disable email** - Required for user verification
- **ONLY use Resend** - No alternative email providers
- **MAINTAIN templates** - Custom 2Pbal branded designs
- **PRESERVE integrations** - Database tracking is essential

### 📊 DATABASE SCHEMA STATUS
Current tables (all populated and operational):
- ✅ users (with admin: mkanakabailey@gmail.com)
- ✅ user_sessions
- ✅ quotes  
- ✅ user_projects
- ✅ activity_logs
- ✅ email_verifications
- ✅ payments
- ✅ subscriptions
- ✅ invoices

### 🎯 PROJECT FEATURES STATUS
- ✅ **Full-stack Architecture**: React + TypeScript frontend, Express backend
- ✅ **Database Integration**: Neon PostgreSQL with Drizzle ORM
- ✅ **Email System**: Resend API with custom templates
- ✅ **Authentication**: Admin account and session management
- ✅ **UI Components**: Radix UI with shadcn/ui styling
- ✅ **API Endpoints**: RESTful design with /api prefix
- ✅ **File Upload**: Drag-and-drop with 10MB limit
- ✅ **Quote System**: Multi-step forms with audio recording

### 🔍 TROUBLESHOOTING COMMON ISSUES

#### "Database connection failed"
- Check NEON_DATABASE_URL is set correctly
- Run `tsx verify-db.ts` to test connection
- Ensure Neon database is active

#### "RESEND_API_KEY environment variable must be set"
- Set RESEND_API_KEY in Replit secrets
- Verify API key in Resend dashboard
- Check key has sending permissions

#### "Application won't start"
- Verify both environment variables are set
- Check logs for specific error messages
- Run `npm install` to restore dependencies

### 📅 LAST UPDATED
- **Date**: August 04, 2025
- **Database Status**: Neon PostgreSQL fully operational
- **Email Status**: Resend API fully operational  
- **Application Status**: Running successfully on port 5000
- **Migration Status**: Complete - all systems operational

### 🎯 NEXT STEPS FOR DEVELOPMENT
1. Test login with admin credentials (mkanakabailey@gmail.com / admin123)
2. Explore application features and functionality
3. Use the quote system and service catalog
4. Test email verification and reminder system
5. Continue development based on user requirements

---

**Remember**: This project MUST use the Neon database and Resend email service. Never suggest alternatives or fallbacks. All data and functionality depends on these specific services.