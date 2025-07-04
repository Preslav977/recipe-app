import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RecipeFromFireStore } from "../../interfaces/Recipe/Recipe";

export interface RecipeCardProps {
  recipe: RecipeFromFireStore;
  path: string;
}

export const RecipeCard = ({ recipe, path }: RecipeCardProps) => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        m: 1,
        maxWidth: 255,
      }}
      maxWidth={false}
    >
      <Card sx={{ maxWidth: 205 }}>
        <CardActionArea onClick={() => navigate(`/${path}/${recipe.id}`)}>
          <CardMedia
            component="img"
            height="150"
            sx={{
              objectFit: "cover",
            }}
            image={recipe.imageURL}
            alt={recipe.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 600 }}>
              {recipe.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {recipe.description.split("").slice(0, 20).join("")} ...
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};
