import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getAllRecipesThunk } from "../../thunks/recipeThunks/getAllRecipesThunk";
import { getUserFavoriteRecipeListThunk } from "../../thunks/userFavoriteRecipeThunk/getUserFavoriteRecipeListThunk";
import { emailVerification } from "../../firebaseConfig/firebaseconfig";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { uid, emailVerified } = useSelector(
    (state: RootState) => state.userLoginThunk,
  );

  useEffect(() => {
    dispatch(getAllRecipesThunk());

    dispatch(getUserFavoriteRecipeListThunk(`${uid}`));
  });

  const getAllRecipesLength = useSelector(
    (state: RootState) => state.getAllRecipesThunk.recipes.length,
  );

  const getAllMyRecipesLength = useSelector(
    (state: RootState) =>
      state.getAllRecipesThunk.recipes.filter(
        (myRecipes) => myRecipes.authorId === uid,
      ).length,
  );

  //later get all my favorites recipes length
  //  const getAllMyFavoriteRecipes = useSelector((state: RootState) => )

  return (
    <Box
      sx={{
        minHeight: "80vh",
        marginTop: "0.5em",
        padding: "1.5em",
      }}
    >
      <Typography variant="h3">Dashboard</Typography>
      <Box sx={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
        <Paper
          sx={{
            outline: "2px solid white",
            maxWidth: 250,
            backgroundColor: "#1976d2",
            width: "100%",
            padding: "1rem",
            marginTop: "0.5em",
            color: "white",
          }}
        >
          {getAllRecipesLength}
          <Typography variant="body2">All Recipes</Typography>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/recipes"
          >
            More information
          </Link>
        </Paper>

        <Paper
          sx={{
            outline: "2px solid white",
            maxWidth: 250,
            backgroundColor: "#1976d2",
            width: "100%",
            padding: "1rem",
            marginTop: "0.5em",
            color: "white",
          }}
        >
          {getAllMyRecipesLength}
          <Typography variant="body2">My Recipes</Typography>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/recipes"
          >
            More information
          </Link>
        </Paper>

        <Paper
          sx={{
            outline: "2px solid white",
            backgroundColor: "#1976d2",
            maxWidth: 250,
            width: "100%",
            padding: "1rem",
            marginTop: "0.5em",
            color: "white",
          }}
        >
          1<Typography variant="body2">Favorite Recipes</Typography>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/favoriteRecipes"
          >
            More information
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
