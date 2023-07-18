import bcrypt from "bcrypt";

export function encryptPassword(password: string): string {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  return hash;
}

export function isMatchPassword(
  password: string,
  hashedPassword: string
): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}
