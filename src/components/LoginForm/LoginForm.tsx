import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
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
