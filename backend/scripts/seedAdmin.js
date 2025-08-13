import mongoose from "mongoose";
import { config } from "dotenv";
import { User } from "../models/userSchema.js";

// Load env from both .env and config.env if present
config();
config({ path: "./config.env" });

const REQUIRED_ENVS = ["MONGO_URI", "JWT_SECRET_KEY"]; // JWT needed for token generation if used later

for (const key of REQUIRED_ENVS) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
  }
}

const ADMIN_FIRST_NAME = process.env.ADMIN_FIRST_NAME || "Super";
const ADMIN_LAST_NAME = process.env.ADMIN_LAST_NAME || "Admin";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PHONE = process.env.ADMIN_PHONE || "03001234567"; // 11 digits
const ADMIN_NIC = process.env.ADMIN_NIC || "1234567890123"; // 13 digits
const ADMIN_DOB = process.env.ADMIN_DOB || "1990-01-01"; // ISO date string
const ADMIN_GENDER = process.env.ADMIN_GENDER || "Male"; // Male | Female
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "AdminPass123"; // >= 8 chars

async function connectToDatabase() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is not set in environment.");
  }
  await mongoose.connect(mongoUri, {
    dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
  });
  console.log("Connected to MongoDB (seed script)");
}

async function ensureAdmin() {
  const existing = await User.findOne({ email: ADMIN_EMAIL, role: "Admin" });
  if (existing) {
    console.log(`Admin already exists with email: ${ADMIN_EMAIL}`);
    return;
  }

  const admin = await User.create({
    firstName: ADMIN_FIRST_NAME,
    lastName: ADMIN_LAST_NAME,
    email: ADMIN_EMAIL,
    phone: ADMIN_PHONE,
    nic: ADMIN_NIC,
    dob: new Date(ADMIN_DOB),
    gender: ADMIN_GENDER,
    password: ADMIN_PASSWORD,
    role: "Admin",
  });

  console.log("Admin created:", {
    id: admin._id.toString(),
    email: admin.email,
    firstName: admin.firstName,
    lastName: admin.lastName,
  });
}

async function main() {
  try {
    await connectToDatabase();
    await ensureAdmin();
  } catch (err) {
    console.error("Admin seed failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed (seed script)");
  }
}

// Execute
main();


