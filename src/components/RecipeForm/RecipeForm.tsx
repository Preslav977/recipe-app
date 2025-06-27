import { useFormik, FormikProvider } from "formik";
import { Button, Typography, Stack } from "@mui/material";
import { AppDispatch, RootState } from "../../store/store";
import { RecipeFormProps } from "./types";
import { getValidationSchema } from "./validationSchema";
import { getInitialFormValues } from "./getInitialFormValues";
import { handleImageChange } from "./handleImageChange";
import { IngredientsField } from "./IngredientsField";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormikTextField } from "./TextField";
import { createRecipeThunk } from "../../thunks/recipeThunks/createRecipeThunk";
import { uploadAndGetImageURL } from "./../../services/imageUpload/uploadAndGetImageURL";
import { v4 as uuidv4 } from "uuid";
import RecipeFormValues from "../../interfaces/RecipeForm/RecipeFormValues";
import { updateRecipeThunk } from "../../thunks/recipeThunks/updateRecipeThunk";
import { useNavigate } from "react-router-dom";

export const RecipeForm = React.memo(function RecipeForm({
  recipeToEdit,
  recipeId,
}: RecipeFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.userLoginThunk.uid);
  const navigate = useNavigate();

  const formik = useFormik<RecipeFormValues>({
    validateOnChange: false, // doesn't run validation on every keystroke
    validateOnBlur: false, // doesn't validate when leaving field
    initialValues: getInitialFormValues(recipeToEdit ?? undefined), // load values if editing
    validationSchema: getValidationSchema(!!recipeToEdit), // yup validation

    // when form is submitted
    onSubmit: async (values) => {
      try {
        let imageUrl = values.imageUrl;

        // upload Image if selected
        if (values.image) {
          const pictureNewName = uuidv4();
          const uploadedUrl = await uploadAndGetImageURL(
            values.image,
            pictureNewName,
          );
          if (!uploadedUrl) throw new Error("Image upload returned empty URL");
          imageUrl = uploadedUrl;
          formik.setFieldValue("imageUrl", imageUrl); // update form state
        }

        // object to send to  redux
        const recipe = {
          title: values.title,
          description: values.description,
          ingredients: values.ingredients,
          instructions: values.instructions,
          cookingTimeInMinutes: Number(values.cookingTimeInMinutes),
          servings: Number(values.servings),
          imageURL: imageUrl,
          createdAt: values.createdAt || new Date().toDateString(),
          authorId: userId || "",
        };

        // if we are editing a recipe
        if (recipeToEdit && recipeId) {
          await dispatch(updateRecipeThunk({ recipeId, recipe })).unwrap();
          // console.log("Edit mode: updating recipe");
        } else {
          // if it's new recipe, dispatch create action
          await dispatch(createRecipeThunk(recipe)).unwrap();
          // console.log("Create mode: creating recipe");
        }
        navigate("/recipes");
      } catch (e) {
        console.error(e);
      }
    },
  });

  // Form UI with FormikProvider and MUI components
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={1} pb={8}>
          <FormikTextField name="title" label="Recipe Title" />

          <FormikTextField
            name="description"
            label="Description"
            multiline
            rows={3}
          />

          <IngredientsField />

          <FormikTextField
            name="instructions"
            label="Instructions"
            multiline
            rows={4}
          />

          <FormikTextField
            name="cookingTimeInMinutes"
            label="Cooking Time (minutes)"
            type="number"
          />

          <FormikTextField name="servings" label="Servings" type="number" />

          <Button variant="contained" component="label">
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleImageChange(e, formik.setFieldValue)}
            />
          </Button>

          {/* Show image error message if there is */}
          {formik.touched.image && formik.errors.image && (
            <Typography color="error" variant="body2">
              {formik.errors.image}
            </Typography>
          )}

          {formik.values.image && (
            <Typography variant="body2">{formik.values.image.name}</Typography>
          )}

          <Button type="submit" variant="contained" color="primary">
            {recipeToEdit ? "Update Recipe" : "Submit Recipe"}
          </Button>
        </Stack>
      </form>
    </FormikProvider>
  );
});
