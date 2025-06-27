import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addRecipeUserFavoriteRecipeListThunk } from "../../thunks/userFavoriteRecipeThunk/addRecipeUserFavoriteRecipeListThunk";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function AddFavoriteRecipeButton({
  userId,
  recipeId,
}: {
  userId: string;
  recipeId: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  function addToFavoriteRecipe(userId: string, recipeId: string) {
    dispatch(
      addRecipeUserFavoriteRecipeListThunk({
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
        addToFavoriteRecipe(userId, recipeId);
        navigate("/recipes");
      }}
    >
      Favorite
    </Button>
  );
}
