# replit.md

## Overview

This is a modern full-stack web application built for 2Pbal, a digital services platform that provides "Precise Programming for Business Advancement and Leverage." The application is designed as a business website with package offerings, service catalogs, quote request functionality, and a savings calculator to help clients understand cost benefits.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for development and production builds
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom design tokens matching 2Pbal brand colors

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Request Handling**: Standard Express middleware with JSON parsing
- **Error Handling**: Centralized error handler with status code mapping
- **Development**: Integrated with Vite for hot module replacement in development

### Data Storage Solutions
- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Connection**: Neon Database serverless connection
- **Schema**: Defined in shared TypeScript schema with Zod validation
- **Fallback**: In-memory storage implementation for development/testing

## Key Components

### Database Schema
- **Users Table**: Basic user management with username/password
- **Quotes Table**: Customer quote requests with contact info, goals, project details, and timestamps
- **Validation**: Zod schemas for type-safe data validation on both client and server

### UI Components
- **Package Cards**: Displays service packages with pricing, features, and savings calculations
- **Service Cards**: Individual service listings with custom SVG images, bundling capability, and detailed service pages
- **Service Detail Pages**: Comprehensive service information with ROI statistics, benefits, process timelines, and pricing
- **Savings Calculator**: Interactive modal for cost calculation based on user inputs
- **Bundle Builder**: Allows users to create custom service combinations with 20% discount calculation
- **Quote Form**: Multi-step form with audio recording capabilities and file upload support
- **Audio Recording System**: Voice message recording with playback, management, and submission functionality
- **Client Portal**: Comprehensive project management interface with tabs for overview, progress, payments, and communication
- **File Upload System**: Drag-and-drop file attachment with validation for images, videos, audio, and documents (10MB limit)

### Pages Structure
- **Home**: Hero section, package overview, testimonials, value proposition, client portal demo link
- **Packages**: Detailed package comparison with pricing tiers, client portal integration
- **Services**: Comprehensive service catalog with search, filtering, and bundle building
- **Service Details**: Individual service pages with ROI data, benefits, process workflows, and pricing
- **Quote**: Multi-step quote request form with audio recording, file uploads, and progress tracking
- **Client Portal**: Complete project management system with progress tracking, payments, and communication
- **404**: Error handling for undefined routes

## Data Flow

1. **Client Requests**: React components make API calls using React Query
2. **Server Processing**: Express routes handle requests, validate data with Zod
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: JSON responses with consistent error formatting
5. **State Updates**: React Query automatically updates UI with fresh data

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless deployment
- **drizzle-orm & drizzle-kit**: Database ORM and migration tools
- **@radix-ui/***: Headless UI component primitives
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router

### Development Dependencies
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with Tailwind

### Brand-Specific Dependencies
- Custom color palette with blue primary color (navbar), teal and lime accent colors
- shadcn/ui component system configured for "new-york" style
- Custom logos and assets in attached_assets directory
- Animations removed per user preference

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds React app to `dist/public`
2. **Server Build**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle Kit handles schema migrations
4. **Environment**: Configured for both development and production modes

### Development Workflow
- `npm run dev`: Runs development server with HMR
- `npm run build`: Creates production builds for both client and server
- `npm run db:push`: Applies database schema changes
- `npm run check`: TypeScript type checking

### Production Considerations
- Server configured for Node.js ESM modules
- Static file serving from built client assets
- Database connection via environment variable `DATABASE_URL`
- Replit-specific development banner integration
- Error overlay for development debugging

## Recent Changes

### January 25, 2025
- **Complete Responsive Design Overhaul**: Made entire website 100% responsive with perfect mobile-to-desktop compatibility
- **Fixed Critical Layout Issues**: Resolved "Explore Packages" button positioning and navigation bar overcrowding problems
- **Navigation Improvements**: Implemented condensed navigation with abbreviated text and universally known icons for optimal space usage
- **Enhanced Button Layouts**: Added proper constraints and responsive text sizing across all screen sizes to prevent content overlap
- **Created Comprehensive Backend Guide**: Developed detailed creation-guide.md with 100% free backend implementation solutions including database, authentication, payments, and deployment
- **Mobile-First Design Patterns**: Successfully eliminated all content overlap and cutoff issues with proper breakpoints and constraints
- **Comprehensive Pricing System Implementation**: Added detailed pricing plans for all services with realistic figures structured to be more profitable for longer payment terms
- **Personalized Package Recommendation System**: Created an interactive business assessment wizard that recommends optimal packages and services based on company size, budget, stage, goals, timeframe, and technical expertise

### January 26, 2025
- **Successful Migration to Standard Replit Environment**: Completed migration from Replit Agent to standard Replit environment ensuring compatibility, security, and proper client/server separation
- **PostgreSQL Database Configuration**: Successfully connected to PostgreSQL database with complete schema deployment including users, quotes, projects, and sessions tables
- **Admin Account Creation**: Successfully created admin account (mkanakabailey@gmail.com) with full administrative privileges in the production database
- **Database Integration**: Configured application to use actual PostgreSQL database instead of mock data, ensuring all operations use real persistent data
- **Environment Optimization**: Verified all dependencies, server configuration, and development workflow compatibility with Replit infrastructure
- **Complete Admin Panel Implementation**: Created comprehensive admin dashboard with full user management capabilities including viewing all users, blocking/unblocking accounts, permanent user deletion, activity monitoring, and role management
- **Enhanced Authentication System**: Fixed admin login redirects to automatically route admins to admin dashboard, implemented role-based access controls, and secured all admin endpoints with proper authentication middleware
- **Security Features**: Added safeguards preventing admins from deleting their own accounts, implemented confirmation dialogs for destructive actions, and comprehensive activity logging for all admin operations
- **Company Information Pages**: Created comprehensive About Us page with founding story and team profiles, built Careers page with job listings and application form, developed Case Studies page with real ROI data proving service effectiveness
- **Contact System Enhancement**: Implemented contact popup with clickable email (infodesk@2pbal.online) and phone (+16822844934), added recruitment email (recruitment@2pbal.site) for career inquiries
- **API Parameter Order Fix**: Resolved critical apiRequest function parameter order issues that were causing fetch errors throughout the application