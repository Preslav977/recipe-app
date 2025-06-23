import { useFormik } from "formik";
import * as yup from "yup";
import { userRegisterThunk } from "../../thunks/userThunks/userRegisterThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

const SignUpForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Enter a valid email")
        .trim()
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .trim()
        .required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .trim()
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("SignUpForm values:", values);
      dispatch(
        userRegisterThunk({
          email: values.email,
          password: values.password,
          confirm_password: values.confirmPassword,
          favorites: [],
        }),
      );
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Paper
          elevation={3}
          sx={{
            maxWidth: 400,
            margin: "auto",
            padding: 4,
            mt: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>

          <Box>
            <TextField
              name="email"
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              name="password"
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              name="confirmPassword"
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
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
              Already have an account?{" "}
              <Box
                component="a"
                href="/login"
                sx={{ textDecoration: "none", color: "primary.main" }}
              >
                Login
              </Box>
            </Typography>
          </Box>
        </Paper>
      </form>
    </div>
  );
};

export default SignUpForm;
