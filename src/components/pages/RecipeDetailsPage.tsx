import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { getRecipeThunk } from "../../thunks/recipeThunks/getRecipeThunk";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { RecipeDetails } from "../RecipeDetails/RecipeDetails";

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
        <Typography
          sx={{
            color: "red",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Error: {recipe.error}
        </Typography>
      )}
      <RecipeDetails recipe={recipe} />
    </>
  );
};
