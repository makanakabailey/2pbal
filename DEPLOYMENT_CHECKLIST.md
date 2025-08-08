# Vercel Deployment Checklist - 2Pbal

## Quick Deployment Steps

### ✅ Pre-Deployment (5 minutes)
- [ ] Code pushed to GitHub repository
- [ ] `vercel.json` file in root directory
- [ ] All API keys ready (Cloudinary, Resend, Neon DB)

### ✅ Vercel Setup (10 minutes)
- [ ] Created Vercel account at vercel.com
- [ ] Connected GitHub repository
- [ ] Configured build settings:
  - Framework: Other
  - Build Command: `npm run build`
  - Output Directory: `dist/public`
- [ ] Added all environment variables
- [ ] Deployed successfully

### ✅ Database Setup (5 minutes)
- [ ] Neon database URL added to environment variables
- [ ] Database schema pushed: `npm run db:push`
- [ ] Database connection tested

### ✅ Custom Domain Setup (15 minutes)
- [ ] Domain added in Vercel dashboard
- [ ] DNS A record: `@ → 76.76.19.164`
- [ ] DNS CNAME record: `www → cname.vercel-dns.com`
- [ ] SSL certificate automatically provisioned

### ✅ Final Testing (10 minutes)
- [ ] Application loads on custom domain
- [ ] User registration works
- [ ] Login/authentication works
- [ ] Database operations work
- [ ] File upload works (Cloudinary)
- [ ] Email sending works (Resend)

## Environment Variables Required
```
NODE_ENV=production
DATABASE_URL=your_neon_database_url
NEON_DATABASE_URL=your_neon_database_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RESEND_API_KEY=your_resend_key
```

## DNS Configuration
**Domain Provider Settings:**
```
A Record:    @ → 76.76.19.164
CNAME Record: www → cname.vercel-dns.com
```

**Total Time: ~45 minutes**
**Total Cost: $0 (Free tiers)**

---
*Your 2Pbal application will be live with professional hosting, security, and performance!*