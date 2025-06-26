import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Box,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useNavigate } from "react-router-dom";
import { RecipeFromFireStore } from "../../interfaces/Recipe/Recipe";

interface RecipeDetailsProps {
  recipe: RecipeFromFireStore;
}

export const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {recipe.title}
      </Typography>

      <Card sx={{ mt: 2 }}>
        <CardMedia
          component="img"
          height="250"
          image={recipe.imageURL}
          alt={recipe.title}
        />

        <CardContent>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {recipe.description}
          </Typography>

          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "flex",

              gap: 1,
              flexDirection: "column",
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",

                gap: 1,
                flexDirection: "row",
              }}
            >
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2">
                {recipe.cookingTimeInMinutes} minutes
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",

                gap: 1,
                flexDirection: "row",
              }}
            >
              <RestaurantMenuIcon fontSize="small" />
              <Typography variant="body2">
                {recipe.servings} {recipe.servings > 1 ? "servings" : "serving"}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
            Necessary products
          </Typography>
          <List
            dense
            sx={{
              listStyleType: "disc",
              pl: 3,
              py: 0,
            }}
          >
            {recipe.ingredients.map((ing, i) => (
              <ListItem key={i} sx={{ display: "list-item", pl: 0, p: 0.1 }}>
                <ListItemText primary={ing} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 1 }} />

          <Typography variant="h6" gutterBottom>
            Instructions
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
            {recipe.instructions}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};
