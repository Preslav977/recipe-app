import { Typography, Container } from "@mui/material";
import { RecipeForm } from "../RecipeForm/RecipeForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getRecipeThunk } from "../../thunks/recipeThunks/getRecipeThunk";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const EditRecipePage = () => {
  const { recipeId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const recipe = useSelector((state: RootState) => state.getRecipeThunk);

  useEffect(() => {
    if (recipeId) {
      dispatch(getRecipeThunk(recipeId));
    }
  }, [dispatch, recipeId]);

  if (recipe.loading === "idle" || recipe.loading === "pending") {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography
        variant="h2"
        component="h2"
        fontSize={"2rem"}
        gutterBottom
        align="center"
      >
        Update Recipe
      </Typography>
      <RecipeForm recipeToEdit={recipe} recipeId={recipeId || ""} />
    </Container>
  );
};
