# NEON DATABASE SETUP - CRITICAL INSTRUCTIONS

## 🚨 MANDATORY DATABASE CONNECTION FOR 2PBAL PROJECT

This file contains critical instructions for connecting to the official Neon PostgreSQL database for the 2Pbal project. **ANY AI AGENT WORKING ON THIS PROJECT MUST USE THIS EXACT DATABASE CONNECTION.**

### Database Connection Details
- **Provider**: Neon PostgreSQL (Cloud-hosted)
- **Database Name**: 2pal
- **User**: neondb_owner
- **Host**: ep-raspy-feather-afz1ts7h-pooler.c-2.us-west-2.aws.neon.tech
- **Region**: us-west-2 (AWS)
- **SSL**: Required
- **Channel Binding**: Required

### Official Connection String
```
postgresql://neondb_owner:[password]@ep-raspy-feather-afz1ts7h-pooler.c-2.us-west-2.aws.neon.tech/2pal?sslmode=require&channel_binding=require
```

### ✅ CURRENT DATABASE STATUS (January 8, 2025)
- **NEON_DATABASE_URL**: ✅ CONFIGURED - Active and connected in Replit Secrets
- **Connection Status**: ✅ OPERATIONAL - Connected to production Neon database
- **Data Integrity**: ✅ PRESERVED - All existing user data and admin accounts intact
- **Verification**: Server logs show "[DB] Using Neon PostgreSQL (cloud-hosted) - NEON_DATABASE_URL"
- **Status**: Production ready with all schemas and data preserved

### Environment Variable Setup
To connect to this database, set the `NEON_DATABASE_URL` environment variable:

```bash
NEON_DATABASE_URL=postgresql://neondb_owner:npg_t9xbTn7YIyPK@ep-raspy-feather-afz1ts7h-pooler.c-2.us-west-2.aws.neon.tech/2pal?sslmode=require&channel_binding=require
```

### Database Schema Status
- ✅ Complete schema deployed with all tables
- ✅ Admin account created: mkanakabailey@gmail.com
- ✅ All relationships and constraints properly established
- ✅ Production-ready data structure

### Admin Account Details
- **Email**: mkanakabailey@gmail.com
- **Password**: admin123
- **Role**: admin
- **Status**: Active and verified

### Verification Commands
To verify the database connection is working:

1. **Test Connection**: `tsx verify-db.ts`
2. **Push Schema**: `npm run db:push`
3. **Create Admin**: `tsx create_admin.ts` (if needed)

### Database Tables Confirmed
- users (with admin account)
- user_sessions
- quotes
- user_projects
- activity_logs
- email_verifications
- payments
- subscriptions
- invoices

### 🔧 Setup Instructions for AI Agents

When working on this project, follow these steps:

1. **Check if NEON_DATABASE_URL is set**:
   ```bash
   echo $NEON_DATABASE_URL
   ```

2. **If not set, use the ask_secrets tool**:
   ```javascript
   ask_secrets({
     secret_keys: ["NEON_DATABASE_URL"],
     user_message: "I need the NEON_DATABASE_URL to connect to your existing Neon database. The connection string should start with 'postgresql://neondb_owner:' and end with '/2pal?sslmode=require&channel_binding=require'"
   })
   ```

3. **Verify connection after setting**:
   ```bash
   tsx verify-db.ts
   ```

4. **If schema needs updating**:
   ```bash
   npm run db:push
   ```

### Database Configuration Files
- **Main config**: `server/db-config.ts` - handles Neon detection
- **Connection**: `server/db.ts` - exports database instance
- **Schema**: `shared/schema.ts` - all table definitions
- **Verification**: `verify-db.ts` - connection testing
- **Migration**: `migrate-to-neon.ts` - Neon setup script

### 🚨 CRITICAL REMINDERS - DO NOT USE REPLIT DATABASE
1. **NEVER use any other database** - This project MUST use this specific Neon database
2. **NEVER switch to Replit PostgreSQL** - All production data is in Neon, using Replit DB will lose all data
3. **DO NOT create new Replit PostgreSQL database** - Always ask for NEON_DATABASE_URL instead
4. **ALWAYS verify connection** after setting environment variables shows "Using Neon PostgreSQL"
5. **PRESERVE all existing data** - Admin account and project data are already established
6. **USE NEON_DATABASE_URL** - This takes priority over DATABASE_URL in the configuration
7. **MIGRATION RULE** - When migrating projects, NEVER use create_postgresql_database_tool, always use existing Neon

### Detection Logic
The `server/db-config.ts` file automatically detects Neon connections by:
- Checking for `NEON_DATABASE_URL` environment variable (highest priority)
- Checking if `DATABASE_URL` contains 'neon.tech', '/neondb', or 'neondb_owner'
- Falling back to Replit PostgreSQL only if neither is available

### Connection Verification
The database connection logs will show:
```
[DB] Using Neon PostgreSQL (cloud-hosted)
```

If you see any other message, the connection is not properly configured.

---

**Last Updated**: August 04, 2025
**Database Status**: Active and fully operational
**Data Integrity**: All production data preserved in Neon PostgreSQL