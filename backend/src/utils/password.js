import bcrypt from "bcryptjs";

// Hash password before saving
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare entered password with stored hash
export const comparePassword = async (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
