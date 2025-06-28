import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getAllRecipesThunk } from "../../thunks/recipeThunks/getAllRecipesThunk";
import { getUserFavoriteRecipeListThunk } from "../../thunks/userFavoriteRecipeThunk/getUserFavoriteRecipeListThunk";
import { emailVerification } from "../../firebaseConfig/firebaseconfig";
import { useNavigate } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { SvgIcon } from "@mui/material";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { RecipeCard } from "../RecipeCard/RecipeCard";

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { uid, emailVerified } = useSelector(
    (state: RootState) => state.userLoginThunk,
  );

  useEffect(() => {
    dispatch(getAllRecipesThunk());

    dispatch(getUserFavoriteRecipeListThunk(`${uid}`));

    dispatch(getUserFavoriteRecipeListThunk(`${uid}`));
  }, [dispatch, uid]);

  const { recipes, loading, error } = useSelector(
    (state: RootState) => state.getAllRecipesThunk,
  );

  const getDeletedRecipeId = useSelector(
    (state: RootState) => state.deleteRecipeThunk.id,
  );

  const newFilteredAllRecipesArray = recipes.filter(
    (recipe) => recipe.id !== getDeletedRecipeId,
  );

  const { favorites } = useSelector(
    (state: RootState) => state.getUserFavoriteRecipeListThunk,
  );

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id!),
  );

  const myRecipes = recipes.filter((recipe) => recipe.authorId === uid);

  return (
    <>
      <Box
        sx={{
          marginTop: "0.5em",
          padding: "1.5em",
        }}
      >
        <Typography variant="h2" fontSize={"2rem"}>
          Dashboard
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "1em",
            flexWrap: "wrap",
            padding: "2em",
            "@media (max-width: 650px)": {
              padding: 0,
            },
          }}
        >
          <Paper
            sx={{
              maxWidth: 350,
              height: 125,
              backgroundColor: "#1976d2",
              width: "100%",
              padding: "1rem",
              marginTop: "0.5em",
              color: "white",
            }}
          >
            {newFilteredAllRecipesArray.length}
            <Typography variant="body2">All Recipes</Typography>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
                gap: "0.5em",
              }}
              to="/recipes"
            >
              More information
              <SvgIcon component={ArrowCircleRightIcon} />
            </Link>
          </Paper>

          <Paper
            sx={{
              maxWidth: 350,
              height: 125,
              backgroundColor: "#1976d2",
              width: "100%",
              padding: "1rem",
              marginTop: "0.5em",
              color: "white",
            }}
          >
            {myRecipes.length}
            <Typography variant="body2">My Recipes</Typography>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
                gap: "0.5em",
              }}
              to="/recipes"
            >
              More information
              <SvgIcon component={ArrowCircleRightIcon} />
            </Link>
          </Paper>

          <Paper
            sx={{
              backgroundColor: "#1976d2",
              maxWidth: 350,
              height: 125,
              width: "100%",
              padding: "1rem",
              marginTop: "0.5em",
              color: "white",
            }}
          >
            {favoriteRecipes.length}
            <Typography variant="body2">Favorite Recipes</Typography>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
                gap: "0.5em",
              }}
              to="/favoriteRecipes"
            >
              More information
              <SvgIcon component={ArrowCircleRightIcon} />
            </Link>
          </Paper>
        </Box>

        {!emailVerified ? (
          <Box
            sx={{
              marginTop: "0.5em",
            }}
          >
            <Typography variant="body2" sx={{ fontSize: "1.25rem" }}>
              Note: Your email is not verified, you can only read!
            </Typography>
            <Button
              onClick={() => {
                emailVerification();

                setTimeout(() => navigate("/login"), 2000);
              }}
              sx={{ marginLeft: "-9.4px" }}
            >
              Click here to send email link!
            </Button>
          </Box>
        ) : (
          ""
        )}
      </Box>
      <Box
        sx={{
          marginTop: "0.5em",
          padding: "1.5em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            flexWrap: "wrap",
          }}
        >
          <Typography
            gutterBottom
            variant="h3"
            fontSize={"2rem"}
            sx={{ mt: 2 }}
          >
            My Recipes
          </Typography>
          {loading === "pending" && <LoadingSpinner />}
          {loading === "failed" && (
            <Typography
              sx={{
                color: "red",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Error: {error}
            </Typography>
          )}
          {myRecipes.length === 0 && (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              No Recipes Yet
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {myRecipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} path="recipe" />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};
