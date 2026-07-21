import { Button, Stack } from "@mui/material";
import { useEffect } from "react";
import {
  Controller,
  type SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import {
  EMPTY_VALUES,
  NOTE_CATEGORIES,
  type NoteFormProps,
  type NoteFormValues,
} from "../../../types/globals";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

export default function NoteForm({
  defaultValues = EMPTY_VALUES,
  submitLabel = "Create note",
  onSubmit,
  onCancel,
  isSubmitting: isSubmittingProp = false,
}: NoteFormProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<NoteFormValues>({
    defaultValues,
  });

  const isSubmitting = isSubmittingProp || isFormSubmitting;

  const title = useWatch({ control, name: "title" }) || "";
  const description = useWatch({ control, name: "description" }) || "";

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleValidSubmit: SubmitHandler<NoteFormValues> = async (values) => {
    await onSubmit(values);
  };

  return (
    <Stack
      component="form"
      noValidate
      spacing={2}
      onSubmit={handleSubmit(handleValidSubmit)}
      sx={{ mt: 1 }}
    >
      <FormInput
        label="Title"
        autoFocus
        required
        maxLength={100}
        errorMessage={errors.title?.message}
        helperText={errors.title?.message ?? `${title.length} / 100`}
        {...register("title", {
          required: "Title is required",
          maxLength: {
            value: 100,
            message: "Maximum length is 100 characters",
          },
        })}
      />

      <FormInput
        label="Description"
        required
        multiline
        minRows={4}
        maxLength={500}
        errorMessage={errors.description?.message}
        helperText={
          errors.description?.message ?? `${description.length} / 500`
        }
        {...register("description", {
          required: "Description is required",
          maxLength: {
            value: 500,
            message: "Maximum length is 500 characters",
          },
        })}
      />

      <Controller
        name="category"
        control={control}
        rules={{
          required: "Category is required",
        }}
        render={({ field, fieldState }) => (
          <FormSelect
            label="Category"
            placeholder="Select category"
            options={NOTE_CATEGORIES}
            field={field}
            fieldState={fieldState}
          />
        )}
      />

      <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
        {onCancel && (
          <Button
            type="button"
            color="inherit"
            disabled={isSubmitting}
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ backgroundColor: "text.primary" }}
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </Stack>
    </Stack>
  );
}
