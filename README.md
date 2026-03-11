# VIDE Coding Marketplace - Frontend

A production-like marketplace for used computer hardware components built with Next.js 14, TypeScript, and modern web technologies.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query (REST-first)
- **Forms**: React Hook Form + Zod validation
- **Testing**: Vitest + React Testing Library
- **Storybook**: Component documentation and testing
- **Code Quality**: ESLint + Prettier

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── (auth)/            # Authentication routes (login, register)
│   ├── (public)/          # Public routes (home, catalog)
│   ├── (account)/         # Account routes (profile)
│   ├── globals.css        # Global styles and Tailwind config
│   └── layout.tsx         # Root layout with providers
├── features/              # Business features
│   └── auth/              # Authentication feature
│       ├── components/    # Feature-specific components
│       ├── hooks/         # Feature hooks (queries, mutations)
│       └── api/           # API functions for this feature
├── entities/              # Reusable domain-specific UI
│   └── user/              # User-related components and models
├── shared/                # Shared utilities and infrastructure
│   ├── ui/
│   │   ├── shadcn/        # Generated shadcn/ui components
│   │   └── app/           # Project-specific UI components
│   ├── api/               # API client and HTTP utilities
│   ├── lib/               # Shared libraries and utilities
│   ├── hooks/             # Shared hooks
│   └── types/             # TypeScript type definitions
└── __tests__/             # Test configuration and setup
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vide_coding_marketplace_front-end
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

## 🧪 Testing

The project uses Vitest for unit testing and React Testing Library for component testing.

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with watch mode
npm run test -- --watch

# Run tests with coverage
npm run test -- --coverage
```

### Test Structure

- Unit tests are placed alongside the files they test
- Component tests use `*.test.tsx` naming convention
- Test utilities and mocks are in `__tests__/` directory

## 📚 Storybook

Storybook is configured for component development and documentation.

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

Storybook will be available at `http://localhost:6006`.

## 🎨 UI Components

### shadcn/ui Integration

The project uses shadcn/ui as a foundation with project-specific conventions:

- Generated components live in `src/shared/ui/shadcn/`
- Project wrappers and patterns live in `src/shared/ui/app/`
- All components follow the established design system

### Custom Components

- `PageContainer` - Responsive page layout wrapper
- `EmptyState` - Consistent empty state displays
- `LoadingSkeleton` - Loading state skeletons

## 🔧 API Integration

### API Client

The project includes a type-safe API client:

```typescript
import { apiClient } from '@/shared/api/client'

// GET request
const user = await apiClient.get<User>('/api/auth/me')

// POST request
const result = await apiClient.post<AuthResponse>('/api/auth/login', data)
```

### TanStack Query

React Query is configured with sensible defaults:

```typescript
import { useCurrentUser } from '@/features/auth/hooks/use-auth'

const { data: user, isLoading, error } = useCurrentUser()
```

## 📝 Code Quality

### ESLint + Prettier

The project is configured with strict linting rules:

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint -- --fix

# Check formatting
npx prettier --check .

# Fix formatting
npx prettier --write .
```

### TypeScript

Strict TypeScript mode is enabled with:

- No implicit `any` types
- Strict null checks
- Explicit return types where beneficial

## 🚀 Deployment

### Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Build Process

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Follow the established folder structure and naming conventions
2. Ensure all tests pass before submitting
3. Run linting and type checking
4. Add Storybook stories for new components
5. Update documentation as needed

## 📄 License

This project is licensed under the MIT License.
