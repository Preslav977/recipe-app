import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export const ProtectedRoute = (props) => {
  const isLoggedin = useSelector(
    (state: RootState) => state.userLoginThunk.isUserLoggedIn,
  );

  if (!isLoggedin) {
    return <Navigate to="/login" replace={true} />;
  }

  return <Fragment>{props.children}</Fragment>;
};
