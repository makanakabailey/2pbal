# Vercel Deployment Guide - 2Pbal Platform

## Prerequisites
- Custom domain already purchased
- Vercel account (free tier available)
- GitHub repository with your code

## Step-by-Step Deployment

### 1. Prepare Your Repository
```bash
# Ensure your code is in a GitHub repository
# The main files should be in the root directory:
# - package.json
# - vite.config.ts  
# - client/ folder
# - server/ folder
```

### 2. Create Vercel Project
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Select the repository containing your 2Pbal code

### 3. Configure Build Settings
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist/public
Install Command: npm install
```

### 4. Set Environment Variables
In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

```
NODE_ENV=production
DATABASE_URL=your_neon_database_url
NEON_DATABASE_URL=your_neon_database_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RESEND_API_KEY=your_resend_key
```

### 5. Configure Custom Domain
1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., yourdomain.com)
3. Configure DNS records with your domain provider:

**For Root Domain (yourdomain.com):**
```
Type: A
Name: @
Value: 76.76.19.164
```

**For WWW Subdomain (www.yourdomain.com):**
```
Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

### 6. SSL Certificate (Automatic)
Vercel automatically provides SSL certificates for custom domains. This happens within 24 hours of DNS propagation.

### 7. Update Application Configuration
Create a `vercel.json` file in your root directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/**/*",
      "use": "@vercel/static"
    },
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/client/$1"
    }
  ]
}
```

### 8. Database Migration
After deployment, run database migrations:
```bash
# Using Vercel CLI (install with: npm i -g vercel)
vercel env pull .env.local
npm run db:push
```

### 9. Test Deployment
1. Visit your custom domain
2. Test all functionality:
   - User registration/login
   - Quote form with audio recording
   - File uploads
   - Email verification
   - Payment processing

### 10. Domain Propagation
DNS changes can take 24-48 hours to fully propagate worldwide. You can check propagation status at [whatsmydns.net](https://whatsmydns.net).

## Free Deployment Features
- Custom domain support (free)
- SSL certificates (free)
- Global CDN (free)
- Automatic deployments from GitHub
- 100GB bandwidth per month (free tier)

## Cost Considerations
- Vercel Pro ($20/month) provides:
  - Higher bandwidth limits
  - Advanced analytics
  - Team collaboration features
- Your custom domain: Already purchased
- Neon Database: Free tier available
- Cloudinary: Free tier (10GB storage, 25k transformations)

## Monitoring and Updates
- Vercel automatically deploys when you push to your main branch
- Monitor deployment status in Vercel dashboard
- View logs and analytics in real-time

## Support Resources
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Domain Configuration: [vercel.com/docs/custom-domains](https://vercel.com/docs/custom-domains)
- Environment Variables: [vercel.com/docs/environment-variables](https://vercel.com/docs/environment-variables)

Last Updated: August 4, 2025