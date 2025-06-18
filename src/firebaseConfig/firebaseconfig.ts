/// <reference types="vite/client" />

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const fireStoreApp = getFirestore(firebaseApp);

export const functions = getFunctions(firebaseApp);

export const auth = getAuth(firebaseApp);

connectFunctionsEmulator(functions, "127.0.0.1", 5001);

export { createUser } from "../services/auth/createUser";
export { emailVerification } from "../services/auth/emailVerification";
export { loginUser } from "../services/auth/loginUser";
export { signOutUser } from "../services/auth/signOutUser";
export { createUseFavoriteList } from "../services/userFavoriteList/createUserFavoriteList";
