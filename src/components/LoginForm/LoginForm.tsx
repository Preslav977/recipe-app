import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { userLoginThunk } from "../../thunks/userLoginThunk";
import {
  Paper, Typography, TextField, Button,
  Box, IconButton, InputAdornment,
  Checkbox, FormControlLabel, CircularProgress
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorDialog from "../Dialogs/ErrorDialog";
import SuccessDialog from "../Dialogs/SuccessDialog";
import FullScreenLoader from "../Loader/FullScreenLoader";


const validationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(8, "Password should be of minimum 8 characters length").required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await dispatch(userLoginThunk({ email: values.email, password: values.password, favorites: [] })).unwrap();

        setSuccessMessage("Login successful!");
        setSuccessOpen(true);

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", values.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
      } catch (error: any) {
        setErrorMessage("Login failed. Please check your credentials.");
        setErrorOpen(true);
      } finally {
        setIsLoading(false);
      }

import { userLoginThunk } from "../../thunks/userThunks/userLoginThunk";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { validationSchema } from "./validationSchema";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        userLoginThunk({
          email: values.email,
          password: values.password,
          favorites: [],
        }),
      );
      Navigate("/");
    },
  });

  return (
    <>
      <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#F4F9F9", p: 2 }}>
        <Paper elevation={3} sx={{ maxWidth: 400, width: "100%", p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>Login</Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email*"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
    <div>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Paper
          elevation={3}
          sx={{
            maxWidth: 400,
            margin: "auto",
            padding: 4,
            mt: 8,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>

          <Box>
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              margin="normal"
              variant="outlined"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
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
                    <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
              label="Remember me"
            />
            <Button type="submit" variant="contained" disabled={isLoading} color="primary">
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
            <Typography variant="body2" align="center">
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </Box>
        </Paper>
      </Box>

      <ErrorDialog open={errorOpen} message={errorMessage} onClose={() => setErrorOpen(false)} />
      <SuccessDialog
        open={successOpen}
        message={successMessage}
        onClose={() => {
          setSuccessOpen(false);
          navigate("/");
        }}
      />
    </>
              fullWidth
              name="password"
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don’t have an account?{" "}
              <Box
                component={Link}
                to="/register"
                sx={{ textDecoration: "none", color: "primary.main" }}
              >
                Sign Up
              </Box>
            </Typography>
          </Box>
        </Paper>
      </form>
    </div>
  );
};

export default LoginForm;