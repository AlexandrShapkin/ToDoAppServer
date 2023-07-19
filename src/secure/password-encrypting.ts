import bcrypt from "bcrypt";

/**
 * Encrypt password with hash
 * @param {string} password 
 * @returns {string} hashedPassword
 */
export function encryptPassword(password: string): string {
  let salt = bcrypt.genSaltSync(10);
  let hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
}

/**
 * Compare `password` and `hashedPassword`
 * @param {string} password 
 * @param {string} hashedPassword 
 * @returns {boolean}
 */
export function isMatchPassword(
  password: string,
  hashedPassword: string
): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}
