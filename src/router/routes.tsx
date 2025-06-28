import App from "../App";
import LoginForm from "../components/LoginForm/LoginForm";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import { CreateRecipePage } from "../components/pages/CreateRecipePage";
import { EditRecipePage } from "../components/pages/EditRecipePage";
import { ForgotPasswordForm } from "../components/ForgotPassword/ForgotPassword";
import { HomePage } from "../components/pages/HomePage";
import { RecipesPage } from "../components/pages/RecipesPage";
import { FavouriteRecipesPage } from "../components/pages/FavouriteRecipesPage";
import { RecipeDetailsPage } from "../components/pages/RecipeDetailsPage";
import { ErrorPage } from "../components/ErrorPage/ErrorPage";

const routes = [
  {
    path: "/",

    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: <SignUpForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPasswordForm />,
      },
      {
        path: "/recipes",
        element: (
          <ProtectedRoute>
            <RecipesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recipe/:id",
        element: (
          <ProtectedRoute>
            <RecipeDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/createRecipe",
        element: (
          <ProtectedRoute>
            <CreateRecipePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/updateRecipe/:recipeId",
        element: (
          <ProtectedRoute>
            <EditRecipePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/favoriteRecipes",
        element: (
          <ProtectedRoute>
            <FavouriteRecipesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/favoriteRecipe/:id",
        element: (
          <ProtectedRoute>
            <RecipeDetailsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default routes;
