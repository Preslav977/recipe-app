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

  const { recipes } = useSelector(
    (state: RootState) => state.getAllRecipesThunk,
  );

  const { favorites } = useSelector(
    (state: RootState) => state.getUserFavoriteRecipeListThunk,
  );

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id!),
  );

  const myRecipes = recipes.filter((recipe) => recipe.authorId === uid);

  return (
    <Box
      sx={{
        minHeight: "80vh",
        marginTop: "0.5em",
        padding: "1.5em",
      }}
    >
      <Typography variant="h2">Dashboard</Typography>
      <Box sx={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
        <Paper
          sx={{
            maxWidth: 250,
            backgroundColor: "#1976d2",
            width: "100%",
            padding: "1rem",
            marginTop: "0.5em",
            color: "white",
          }}
        >
          {recipes.length}
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
            maxWidth: 250,
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
            maxWidth: 250,
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
  );
};
