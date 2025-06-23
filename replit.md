# eciple - One-To-One Discipleship Platform

## Overview

eciple is a full-stack web application designed to revolutionize discipleship management for churches and ministries. The platform provides comprehensive tools for building and managing one-to-one discipleship programs, including mentor-mentee matching, structured pathways, integrated communications, and analytics.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state, local React state for UI
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion for smooth transitions and interactions
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Authentication**: Passport.js with local strategy and session management
- **Session Storage**: Memory store with configurable persistence

### Database Schema
- **Users**: Authentication and user management
- **Contact Requests**: Lead generation and inquiry management
- **Shared Schema**: Centralized database schema definitions with Zod validation

## Key Components

### Authentication System
- Dual authentication flows: main site access and investor portal
- Admin authentication system with bcrypt password hashing and secure session management
- Session-based authentication with configurable session duration
- Password hashing using Node.js crypto with scrypt for main auth, bcrypt for admin auth
- Protected routes with authentication middleware
- Admin dashboard accessible at /admin-login with credentials: admin/password123

### Content Management
- Dynamic content editing system with localStorage persistence
- Admin mode for real-time content updates
- Multiple content editor components for different use cases
- Document generation capabilities for content templates

### Contact Management
- Form submission handling with validation
- Email integration via Formspree
- Lead tracking and administrative dashboard
- Contact request storage and retrieval

### Multi-Page Structure
- Main marketing site with comparison and pricing
- Investor portal with dashboard and metrics
- Legal pages (privacy policy, terms, cookie policy)
- Protected investor dashboard with analytics

## Data Flow

### Client-Server Communication
1. Frontend makes API requests to Express backend
2. Authentication middleware validates sessions
3. Database operations through Drizzle ORM
4. JSON responses with error handling
5. Real-time updates via React Query

### Content Management Flow
1. Admin users can edit content through various editor interfaces
2. Content changes are stored in localStorage for immediate updates
3. Changes can be exported/imported via document generation
4. Content validation ensures data integrity

### Authentication Flow
1. User submits credentials to `/api/login`
2. Server validates against database using Passport.js
3. Session created and stored in memory
4. Protected routes check authentication status
5. Client redirects based on authentication state

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database
- **Connection Pooling**: Built-in connection management
- **Environment Variables**: `DATABASE_URL` for connection string

### Email Services
- **Formspree**: Contact form submission handling
- **SendGrid**: Email delivery service (configured but not actively used)

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Framer Motion**: Animation library
- **React Hook Form**: Form handling with validation

### Development Tools
- **TypeScript**: Type safety across the stack
- **ESBuild**: Fast bundling for production
- **Drizzle Kit**: Database migrations and schema management
- **Vite**: Development server and build tool

## Deployment Strategy

### Build Process
1. **Development**: `npm run dev` - runs TypeScript server with hot reload
2. **Production Build**: `npm run build` - compiles both client and server
3. **Start**: `npm run start` - runs production server

### Environment Configuration
- **Development**: Local development with TypeScript execution
- **Production**: Compiled JavaScript with optimized client bundle
- **Database**: Environment-based connection string
- **Sessions**: Configurable secret and storage options

### Replit Configuration
- **Modules**: Node.js 20, web, PostgreSQL 16
- **Ports**: Local 5000, External 80
- **Deployment**: Autoscale with build and start scripts
- **Workflows**: Parallel execution with port monitoring

## Changelog
```
Changelog:
- June 16, 2025. Initial setup
- June 23, 2025. Added secure admin authentication system with database storage
- June 23, 2025. Enhanced document management with subtitle and link functionality
- June 23, 2025. Created admin dashboard with full CRUD operations for EcipleMatch documents
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```