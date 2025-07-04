import { useFormik } from "formik";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { validationSchema } from "./validationSchema";
import { requestPasswordReset } from "../../services/auth/passwordReset";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await requestPasswordReset(values.email);
        navigate("/login");
      } catch (err) {
        throw err;
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#F4F9F9",
        p: 2,
      }}
    >
      <Paper
        component="form"
        noValidate
        elevation={3}
        onSubmit={formik.handleSubmit}
        sx={{ maxWidth: 400, width: 1, p: 4, borderRadius: 2 }}
      >
        <Typography variant="h2" align="center" gutterBottom fontSize={"2rem"}>
          Forgot Password
        </Typography>

        <TextField
          margin="normal"
          fullWidth
          label="Email"
          type="email"
          {...formik.getFieldProps("email")}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button sx={{ mt: 2 }} type="submit" fullWidth variant="contained">
          Send Email
        </Button>
      </Paper>
    </Box>
  );
};
