import { Auth } from "firebase/auth";
import { UserCredential } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginUser = async (
  auth: Auth,
  email: string,
  password: string,
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return userCredential;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // console.log(errorMessage);
    throw error;
  }
};
