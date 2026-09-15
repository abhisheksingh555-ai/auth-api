import argon2 from "argon2";

export const hashPassword = async (password) => {
  if (typeof password !== "string" || password.length === 0) {
    throw new TypeError("Password must be a non-empty string");
  }

  return argon2.hash(password, {
    type: argon2.argon2id,
  });
};
[]
export const verifyPassword = async (passwordHash, password) => {
  if (
    typeof passwordHash !== "string" ||
    typeof password !== "string"
  ) {
    return false;
  }

  try {
    return await argon2.verify(passwordHash, password);
  } catch {
    return false;
  }
};