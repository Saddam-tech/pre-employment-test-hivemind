"use server";

import { promises as fs } from "fs";
import path from "path";

interface AccountData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const ACCOUNTS_FILE = path.join(DATA_DIR, "accounts.txt");

async function ensureDataDirectory() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

export async function createAccount(data: AccountData) {
  try {
    // Ensure data directory exists
    await ensureDataDirectory();

    // Format the account data
    const timestamp = new Date().toISOString();
    const accountEntry = `
========================================
Account Created: ${timestamp}
========================================
First Name: ${data.firstName}
Last Name: ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Password: ${"*".repeat(data.password.length)} (hidden)
========================================

`;

    // Append data to file (preserves previous data)
    await fs.appendFile(ACCOUNTS_FILE, accountEntry, "utf-8");

    return { success: true, message: "Account created successfully" };
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}
