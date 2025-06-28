import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import LoginForm from "../LoginForm/LoginForm";
import { Box } from "@mui/material";

export const ProtectedRoute = ({ children }) => {
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.userLoginThunk.isUserLoggedIn,
  );

  if (!isUserLoggedIn) {
    return <LoginForm />;
  }

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        scrollbarWidth: "none",
      }}
    >
      {children}
    </Box>
  );
};
