import { describe, it, expect } from 'vitest';
import { hello } from '../utils/hello';

describe('Hello Utils', () => {
  it('should return Hello World', () => {
    expect(hello('World')).toBe('Hello World');
  });
});
