import { collection, getDocs } from "firebase/firestore";
import { RecipeFromFireStore } from "../../interfaces/Recipe/Recipe";
import { fireStoreApp } from "../../firebaseConfig/firebaseconfig";

export const getAllRecipes = async (): Promise<RecipeFromFireStore[]> => {
  const querySnapshot = await getDocs(collection(fireStoreApp, "recipes"));
  const data = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return data as RecipeFromFireStore[];
};
