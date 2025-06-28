import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebaseConfig/firebaseconfig";

export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser!);
    // console.log("Email Verification sent");
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // console.error(errorMessage);
    throw error;
  }
};
