import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebaseConfig/firebaseconfig";

export async function requestPasswordReset(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err: any) {
    throw err;
  }
}
