import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export function ErrorPage() {
  return (
    <Box
      sx={{
        backgroundColor: "#1976d2",
        minWidth: "400",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "0.5em",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: "2.5rem",
          color: "white",
        }}
      >
        404 Not Found
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: "1.15rem",
          color: "white",
        }}
      >
        Looks like you tried to access a page that doesn't exists!
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: "1.15rem",
          color: "white",
        }}
      >
        Click{" "}
        <Link
          to={"/login"}
          style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
        >
          here{" "}
        </Link>
        to be redirected to login form
      </Typography>
    </Box>
  );
}
