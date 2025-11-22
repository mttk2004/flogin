# Frontend README

## Overview

React 19 + TypeScript + Vite frontend application for FloginFE_BE project, implementing user interface for authentication and product management with comprehensive testing.

## Technology Stack

- **React**: 19.2.0
- **TypeScript**: 5.9
- **Build Tool**: Vite 7
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Form Management**: React Hook Form + Zod
- **Testing**: Vitest, Testing Library, Cypress
- **Styling**: CSS (extensible)

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── services/           # API service layer
│   ├── hooks/              # Custom React hooks
│   ├── contexts/           # React contexts
│   ├── types/              # TypeScript types/interfaces
│   ├── lib/                # Utility libraries
│   ├── constants/          # Application constants
│   ├── assets/             # Static assets
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Application entry point
├── cypress/                # E2E tests
├── public/                 # Public static files
├── package.json
├── vite.config.ts
├── tsconfig.json
└── .env.example
```

## Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TIMEOUT=10000
VITE_ENV=development
```

## Available Scripts

### Development
```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Testing
```bash
npm test                  # Run unit tests
npm run test:coverage     # Run tests with coverage
npm run cypress:open      # Open Cypress (interactive)
npm run cypress:run       # Run Cypress (headless)
```

## Testing

### Unit Tests (Vitest)

Test files: `src/**/__tests__/*.test.ts(x)`

Example:
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  it('should render login form', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
```

### E2E Tests (Cypress)

Test files: `cypress/e2e/*.cy.ts`

Example:
```typescript
describe('User Login Flow', () => {
  it('should login successfully with valid credentials', () => {
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Welcome').should('be.visible');
  });
});
```

### Coverage Report

```bash
npm run test:coverage
open coverage/index.html
```

**Coverage Goals**: ≥80%

## API Integration

### Axios Setup

```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for development workflow and TDD guidelines.

## License

See [LICENSE](../LICENSE) file for details.
