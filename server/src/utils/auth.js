// Simple mock implementation for testing purposes
const generateToken = (user) => {
  // In a real app, this would use jsonwebtoken (jwt.sign)
  return `fake-jwt-token-for-${user._id}`;
};

module.exports = { generateToken };