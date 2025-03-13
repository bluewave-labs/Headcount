import {  useEffect } from "react";
import { TextLabel, TextField } from "../styles";

const fieldName = "departmentName";

const validationRules = {
  required: "Department name is required.",
  minLength: {
    value: 2,
    message: "Department name must be at least 2 characters.",
  },
};

export const AddEditDepartment = ({ form, action, selectedItem }) => {
  const {
    register,
    formState: { errors },
  } = form;

  useEffect(() => {
    form.reset({
      departmentName: selectedItem?.departmentName ?? "",
    });
  }, [selectedItem]);

  return (
    <>
      <TextLabel>{action === "add" ? "Name" : "New name"}</TextLabel>
      <TextField
        size="small"
        fullWidth
        color="secondary"
        {...register(fieldName, validationRules)}
        error={!!errors[fieldName]}
        helperText={errors[fieldName]?.message || ""}
        FormHelperTextProps={{
          className: errors[fieldName] ? "error" : "",
        }}
      />
    </>
  );
};
