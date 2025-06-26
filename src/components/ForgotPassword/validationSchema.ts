import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .trim()
    .required("Email is required"),
});
