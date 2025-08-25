# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Sanity Studio playground project - a React-based content management interface for Sanity CMS. The project uses Sanity Studio v4 with TypeScript and modern React (v19).

## Key Development Commands

### Primary Development Workflow
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the studio for production
- `npm run deploy` - Deploy the studio to Sanity's hosted platform

### Additional Commands
- `npm run start` - Start the built studio (production mode)
- `npm run deploy-graphql` - Deploy GraphQL API to Sanity

### Code Quality
- `eslint .` - Run ESLint (configured with @sanity/eslint-config-studio)
- `prettier .` - Format code (configured in package.json with custom settings)

## Project Architecture

### Configuration Files
- `sanity.config.ts` - Main studio configuration defining plugins, schema, dataset, and project settings
- `sanity.cli.ts` - CLI configuration with project ID, dataset, and auto-updates enabled
- `schemaTypes/index.ts` - Schema definitions entry point (currently empty array)

### Core Structure
- **Studio Configuration**: Centralized in `sanity.config.ts` with:
  - Project ID: 'a09jbdjz' 
  - Dataset: 'production'
  - Plugins: Structure Tool and Vision Tool enabled
  - Schema types imported from `./schemaTypes`

### Key Dependencies
- `sanity@^4.4.1` - Core Sanity Studio package
- `@sanity/vision@^4.4.1` - Vision tool for GROQ queries
- `react@^19.1` & `react-dom@^19.1` - React 19 support
- `styled-components@^6.1.18` - CSS-in-JS styling
- `typescript@^5.8` - TypeScript support

### Development Setup
- **ESLint**: Uses `@sanity/eslint-config-studio` for studio-specific rules
- **Prettier**: Configured with semi:false, printWidth:100, bracketSpacing:false, singleQuote:true
- **TypeScript**: Modern config targeting ES2017 with strict mode

## Sanity Studio Architecture

### Plugins System
The studio currently uses two core plugins:
- `structureTool()` - Provides the default studio interface
- `visionTool()` - Enables GROQ query testing within the studio

### Schema Architecture
- Schemas are defined in `schemaTypes/index.ts` (currently empty)
- Schema types are imported and used in the main config
- To add content types, define them in `schemaTypes/` and export from the index

### Content Structure
- **Project ID**: a09jbdjz (connects to specific Sanity project)
- **Dataset**: production (can be changed for different environments)
- **Auto-updates**: Enabled in CLI config for automatic studio updates

## Working with Schemas

When adding new content types:
1. Create schema definition files in `schemaTypes/`
2. Export them from `schemaTypes/index.ts`
3. Schema changes will hot-reload in development mode

## Deployment

The studio can be deployed in multiple ways:
- `npm run deploy` - Deploy to Sanity's hosted studio
- `npm run build` then serve static files - Self-hosted option
- The built studio is a static React application

## Environment Considerations

- Development runs on Sanity's development server
- Production build creates optimized static assets
- The studio connects to the Sanity backend via the configured project ID and dataset
