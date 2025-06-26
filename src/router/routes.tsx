import App from "../App";
import LoginForm from "../components/LoginForm/LoginForm";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import { CreateRecipePage } from "../components/Pages/CreateRecipePage";
import { EditRecipePage } from "../components/Pages/EditRecipePage";
import { ForgotPasswordForm } from "../components/ForgotPassword/ForgotPassword";
import { HomePage } from "../components/Pages/HomePage";
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
      { path: "/recipes", element: <ProtectedRoute>''</ProtectedRoute> },
      { path: "/recipe/:id", element: <ProtectedRoute>''</ProtectedRoute> },
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
        path: "/deleteRecipe/:recipeId",
        element: <ProtectedRoute>''</ProtectedRoute>,
      },
      {
        path: "/favoriteRecipes",
        element: <ProtectedRoute>''</ProtectedRoute>,
      },
      {
        path: "/favoriteRecipe/:id",
        element: <ProtectedRoute>''</ProtectedRoute>,
      },
    ],
  },
];

export default routes;
