import { FieldArray, FastField, FieldProps, useFormikContext } from "formik";
import {
  TextField,
  Stack,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";

// This component renders the "Ingredients" section of the form
export function IngredientsField() {
  // We use Formik's context to get access to form values
  const { values } = useFormikContext<any>();

  const ingredients: string[] = values.ingredients;

  return (
    // FieldArray helps us handle an array of dynamic fields
    <FieldArray name="ingredients">
      {({ push, remove }) => (
        <>
          {/* Section title */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Ingredients
          </Typography>

          {/* Loop over each ingredient in the array */}
          {ingredients.map((_, index) => (
            // FastField improves performance by preventing unnecessary re-renders
            <FastField key={index} name={`ingredients[${index}]`}>
              {({ field, meta }: FieldProps) => (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  {/* Ingredient input field */}
                  <TextField
                    {...field} // includes name and value
                    label={`Ingredient ${index + 1}`}
                    fullWidth
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />

                  {/* Remove button (disabled if only 1 left) */}
                  <IconButton
                    onClick={() => remove(index)}
                    disabled={ingredients.length === 1}
                    aria-label="Remove ingredient"
                  >
                    <Delete />
                  </IconButton>
                </Stack>
              )}
            </FastField>
          ))}

          {/* Button to add new empty ingredient field */}
          <Button
            onClick={() => push("")}
            variant="outlined"
            startIcon={<Add />}
            sx={{ mt: 1 }}
          >
            Add Ingredient
          </Button>
        </>
      )}
    </FieldArray>
  );
}
