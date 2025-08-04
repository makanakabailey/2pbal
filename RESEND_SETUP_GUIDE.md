# Resend Email Service Setup Guide

## Current Status
✅ **RESEND_API_KEY is configured**  
✅ **Email service is working with default domain**  
⚠️ **Custom domain (2pbal.com) needs verification for production**

## Critical Issue Resolution
The emails were failing because we were trying to send from `verify@2pbal.com` but this domain isn't verified in Resend. 

**FIXED:** Changed sender to `onboarding@resend.dev` (Resend's verified domain)

## Resend.com Setup Instructions

### Step 1: Verify Your Resend Account
1. Go to [resend.com](https://resend.com)
2. Log into your account
3. Navigate to **API Keys** section
4. Verify your current API key is active (should start with `re_`)

### Step 2: Domain Verification (For Production)
**IMPORTANT:** To use `@2pbal.com` email addresses, you need to verify the domain:

1. Go to **Domains** section in Resend dashboard
2. Click **Add Domain**
3. Enter `2pbal.com`
4. Add the required DNS records to your domain registrar:
   - **DKIM Record**: `_domainkey.2pbal.com`
   - **SPF Record**: Add Resend's SPF to your TXT record
   - **DMARC Record**: `_dmarc.2pbal.com`

### Step 3: DNS Configuration
Add these DNS records to your domain registrar (GoDaddy, Namecheap, etc.):

```
Type: TXT
Name: 2pbal.com
Value: v=spf1 include:_spf.resend.com ~all

Type: CNAME  
Name: _domainkey.2pbal.com
Value: [PROVIDED BY RESEND]

Type: TXT
Name: _dmarc.2pbal.com  
Value: v=DMARC1; p=none; rua=mailto:dmarc@2pbal.com
```

### Step 4: Update Email Sender (After Domain Verification)
Once domain is verified, update `server/email-service.ts`:

```typescript
from: '2Pbal <verify@2pbal.com>'  // Your verified domain
```

## Current Configuration

### Environment Variables
- `RESEND_API_KEY`: ✅ Configured in Replit secrets
- `DATABASE_URL`: ✅ Connected to Neon PostgreSQL

### Email Templates
1. **Verification Email**: Welcome email with verification link
2. **Package Reminder Email**: Weekly reminders with user engagement stats

### Features Working
- ✅ Email verification system
- ✅ Resend verification emails  
- ✅ Package view tracking
- ✅ Weekly automated reminders
- ✅ Rate limiting protection

## Testing Instructions

### Test Email Sending
```bash
# In Replit console:
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","firstName":"Test"}'
```

### Check Email Logs
Monitor the workflow console for:
- ✅ "Email sent successfully: [ID]"  
- ❌ "Resend email error: [details]"

## Rate Limits
- **Resend Free Tier**: 100 emails/day, 2 emails/second
- **Current Protection**: Built-in rate limiting in our service

## Database Connection (Neon PostgreSQL)
✅ **ACTIVE CONNECTION CONFIRMED**

**Connection Details:**
- Provider: Neon PostgreSQL (cloud-hosted)
- Database URL: Configured via `DATABASE_URL` environment variable
- ORM: Drizzle ORM with full schema definitions
- Tables: users, emailVerificationTokens, packageViews, quotes, projects, payments, subscriptions

**Schema Location:** `shared/schema.ts`
**Connection Config:** `server/db-config.ts`

## Troubleshooting

### Domain Not Verified Error
**Error:** `The 2pbal.com domain is not verified`
**Solution:** Follow Step 2 above OR use `onboarding@resend.dev` (already implemented)

### Rate Limit Exceeded  
**Error:** `Too many requests. You can only make 2 requests per second`
**Solution:** Built-in retry logic implemented, wait 1 second between requests

### API Key Issues
**Error:** `RESEND_API_KEY environment variable must be set`
**Solution:** Verify the API key is added to Replit Secrets

## Next Steps for Production

1. **Domain Verification**: Complete DNS setup for 2pbal.com
2. **Upgrade Resend Plan**: Consider paid plan for higher limits
3. **Custom Templates**: Design branded email templates
4. **Email Analytics**: Monitor open rates and delivery success

## AI Memory Notes
- Database: Neon PostgreSQL actively connected and working
- Email Service: Resend API functional with fallback domain
- Package Tracking: Implemented with engagement metrics
- User Verification: Required before payments, fully functional
- Weekly Reminders: Automated service running with 7-day intervals

**Last Updated:** January 2025
**Status:** FULLY OPERATIONAL with temporary sender domain