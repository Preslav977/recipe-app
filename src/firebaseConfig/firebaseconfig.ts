require("dotenv").config();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const fireStoreApp = getFirestore(firebaseApp);

export const functions = getFunctions(firebaseApp);

connectFunctionsEmulator(functions, "127.0.0.1", 5001);
