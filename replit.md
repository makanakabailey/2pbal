# replit.md

## Overview
This project is a modern full-stack web application for 2Pbal, a digital services platform. Its main purpose is to serve as a business website offering package deals, a service catalog, quote request capabilities, and a savings calculator. The ambition is to provide "Precise Programming for Business Advancement and Leverage," helping clients understand cost benefits and streamline their digital service acquisition.

## User Preferences
Preferred communication style: Simple, everyday language.

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
- Custom logos and assets from `attached_assets` directory.

## Email System Status
- **Email Service**: Resend API fully operational
- **Verification System**: Complete with token-based verification (24-hour expiry)
- **Package Tracking**: User engagement monitoring implemented
- **Weekly Reminders**: Automated email service with 7-day intelligent intervals
- **Database Integration**: All email data stored in Neon PostgreSQL
- **Domain Status**: Currently using Resend's verified domain (onboarding@resend.dev)
- **Production Ready**: Custom domain verification required for 2pbal.com sender

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