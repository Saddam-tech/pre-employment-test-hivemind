"use server";

interface AccountData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export async function createAccount(data: AccountData) {
  // Server action for creating account
  // This would typically interact with a database or API
  console.log("Creating account with data:", data);
  return { success: true };
}
