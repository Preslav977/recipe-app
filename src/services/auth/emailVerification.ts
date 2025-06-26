import { getAuth, sendEmailVerification } from "firebase/auth";

export const emailVerification = async () => {
  try {
    const auth = getAuth();
    await sendEmailVerification(auth.currentUser!);
    // console.log("Email Verification sent");
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // console.error(errorMessage);
    throw error;
  }
};
