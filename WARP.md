# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Sanity CMS playground built as a Turborepo monorepo containing:
- **Sanity Studio** (`apps/studio`) - Content management interface for editors
- **Next.js Web App** (`apps/web`) - Frontend consuming Sanity content via next-sanity
- **Shared Packages** - UI components, ESLint configs, and TypeScript configurations

The project demonstrates a full-stack content management setup with Sanity CMS v4, Next.js 15 with React 19, and modern Turborepo architecture.

## Essential Commands

### Root Level Development
- `npm run dev` - Start all apps in parallel (Studio on :3333, Web on :3000)
- `npm run build` - Build all apps and packages
- `npm run lint` - Lint all packages
- `npm run format` - Format code with Prettier

### Sanity Studio Development (apps/studio)
- `npm run dev --filter=sanity-studio-playground` - Start only Studio
- `npm run typegen --filter=sanity-studio-playground` - Generate TypeScript types from schema
- `npm run deploy --filter=sanity-studio-playground` - Deploy Studio to Sanity hosting
- `npm run deploy-graphql --filter=sanity-studio-playground` - Deploy GraphQL API

### Next.js Web App Development (apps/web)
- `npm run dev --filter=sanity-web-playground` - Start only Web app with Turbopack
- `npm run build --filter=sanity-web-playground` - Build Next.js app for production

### Shared Package Development
- `npm run generate:component --filter=@repo/ui` - Generate new React component in UI package

## Project Architecture

### Monorepo Structure
```
├── apps/
│   ├── studio/          # Sanity Studio CMS (port 3333)
│   └── web/             # Next.js frontend (port 3000)
├── packages/
│   ├── ui/              # Shared React components (@repo/ui)
│   ├── eslint-config/   # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
└── turbo.json           # Turborepo task configuration
```

### Sanity Integration Architecture
- **Project ID**: a09jbdjz (shared between Studio and Web)
- **Dataset**: production (configurable via environment)
- **API Version**: v2025-08-16
- **Content Types**: Blog posts with rich text, images, SEO fields

### Studio Configuration (`apps/studio/sanity.config.ts`)
- **Plugins**: Structure Tool, Vision Tool, Presentation Tool with live preview
- **Schema**: Blog document type with orderable list support, SEO optimization
- **Content Structure**: Rich text with Portable Text, image handling, slug generation

### Web App Architecture (`apps/web`)
- **Framework**: Next.js 15 with App Router and Turbopack
- **Sanity Integration**: next-sanity client with ISR caching (60s revalidation)
- **Styling**: Tailwind CSS 4 with PostCSS
- **Visual Editing**: Live preview integration with Sanity Presentation Tool

### Shared Packages
- **@repo/ui**: React 19 components with TypeScript, exports via `./src/*.tsx`
- **@repo/eslint-config**: Extends Next.js, React, and Prettier configurations
- **@repo/typescript-config**: Shared TypeScript compiler configurations

## Content Schema Architecture

### Blog Document Type (`apps/studio/src/schemaTypes/documents/blog.ts`)
- **Fields**: title, description, slug (auto-generated with `blog/` prefix), publishedAt, image, rich text content
- **SEO Integration**: Meta titles, descriptions, Open Graph fields
- **Validation**: Description length (140-160 chars), required fields, slug formatting
- **Preview**: Shows visibility status, publication date, and URL slug

### Schema Organization
```
src/schemaTypes/
├── documents/          # Document types (blog)
├── definitions/        # Reusable field definitions (rich-text)
└── utils/             # Schema utilities (SEO fields, validation, constants)
```

### Schema Type Development Best Practices

#### Content Modeling
- Model content for what things are, not what they look like in a front-end
- Consider content semantics (e.g., use `status` instead of `color`)

#### Schema Type Definition
- ALWAYS use `defineType`, `defineField`, and `defineArrayMember` helpers
- Write schema types to their own files with matching named exports
- Only use a `title` attribute when it differs from title-cased `name`
- Include descriptive `description` values for non-obvious fields
- Use `rule.warning()` for fields that benefit from length guidelines
- Include helpful validation errors with `rule.required().error('Message')`

#### Field Configuration
- Use `options.layout: "radio"` for string fields with fewer than 5 options
- Include `options.hotspot: true` for all image fields
- Avoid `boolean` fields; use string fields with options.list instead
- Prefer arrays of references over single reference fields
- Order fields from most to least important/frequently used

#### Schema Type Decoration
- Add icons from `@sanity/icons` or `lucide-react` to all document/object types
- Customize the `preview` property to show rich contextual details
- Use `groups` for schemas with many fields, showing the most important by default
- Use `fieldsets` with `options: {columns: 2}` for related fields

## Development Workflow

### Content Development
1. **Schema Changes**: Modify files in `apps/studio/src/schemaTypes/`, changes hot-reload
2. **Type Generation**: Run `npm run typegen --filter=sanity-studio-playground` after schema changes
3. **Frontend Integration**: Use generated types in Web app via `src/lib/sanity/sanity.types.ts`

### TypeScript Generation
- Re-run schema extraction after schema changes with `npx sanity@latest schema extract`
- Extract schema to web folder with `npx sanity@latest schema extract --path=../web/sanity/extract.json`
- Generate types with `npx sanity@latest typegen generate` after every GROQ query change
- Refer to `sanity-typegen.json` configuration for type generation settings

### Content Import/Export
- Import content from .ndjson files using `npx sanity dataset import <filename.ndjson>`
- Write content files as `.ndjson` at the root of the project
- Never include a `.` in document `_id` fields unless they need to be private
- Use Sanity CLI for project interaction whenever possible (`npx sanity --help`)

### Monorepo Development
- **Filtering**: Use `--filter=app-name` for single app development
- **Dependencies**: Turborepo handles build dependencies automatically
- **Caching**: Remote caching available via Vercel (run `turbo login` and `turbo link`)

### Environment Setup
- **Web App**: Requires `NEXT_PUBLIC_SANITY_PROJECT_ID` environment variable
- **Studio URL**: Configurable via `NEXT_PUBLIC_SANITY_STUDIO_URL` (defaults to localhost:3333)
- **Dataset**: Configurable via `NEXT_PUBLIC_SANITY_DATASET` (defaults to 'production')

## Testing and Quality

### Linting
- **Studio**: Uses `@sanity/eslint-config-studio` with custom rules
- **Web**: Uses Next.js ESLint config with React 19 support
- **Shared**: Custom ESLint configurations in `@repo/eslint-config`

### Type Checking
- `npm run check-types` - Type check all packages
- TypeScript 5.9.2 with strict mode enabled
- Shared configurations via `@repo/typescript-config`

## Deployment

### Sanity Studio
- **Hosted**: `npm run deploy --filter=sanity-studio-playground` (deploys to Sanity hosting)
- **Self-hosted**: `npm run build --filter=sanity-studio-playground` creates static build

### Next.js Web App
- Standard Next.js deployment (Vercel, self-hosted)
- Requires Sanity project environment variables
- ISR caching configured for content revalidation

### Live Preview Integration
- Presentation Tool configured with draft mode API route
- Visual editing enabled between Studio and Web app
- Real-time content preview during editing

## GROQ Query Development

### Query Best Practices
- Use SCREAMING_SNAKE_CASE for query variable names (e.g., `POSTS_QUERY`)
- Write queries to their own variables, never as inline parameters
- Use the `defineQuery` function from `next-sanity` to wrap query strings
- Explicitly write every required attribute in projections
- Place each segment of a filter and each attribute on its own line
- Use parameters for variables in queries, never string interpolation

### Example Query Format
```ts
import { defineQuery } from 'next-sanity';

export const BLOG_POSTS = defineQuery(`*[
  _type == "blog"
  && slug.current == $slug
][0]{
  _id,
  title,
  image,
  publishedAt,
  content
}`);
```
