export const validateEmail = (email) => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // Fix: Explicitly return false if password is empty/null
  if (!password) return false;
  return password.length >= 6;
};