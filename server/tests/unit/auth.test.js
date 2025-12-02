const { generateToken } = require('../../src/utils/auth');

describe('Auth Utils Unit Tests', () => {
  test('should generate a token containing the user ID', () => {
    // 1. Arrange: Create mock data
    const mockUser = { _id: '12345' };

    // 2. Act: Run the function
    const token = generateToken(mockUser);

    // 3. Assert: Check the result
    expect(token).toBe('fake-jwt-token-for-12345');
    expect(typeof token).toBe('string');
  });
});