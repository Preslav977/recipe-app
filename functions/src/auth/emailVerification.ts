import { sendEmailVerification } from "firebase/auth";

export const EmailVerification = async (user) => {
  try {
    await sendEmailVerification(user);
    console.log("Email Verification sent");
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage);
    throw error;
  }
};
