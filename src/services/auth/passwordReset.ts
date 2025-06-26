import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export async function requestPasswordReset(email: string): Promise<void> {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err: any) {
    throw err;
  }
}
