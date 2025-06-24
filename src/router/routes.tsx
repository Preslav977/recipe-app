import App from "../App";
import LoginForm from "../components/LoginForm/LoginForm";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import { RecipeForm } from "../components/RecipeForm/RecipeForm";
import { ProtectedRoute } from "./ProtectedRoute";
import { CreateRecipePage } from "../components/Pages/CreateRecipePage";
import { EditRecipePage } from "../components/Pages/EditRecipePage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <p>404 Not Found</p>,
    children: [
      {
        path: "/register",
        element: <SignUpForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/create",
        element: (
          <ProtectedRoute>
            <CreateRecipePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit/:recipeId",
        element: (
          <ProtectedRoute>
            <EditRecipePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default routes;
