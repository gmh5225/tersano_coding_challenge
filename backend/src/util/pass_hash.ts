import bcrypt from "bcrypt"

// Quick and dirty hashing to protect user password stored in db
async function hashPassword(plaintextPassword: string): string {
  return await bcrypt.hash(plaintextPassword, 10)
}

// Compare plaintext password to hashed password
async function comparePassword(plaintextPassword: string, hash: string): bool {
  return await bcrypt.compare(plaintextPassword, hash)
}

export default {
  hashPassword,
  comparePassword,
}
