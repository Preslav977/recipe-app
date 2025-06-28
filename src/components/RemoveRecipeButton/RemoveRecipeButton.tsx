import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { deleteRecipeThunk } from "../../thunks/recipeThunks/deleteRecipeThunk";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function RemoveRecipeButton({ recipeId }: { recipeId: string }) {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  function deleteRecipe(recipeId: string) {
    dispatch(deleteRecipeThunk(recipeId));
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
        deleteRecipe(recipeId);
        navigate("/recipes");
      }}
    >
      Delete recipe
    </Button>
  );
}
