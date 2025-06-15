import {
  createUserWithEmailAndPassword,
  Auth,
  UserCredential,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

import { auth } from "../firebaseConfig/firebaseconfig";



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
    console.log("Registered", userCredential.user);
    return userCredential;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage);
    throw error;
  }
};

export const EmailVerification=async(user)=>{
    try{
      await sendEmailVerification(user);
      console.log("Email Verification sent");
    }
    catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage);
    throw error;
  }
}


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
    console.log("Logged:", userCredential.user);
    return userCredential;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
