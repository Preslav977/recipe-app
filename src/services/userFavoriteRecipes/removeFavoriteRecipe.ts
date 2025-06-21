import { doc, getDoc, updateDoc } from "firebase/firestore";
import { fireStoreApp } from "../../firebaseConfig/firebaseconfig";

export const removeFavoriteRecipe = async (
  userId: string,
  recipeId: string,
) => {
  const userRef = doc(fireStoreApp, "users", userId);

  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const favoriteList = userSnap.data().favorites;

      const newFavoriteList = favoriteList.filter(
        (recipe: string) => recipe !== recipeId,
      );

      await updateDoc(userRef, { favorites: newFavoriteList });
    }
  } catch (error) {
    throw error;
  }
};
