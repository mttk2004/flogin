import { server } from '../mocks/server';
import { beforeAll, afterEach, afterAll } from 'vitest';

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

import '@testing-library/jest-dom'
