import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { userLoginThunk } from "../../thunks/userThunks/userLoginThunk";
import { validationSchema } from "./validationSchema";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { error } = useSelector((state: RootState) => state.userLoginThunk)!;

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      try {
        dispatch(
          userLoginThunk({
            email: values.email,
            password: values.password,
            favorites: [],
          }),
        );
        navigate("/");
      } catch (e) {
        throw e;
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
          Login
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

        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          {...formik.getFieldProps("password")}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Typography variant="body2" sx={{ color: "red" }}>
          {error ? error : ""}
        </Typography>
        <Button sx={{ mt: 2 }} type="submit" fullWidth variant="contained">
          Submit
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Sign Up
          </Link>
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Forgot your password?{" "}
          <Link to="/forgotPassword" style={{ textDecoration: "none" }}>
            Forgot Password
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginForm;
