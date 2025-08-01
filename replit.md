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
- **Database**: Neon PostgreSQL (cloud-hosted, primary) with Replit PostgreSQL fallback
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Connection**: Neon Database serverless connection via NEON_DATABASE_URL
- **Schema**: Defined in shared TypeScript with Zod validation
- **Configuration**: Automatic provider selection prioritizing Neon

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
- Custom logos and assets from `attached_assets` directory.