import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { fireStoreApp } from "../../firebaseConfig/firebaseconfig";
import { UserFavoriteList } from "../../interfaces/UserFavoriteList/UserFavoriteList";

export const createUseFavoriteList = async (): Promise<void> => {
  const auth = getAuth();

  const user = auth.currentUser;

  if (!user) return;
  try {
    const userRef = doc(fireStoreApp, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const userFavoriteList: UserFavoriteList = {
        id: user.uid,
        email: user.email ?? "",
        favorites: [],
      };
      await setDoc(userRef, userFavoriteList);
      console.log("Successfully created user favorite list");
    }
  } catch (error) {
    console.log("Failed to create user favorite list");
    throw error;
  }
};
