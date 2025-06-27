import { Typography, Container } from "@mui/material";
import { RecipeForm } from "../RecipeForm/RecipeForm";

export const CreateRecipePage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 2, minHeight: "80vh" }}>
      <Typography variant="h2" component="h2" gutterBottom align="center">
        Create Recipe
      </Typography>
      <RecipeForm />
    </Container>
  );
};
