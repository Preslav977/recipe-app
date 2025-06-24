import { FormikHelpers } from "formik";
import RecipeFormValues from "../../interfaces/RecipeForm/RecipeFormValues";

export function handleImageChange(
  event: React.ChangeEvent<HTMLInputElement>,
  setFieldValue: FormikHelpers<RecipeFormValues>["setFieldValue"],
) {
  const file = event.currentTarget.files?.[0];
  if (file) {
    setFieldValue("image", file);
  }
}
