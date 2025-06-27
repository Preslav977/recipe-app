import { Typography, Container } from "@mui/material";
import { RecipeForm } from "../RecipeForm/RecipeForm";

export const CreateRecipePage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography
        variant="h2"
        component="h2"
        fontSize={"2rem"}
        gutterBottom
        align="center"
      >
        Create Recipe
      </Typography>
      <RecipeForm />
    </Container>
  );
};
