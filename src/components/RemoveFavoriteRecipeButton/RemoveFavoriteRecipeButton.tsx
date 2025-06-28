import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { removeRecipeUserFavoriteRecipeListThunk } from "../../thunks/userFavoriteRecipeThunk/removeRecipeUserFavoriteRecipeListThunk";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function RemoveFavoriteRecipeButton({
  userId,
  recipeId,
}: {
  userId: string;
  recipeId: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  function removeFromFavoriteRecipe(userId: string, recipeId: string) {
    dispatch(
      removeRecipeUserFavoriteRecipeListThunk({
        userId: userId,
        recipeId: recipeId,
      }),
    );
  }

  return (
    <Button
      sx={{
        outline: "2px solid #1976d2",
        backgroundColor: "#1976d2",
        color: "white",
        marginTop: "0.5em",
      }}
      onClick={() => {
        removeFromFavoriteRecipe(userId, recipeId);

        navigate("/recipes");
      }}
    >
      Remove favorite
    </Button>
  );
}
