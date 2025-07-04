import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { userLoginThunk } from "../../thunks/userThunks/userLoginThunk";
import { userRegisterThunk } from "../../thunks/userThunks/userRegisterThunk";
import { validationSchema } from "./validationSchema";

const SignUpForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { error } = useSelector((state: RootState) => state.userRegisterThunk)!;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await dispatch(
          userRegisterThunk({
            email: values.email,
            password: values.password,
            favorites: [],
          }),
        );

        if (!response.payload) {
          resetForm();
          navigate("/signup");
        } else {
          dispatch(
            userLoginThunk({
              email: formik.values.email,
              password: formik.values.password,
              favorites: [],
            }),
          );
          resetForm();
          navigate("/");
        }
      } catch (err) {
        throw err;
      } finally {
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
        backgroundColor: "#F4F9F9",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          borderRadius: 2,
          position: "relative",
        }}
      >
        <Typography variant="h2" align="center" gutterBottom fontSize={"2rem"}>
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            label="Email*"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            label="Password*"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password*"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="body2" sx={{ color: "red" }}>
            {error ? error : ""}
          </Typography>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>

          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUpForm;
