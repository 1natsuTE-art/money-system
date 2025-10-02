# Project Memory

## Tech Stack Context
- **Frontend Framework**: React 18+ with Next.js App Router
- **UI Library**: Material-UI (MUI) v5+
- **Language**: TypeScript with strict mode
- **Build Tool**: Vite for development and build
- **Package Manager**: npm (check package.json for exact version)

## Development Standards

### Code Style
- Use TypeScript strict mode
- Prefer functional components with hooks
- Use arrow functions for component definitions
- Follow MUI theming patterns for consistent styling
- Use MUI's sx prop for component-specific styles
- Implement proper TypeScript interfaces for props and data structures

### File Organization
- Components in `/components` with TypeScript interfaces
- Pages follow Next.js App Router structure in `/app`
- Utilities and helpers in `/lib` or `/utils`
- Type definitions in `/types` or co-located with components
- MUI theme configuration in `/styles` or `/theme`

### Component Patterns
- Use MUI components as base building blocks
- Create custom components that extend MUI when needed
- Implement responsive design using MUI's breakpoint system
- Use MUI's Grid system for layouts
- Follow MUI's color palette and typography scale

### Development Workflow
- Run `npm run dev` for development server
- Run `npm run build` for production build
- Run `npm run lint` for ESLint checks
- Run `npm run type-check` for TypeScript validation
- Use Next.js built-in optimizations for images and fonts

### Testing & Quality
- Write TypeScript interfaces for all props and API responses
- Use MUI's testing utilities for component testing
- Ensure components work across MUI's supported breakpoints
- Validate accessibility using MUI's a11y features

### Performance Considerations
- Leverage Next.js SSR/SSG capabilities
- Use dynamic imports for large components
- Optimize MUI bundle size with tree shaking
- Use Next.js Image component for optimized images
- Implement proper loading states with MUI Skeleton components

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript validation
- `npm run preview` - Preview production build locally

## Dependencies & Imports
- Import React hooks from 'react'
- Import MUI components from '@mui/material'
- Import MUI icons from '@mui/icons-material'
- Import Next.js components from 'next/*'
- Use absolute imports when configured

## Do Not
- Do not use class components - stick to functional components
- Do not bypass TypeScript strict mode
- Do not use inline styles - prefer MUI's sx prop or styled components
- Do not ignore accessibility - always include proper ARIA attributes
- Do not hardcode breakpoints - use MUI's responsive utilities
- Do not install additional UI libraries without justification
- Do not use deprecated MUI APIs - check latest documentation
- Do not commit .env files or sensitive configuration
- Do not modify node_modules directly
- Do not use any CSS framework other than MUI unless explicitly required

## Important Notes
- Always check MUI documentation for latest API changes
- Use TypeScript interfaces for component props and state
- Implement proper error boundaries for production apps
- Follow Next.js best practices for SEO and performance
- Use MUI theming for consistent design system implementation