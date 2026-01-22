import bcrypt from "bcryptjs";
import { getDb } from "./db";

const USERS_COLLECTION = "users";

export async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

export async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

// Support both username and email for login (existing DB uses username)
export async function findUserByUsername(username) {
  const db = await getDb();
  return db.collection(USERS_COLLECTION).findOne({ username: username.toLowerCase() });
}

export async function findUserByEmail(email) {
  const db = await getDb();
  // Try email first, then fallback to username
  const user = await db.collection(USERS_COLLECTION).findOne({ email: email.toLowerCase() });
  if (user) return user;
  // Fallback: treat email as username for existing users
  return db.collection(USERS_COLLECTION).findOne({ username: email.toLowerCase() });
}

export async function updateLastLogin(username) {
  const db = await getDb();
  await db.collection(USERS_COLLECTION).updateOne(
    { username: username.toLowerCase() },
    { $set: { lastLoginAt: new Date() } }
  );
}
