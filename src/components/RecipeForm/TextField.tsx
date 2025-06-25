import { FastField, FieldProps } from "formik";
import { TextField } from "@mui/material";

// Props that this reusable input component accepts
type Props = {
  name: string; // name of the form field (used by Formik)
  label: string; // label shown above the input
  type?: string; // input type (text, number, etc.)
  multiline?: boolean; // whether the input should support multiple lines
  rows?: number; // number of rows (used when multiline is true)
};

// This component connects MUI's TextField to Formik using FastField
// FastField helps avoid unnecessary re-renders for better performance
export function FormikTextField({
  name,
  label,
  type = "text",
  multiline = false,
  rows,
}: Props) {
  return (
    <FastField name={name}>
      {({ field, meta }: FieldProps) => (
        <TextField
          {...field}
          type={type}
          label={label}
          fullWidth
          multiline={multiline}
          rows={rows}
          error={meta.touched && Boolean(meta.error)} // show red border if error
          helperText={meta.touched && meta.error} // show error message
        />
      )}
    </FastField>
  );
}
