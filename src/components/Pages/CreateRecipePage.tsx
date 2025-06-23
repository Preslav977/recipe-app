import { Typography, Container } from "@mui/material";
import { RecipeForm } from "../RecipeForm/RecipeForm";

export const CreateRecipePage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h4" component="h4" gutterBottom align="center">
        Edit Recipe
      </Typography>
      <RecipeForm />
    </Container>
  );
};
