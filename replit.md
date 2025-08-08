# replit.md

## Overview
This project is a modern full-stack web application for 2Pbal, a digital services platform. Its main purpose is to serve as a business website offering package deals, a service catalog, quote request capabilities, and a savings calculator. The ambition is to provide "Precise Programming for Business Advancement and Leverage," helping clients understand cost benefits and streamline their digital service acquisition.

## Recent Changes (January 2025)
✅ **Migration from Replit Agent to Replit Environment**: Successfully completed full project migration
- Fixed missing dependencies (tsx package installation)  
- Configured PostgreSQL database connection with Neon cloud database (NEON_DATABASE_URL)
- Set up all required API keys (Resend email service + Cloudinary storage)
- Fixed JSX build errors and validated application functionality
- Application now running successfully on port 5000
- Connected to original Neon database: ep-raspy-feather-afz1ts7h-pooler.c-2.us-west-2.aws.neon.tech/2pal

✅ **Vercel Deployment Optimization**: Successfully optimized project structure for production deployment
- Cleaned up duplicate methods in storage.ts (build warnings eliminated)
- Created optimized vercel.json configuration for monorepo deployment
- Verified production build process (133KB backend bundle, 1.16MB frontend)
- Tested local production deployment with all functionality working
- Created comprehensive deployment guides (VERCEL_DEPLOYMENT_GUIDE.md, OPTIMIZED_DEPLOYMENT_GUIDE.md)
- Current structure is production-ready for Vercel with free tier compatibility

✅ **Project Structure Reorganization**: Successfully separated frontend and backend into distinct folders
- Organized files into `frontend/` and `backend/` directories for better development workflow
- Created independent package.json files for each layer with appropriate dependencies
- Updated build configuration and Vercel deployment settings for separated structure
- Maintained all existing functionality while improving project organization and scalability
- Added comprehensive structure guide (SEPARATED_STRUCTURE_GUIDE.md) for development teams

✅ **Cinematic Homepage Transformation**: Successfully implemented comprehensive animation system with framer-motion
- Hero section with staggered text animations and pulsing CTA buttons
- Interactive problem/solution reveal with scroll-triggered animations 
- Modern Bento Grid layout for key benefits section
- Animated trust bar with counting numbers for ROI display
- Spring physics button interactions and micro-animations throughout
- Enhanced CSS animations including glow effects, shimmer, and floating elements

✅ **Trust-Infused Authentication Gateway**: Successfully implemented advanced UX authentication features
- Proactive email validation with real-time account checking and visual feedback indicators
- Biometric login detection with Face ID support (displays when platform authentication is available)
- Magic link authentication system with secure 10-minute expiry and branded email templates
- Smart password strength indicator with animated progress bar, color transitions, and requirements checklist
- Smooth form animations and micro-interactions throughout login/signup flows
- Enhanced payment success page with animated Teal & Lime brand-colored confetti celebration

✅ **Hyper-Focused Hero Section & Smart Navigation**: Successfully implemented dynamic homepage and navigation enhancements
- Dynamic headline animation with fade-in and 2-second delay subtext sliding from left
- "The Value Stack" module positioned beside main headline with subtle parallax effects for core value propositions
- Enhanced pulsing CTA button that animates into pulse state after headline completion (3.5s delay) 
- Smart secondary CTAs that change based on user authentication status (dashboard vs packages for returning vs new users)
- Intelligent global navigation with smart "Get Quote" CTA featuring liquid fill animation and dynamic text based on current page
- Shimmer effects and personalized messaging throughout navigation elements

📋 **Next Phase Enhancement Plans**: User has provided comprehensive UI/UX enhancement specifications
- **Cohesive Design System**: Atomic design principles with component-based animations and standardized transitions
- **Advanced Feedback & Support**: Contextual help system, proactive interventions, integrated feedback mechanisms
- **Elegant Error Handling**: Custom 404 pages, inline form validation, brand-consistent error experiences
- **Seamless Mobile Experience**: Bottom navigation, touch-friendly elements, mobile-first animations
- **Interactive Elements**: Dynamic footer, branded loading states, smooth page transitions
- **Enhanced User Journey**: Interactive hero CTAs, micro-quiz personalization, branded email notifications, thank you screens

## User Preferences
Preferred communication style: Simple, everyday language.

## Project Setup Documentation
- **Master Setup Guide**: PROJECT_SETUP_GUIDE.md - Complete instructions for AI agents
- **Database Setup**: NEON_DATABASE_SETUP.md - Neon PostgreSQL connection guide
- **Email Setup**: RESEND_EMAIL_SETUP.md - Resend email service configuration
- **Cloudinary Integration**: CLOUDINARY_INTEGRATION.md - Cloud storage setup and troubleshooting for AI agents
- **Vercel Deployment**: VERCEL_DEPLOYMENT_GUIDE.md - Complete deployment instructions for custom domains
- **Migration Tracker**: .local/state/replit/agent/progress_tracker.md - Setup progress tracking

## System Architecture

### Frontend
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter
- **State Management**: React Query (`@tanstack/react-query`)
- **UI Framework**: Radix UI components with shadcn/ui styling system ("new-york" style)
- **Styling**: Tailwind CSS with custom 2Pbal brand colors (blue primary, teal and lime accents)

### Backend
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful endpoints (`/api` prefix)
- **Error Handling**: Centralized error handler
- **Development**: Integrated with Vite for HMR

### Data Storage
- **Database**: Neon PostgreSQL (cloud-hosted, primary) - ACTIVELY CONNECTED
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Connection**: Neon Database serverless connection (auto-detected via DATABASE_URL)
- **Schema**: Defined in shared TypeScript with Zod validation
- **Configuration**: Smart provider detection prioritizing Neon PostgreSQL when detected

### Key Components & Features
- **Database Schema**: Users, Quotes, Projects, Sessions, Payments, Subscriptions, Invoices tables with Zod validation.
- **UI Components**: Package/Service Cards, Service Detail Pages, Savings Calculator, Bundle Builder, Multi-step Quote Form (with audio recording and file upload), Client Portal, File Upload System (drag-and-drop, 10MB limit).
- **Audio Recording System**: Complete voice recording functionality with Cloudinary cloud storage integration and intelligent local fallback. Users can record, playback, and submit voice messages with quotes.
- **Pages**: Home, Packages, Services, Service Details, Quote, Client Portal, Subscription Management, Admin Panel (user management, subscription management), About Us, Careers, Case Studies, 404.
- **Data Flow**: React Query handles API calls, Express processes requests with Zod validation, Drizzle ORM interacts with PostgreSQL, JSON responses are returned, and React Query updates UI.
- **Deployment**: Client built by Vite to `dist/public`, server bundled by esbuild to `dist/index.js`. Static file serving from built client assets. Database connection via `DATABASE_URL` environment variable.

## External Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless deployment.
- **drizzle-orm & drizzle-kit**: Database ORM and migration tools.
- **@radix-ui/**\*: Headless UI component primitives.
- **@tanstack/react-query**: Server state management.
- **wouter**: Lightweight React router.
- **Vite**: Build tool.
- **TypeScript**: Language.
- **Tailwind CSS**: CSS framework.
- **PostCSS**: CSS processing.
- **Stripe**: For payment processing (implied by payment flow).
- **Resend**: Email service for verification and reminders (ACTIVE - using onboarding@resend.dev).
- **Cloudinary**: Cloud storage for audio recordings and file uploads (configured with intelligent fallback).
- **react-audio-voice-recorder**: Audio recording component for voice messages.
- Custom logos and assets from `attached_assets` directory.

## Email System Status
- **Email Service**: Resend API fully operational (RESEND_API_KEY configured) ✅
- **Verification System**: Complete with token-based verification (24-hour expiry)
- **Package Tracking**: User engagement monitoring implemented
- **Weekly Reminders**: Automated email service with 7-day intelligent intervals
- **Database Integration**: All email data stored in Neon PostgreSQL
- **Domain Status**: Currently using Resend's verified domain (onboarding@resend.dev)
- **Production Ready**: Custom domain verification required for 2pbal.com sender
- **Setup Guide**: RESEND_EMAIL_SETUP.md contains full configuration instructions for AI agents
- **Service Files**: server/email-service.ts (core), server/email-reminder-service.ts (automation)
- **Templates**: HTML email templates with 2Pbal branding and responsive design
- **Migration Status**: ✅ API keys successfully migrated and verified (January 2025)

## Database Connection Status
- **Provider**: Neon PostgreSQL (cloud-hosted) - ACTIVELY CONNECTED ✅
- **Database Name**: 2pal
- **Connection**: Official Neon connection string configured in NEON_DATABASE_URL
- **Host**: ep-raspy-feather-afz1ts7h-pooler.c-2.us-west-2.aws.neon.tech
- **User**: neondb_owner
- **Schema**: Complete with users, quotes, projects, payments, sessions, invoices, subscriptions tables
- **Admin Account**: mkanakabailey@gmail.com (password: admin123)
- **Performance**: Optimized queries with proper indexing
- **Migration**: Managed through Drizzle Kit (npm run db:push)
- **Setup Guide**: NEON_DATABASE_SETUP.md contains full connection instructions for AI agents
- **Migration Status**: ✅ Successfully migrated from Replit Agent to Replit environment (January 2025)
- **Environment Setup**: ✅ All API keys configured and database connected (January 2025)

## Audio Recording System Status
- **Audio Recording**: Fully functional voice recording system integrated into quote form
- **Cloudinary Integration**: Configured for cloud storage with automatic upload (fallback system active) ✅
- **Local Fallback**: Intelligent fallback to browser storage when cloud upload unavailable
- **API Endpoints**: `/api/audio/upload-recording-blob` for audio processing and storage
- **User Experience**: Seamless recording, playback, and submission of voice messages with quotes
- **Storage Strategy**: Attempts Cloudinary upload, gracefully falls back to local storage with user notification
- **Implementation Files**: server/audio-upload-routes.ts, server/cloudinary-config.ts, client/src/pages/quote.tsx
- **Feature Status**: Production ready with robust error handling and user feedback
- **Migration Status**: ✅ API keys successfully migrated and verified (January 2025)