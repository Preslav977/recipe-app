import { useDispatch, useSelector } from "react-redux";
import { RecipeCard } from "../RecipeCard/RecipeCard";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getAllRecipesThunk } from "../../thunks/recipeThunks/getAllRecipesThunk";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import { getUserFavoriteRecipeListThunk } from "../../thunks/userFavoriteRecipeThunk/getUserFavoriteRecipeListThunk";
import { useParams } from "react-router-dom";

export const FavouriteRecipesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.userLoginThunk.uid);
  const { recipes, loading, error } = useSelector(
    (state: RootState) => state.getAllRecipesThunk,
  );

  useEffect(() => {
    dispatch(getAllRecipesThunk());
    if (userId) {
      dispatch(getUserFavoriteRecipeListThunk(userId));
    }
  }, [dispatch, userId]);

  const { favorites } = useSelector(
    (state: RootState) => state.getUserFavoriteRecipeListThunk,
  );

  const favouriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe?.id || ""),
  );

  return (
    <Container sx={{ mb: 6 }}>
      <Typography gutterBottom variant="h4" align="center" sx={{ mt: 2 }}>
        Favorite Recipes
      </Typography>
      {loading === "pending" && <Typography>Loading...</Typography>}
      {loading === "failed" && <Typography>Error: {error}</Typography>}
      {favouriteRecipes.length === 0 && (
        <Typography>No Favourite Recipes </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        {favouriteRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} path="favoriteRecipe" />
        ))}
      </Box>
    </Container>
  );
};
