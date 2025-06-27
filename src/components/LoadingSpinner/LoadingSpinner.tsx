import { Backdrop, CircularProgress } from "@mui/material";

export const LoadingSpinner = () => {
  return (
    <Backdrop
      open={true}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <CircularProgress color="inherit" size={100} />
    </Backdrop>
  );
};
