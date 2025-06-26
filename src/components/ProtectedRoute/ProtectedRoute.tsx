import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import LoginForm from "../LoginForm/LoginForm";

export const ProtectedRoute = ({ children }) => {
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.userLoginThunk.isUserLoggedIn,
  );

  if (!isUserLoggedIn) {
    return <LoginForm />;
  }

  return children;
};
