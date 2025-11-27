// src/mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// This configures a request-mocking server with the given request handlers.
// It's used for Node-based environments like Vitest.
export const server = setupServer(...handlers)
