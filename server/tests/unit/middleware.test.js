const { protect } = require('../../src/middleware/authMiddleware');

describe('Auth Middleware Unit Tests', () => {
  let req, res, next;

  // Reset mocks before each test
  beforeEach(() => {
    req = {
      headers: {}
    };
    res = {
      status: jest.fn().mockReturnThis(), // Allow chaining .status().json()
      json: jest.fn()
    };
    next = jest.fn(); // Mock the next() function
  });

  test('should call next() if valid token is provided', async () => {
    // 1. Arrange: specific token format
    req.headers.authorization = 'Bearer fake-jwt-token-for-user123';

    // 2. Act
    await protect(req, res, next);

    // 3. Assert
    expect(next).toHaveBeenCalled(); // Success!
    expect(req.user).toBeDefined(); // User was attached
    expect(req.user._id).toBe('user123');
  });

  test('should return 401 if no token is provided', async () => {
    // 1. Arrange: No headers
    req.headers = {};

    // 2. Act
    await protect(req, res, next);

    // 3. Assert
    expect(next).not.toHaveBeenCalled(); // Should NOT continue
    expect(res.status).toHaveBeenCalledWith(401); // Should return Error
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.stringMatching(/not authorized/i)
    }));
  });
});