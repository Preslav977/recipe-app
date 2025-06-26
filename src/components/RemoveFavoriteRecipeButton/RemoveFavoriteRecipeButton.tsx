import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { removeRecipeUserFavoriteRecipeListThunk } from "../../thunks/userFavoriteRecipeThunk/removeRecipeUserFavoriteRecipeListThunk";

export function RemoveFavoriteRecipeButton({
  userId,
  recipeId,
}: {
  userId: string;
  recipeId: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  function removeFromFavoriteRecipe(userId: string, recipeId: string) {
    dispatch(
      removeRecipeUserFavoriteRecipeListThunk({
        userId: userId,
        recipeId: recipeId,
      }),
    );
  }

  return (
    <button onClick={() => removeFromFavoriteRecipe(userId, recipeId)}></button>
  );
}
