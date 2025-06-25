import * as Yup from "yup";

export const getValidationSchema = (isEditMode: boolean) =>
  Yup.object({
    title: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    ingredients: Yup.array()
      .of(Yup.string().required("Ingredient cannot be empty"))
      .min(1, "At least one ingredient is required"),
    instructions: Yup.string().required("Instructions are required"),
    cookingTimeInMinutes: Yup.number()
      .typeError("Must be a number")
      .required("Required")
      .positive()
      .integer(),
    servings: Yup.number()
      .typeError("Must be a number")
      .required("Required")
      .positive()
      .integer(),

    image: Yup.mixed().test(
      "fileType",
      "Only image files are allowed",
      (value) => {
        if (!value) return isEditMode; // allows empty ONLY if editing
        return value instanceof File && value.type.startsWith("image/");
      },
    ),
  });
