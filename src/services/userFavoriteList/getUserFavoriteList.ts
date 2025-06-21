import { doc, getDoc } from "firebase/firestore";
import { UserFavoriteList } from "../../interfaces/UserFavoriteList/UserFavoriteList";
import { fireStoreApp } from "../../firebaseConfig/firebaseconfig";

export const getUserFavoriteList = async (
  userId: string,
): Promise<UserFavoriteList | null> => {
  const userRef = doc(fireStoreApp, "users", userId);

  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserFavoriteList;
    }
    return null;
  } catch (error) {
    throw error;
  }
};
