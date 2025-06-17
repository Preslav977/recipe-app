import { Auth } from "firebase/auth";
import { UserCredential } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const createUser = async (
  auth: Auth,
  email: string,
  password: string,
): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    // console.log("Registered", userCredential.user);
    return userCredential;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // console.error(errorMessage);
    throw error;
  }
};
