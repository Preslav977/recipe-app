import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { deleteRecipeThunk } from "../../thunks/recipeThunks/deleteRecipeThunk";

export function RemoveRecipeButton(recipeId: string) {
  const dispatch = useDispatch<AppDispatch>();

  function deleteRecipe(recipeId: string) {
    dispatch(deleteRecipeThunk(recipeId));
  }

  return <button onClick={() => deleteRecipe(recipeId)}>Delete recipe</button>;
}
