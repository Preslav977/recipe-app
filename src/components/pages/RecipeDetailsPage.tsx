import { useParams } from "react-router-dom";
import { RecipeDetails } from "../RecipeDetails/RecipeDetails";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getRecipeThunk } from "../../thunks/recipeThunks/getRecipeThunk";
import Typography from "@mui/material/Typography";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const RecipeDetailsPage = () => {
  const { id: recipeId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const recipe = useSelector((state: RootState) => state.getRecipeThunk);

  useEffect(() => {
    if (recipeId) {
      dispatch(getRecipeThunk(recipeId));
    }
  }, [dispatch, recipeId]);

  return (
    <>
      {recipe.loading === "pending" && <LoadingSpinner />}
      {recipe.loading === "failed" && (
        <Typography>Error: {recipe.error}</Typography>
      )}
      <RecipeDetails recipe={recipe} />
    </>
  );
};
