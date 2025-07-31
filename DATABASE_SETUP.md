# Database Setup Instructions

## Important: Using Your Existing Production Database

This project uses a **Neon PostgreSQL database** that contains all your users, admin accounts, quotes, and other important data.

### When Setting Up in a New Environment:

1. **Copy the DATABASE_URL**: Make sure you use the EXACT same database connection string:
   ```
   DATABASE_URL="postgresql://neondb_owner:npg_t9xbTn7YIyPK@ep-raspy-feather-afz1ts7h-pooler.c-2.us-west-2.aws.neon.tech/2pal?sslmode=require&channel_binding=require"
   ```

2. **Set Environment Variables**: In your new environment, set:
   - `DATABASE_URL` to the connection string above
   - Other Neon variables (if needed):
     - `PGHOST=ep-raspy-feather-afz1ts7h-pooler.c-2.us-west-2.aws.neon.tech`
     - `PGDATABASE=2pal`
     - `PGUSER=neondb_owner`
     - `PGPASSWORD=npg_t9xbTn7YIyPK`
     - `PGPORT=5432`

3. **DO NOT run database creation commands**: The tables already exist with your data.

4. **Verify Schema Sync** (if needed): Only run this if you've made schema changes:
   ```bash
   npm run db:push
   ```

### Your Current Database Contains:
- ✅ **Admin account**: mkanakabailey@gmail.com (password: admin123)
- ✅ **Authentication working**: Login/logout fully functional
- ✅ **All database tables**: users, quotes, projects, payments, sessions, etc.
- ✅ **Complete schema**: All relationships and constraints properly set
- ✅ **Active sessions**: User authentication persists across restarts

### Important Notes:
- This is a **production database** - all your real data is stored here
- The database is hosted on Neon (cloud PostgreSQL service)
- It's persistent and will retain data across different environments
- Never delete or recreate this database

### Environment Migration Checklist:
When moving to a new IDE or environment:

1. **Set Environment Variables**:
   ```bash
   # In new environment, set this exact value:
   export DATABASE_URL="postgresql://neondb_owner:npg_t9xbTn7YIyPK@ep-raspy-feather-afz1ts7h-pooler.c-2.us-west-2.aws.neon.tech/2pal?sslmode=require&channel_binding=require"
   ```

2. **Verify Connection** (run this to test):
   ```bash
   npm run db:check
   ```

3. **Test Authentication**:
   - Go to /login
   - Use: mkanakabailey@gmail.com / admin123
   - Should redirect to admin dashboard

### Troubleshooting:
If you get connection errors:
1. Verify the DATABASE_URL is exactly correct (copy from above)
2. Check your internet connection
3. Ensure the environment variable is properly set
4. Run connection test: `npm run db:check`
5. Contact Neon support if there are service issues

### Security:
- Keep your database credentials secure
- Don't commit them to public repositories
- Use environment variables or secure secret management