import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig/firebaseconfig";

export const signOutUser = async () => {
  try {
    await signOut(auth);
    // console.log("User signed out successfully.");
  } catch (error) {
    // console.error("Error signing out:", error);
    throw error;
  }
};
