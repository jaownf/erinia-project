const fs = require("fs/promises");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(USERS_FILE);
  } catch (_) {
    await fs.writeFile(USERS_FILE, "[]", "utf-8");
  }
}

async function readUsers() {
  await ensureDataFile();
  const raw = await fs.readFile(USERS_FILE, "utf-8");
  try {
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  } catch (error) {
    console.warn("Invalid users.json detected. Resetting file.", error);
    await fs.writeFile(USERS_FILE, "[]", "utf-8");
    return [];
  }
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

async function createUser(user) {
  const users = await readUsers();
  users.push(user);
  await writeUsers(users);
  return user;
}

async function findUserByUsername(username) {
  const users = await readUsers();
  return users.find((user) => user.username === username.toLowerCase());
}

async function findUserByEmail(email) {
  const users = await readUsers();
  return users.find((user) => user.email === email.toLowerCase());
}

module.exports = {
  readUsers,
  writeUsers,
  createUser,
  findUserByUsername,
  findUserByEmail,
};
