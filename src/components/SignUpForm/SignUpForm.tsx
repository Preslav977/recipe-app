import { useFormik } from "formik";
import * as yup from "yup";
import { userRegisterThunk } from "../../thunks/userThunks/userRegisterThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

const validationSchema = yup.object({
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
});

const SignUpForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
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
      <h1>Sign Up</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
