import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addRecipeUserFavoriteRecipeListThunk } from "../../thunks/userFavoriteRecipeThunk/addRecipeUserFavoriteRecipeListThunk";

export function AddFavoriteRecipeButton({
  userId,
  recipeId,
}: {
  userId: string;
  recipeId: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  function addToFavoriteRecipe(userId: string, recipeId: string) {
    dispatch(
      addRecipeUserFavoriteRecipeListThunk({
        userId: userId,
        recipeId: recipeId,
      }),
    );
  }

  return (
    <button onClick={() => addToFavoriteRecipe(userId, recipeId)}>
      Add to favorite
    </button>
  );
}
