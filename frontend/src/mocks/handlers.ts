// src/mocks/handlers.ts
import { loginHandlers } from './loginHandlers'
import { productHandlers } from './productHandlers'

// Combine all handlers
export const handlers = [
  ...loginHandlers,
  ...productHandlers,
]
