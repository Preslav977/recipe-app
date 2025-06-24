import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface SuccessDialogProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  message,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="success-dialog-title"
      PaperProps={{
        sx: {
          textAlign: "center",
          p: 3,
          minWidth: 320,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <DialogTitle
        id="success-dialog-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          color: "success.main",
        }}
      >
        <CheckCircleIcon color="success" />
        <Typography variant="h6" fontWeight="bold">
          Success
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography color="success.main">{message}</Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={onClose}
          autoFocus
          variant="contained"
          color="success"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
