import React, { useState } from "react";
import { Backdrop, CircularProgress, Button, Box} from "@mui/material";

const FullScreenLoader = () => {
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

const LoaderTest = () => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); 
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Button variant="contained" onClick={showLoader}>
         Loader
      </Button>
      {loading && <FullScreenLoader />}
    </div>
  );
};


export function FullScreenLoaderSimple() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}

export default LoaderTest;
