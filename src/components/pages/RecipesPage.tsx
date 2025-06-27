import { useDispatch, useSelector } from "react-redux";
import { RecipeCard } from "../RecipeCard/RecipeCard";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getAllRecipesThunk } from "../../thunks/recipeThunks/getAllRecipesThunk";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const RecipesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, loading, error } = useSelector(
    (state: RootState) => state.getAllRecipesThunk,
  );

  useEffect(() => {
    dispatch(getAllRecipesThunk());
  }, [dispatch]);

  const allRecipes = useSelector(
    (state: RootState) => state.getAllRecipesThunk.recipes,
  );

  const getDeletedRecipeId = useSelector(
    (state: RootState) => state.deleteRecipeThunk.id,
  );

  const newFilteredAllRecipesArray = allRecipes.filter(
    (recipe) => recipe.id !== getDeletedRecipeId,
  );

  return (
    <Container sx={{ mb: 6 }}>
      <Typography
        gutterBottom
        variant="h2"
        align="center"
        fontSize={"2rem"}
        sx={{ mt: 2 }}
      >
        All Recipes
      </Typography>
      {loading === "pending" && <LoadingSpinner />}
      {loading === "failed" && <Typography>Error: {error}</Typography>}
      {allRecipes.length === 0 && <Typography>No Recipes Yet</Typography>}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        {newFilteredAllRecipesArray.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} path="recipe" />
        ))}
      </Box>
    </Container>
  );
};
