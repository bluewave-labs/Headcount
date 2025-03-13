import { useState, useEffect } from "react";
import { TextLabel, TextField } from "../styles";
import Stack from "@mui/system/Stack";
import { styled, Typography } from "@mui/material";
import HRMCheckbox from "../../../Checkbox/Checkbox";

const fieldName = "category";
const fieldBalance = "hours";

const validationRules = {
  required: "Policy name is required.",
  minLength: {
    value: 2,
    message: "Policy name must be at least 2 characters.",
  },
};

export const Checkbox = styled(HRMCheckbox)({
  fontSize: "16px",
  fontWeight: "600",
  border: "2px solid #344054",
});

export const AddEditTimeOffPolicy = ({ form, action, selectedItem }) => {
  const [isUnlimitedBalance, setIsUnlimitedBalance] = useState(
    selectedItem?.hours === null
  );

  const {
    register,
    setValue,
    formState: { errors },
    clearErrors,
  } = form;

  useEffect(() => {
    if (action === "add") {
      form.reset({
        category: "",
        hours: "",
      });
    } else {
      form.reset({
        category: selectedItem?.category ?? "",
        hours: selectedItem?.hours,
      });
      setIsUnlimitedBalance(selectedItem?.hours === null);
    }
  }, [action, selectedItem]);

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
      <TextLabel sx={{ marginTop: "24px" }}>Default balance</TextLabel>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ marginTop: "12px" }}
      >
        <TextField
          id="balanceInput"
          sx={{ width: "100px" }}
          disabled={isUnlimitedBalance}
          fullWidth
          {...register(fieldBalance, {
            validate: (value) => {
              if (isUnlimitedBalance) return true;

              if (!value && value !== null) {
                return "Balance is required.";
              } else if (isNaN(value)) {
                return "Balance must be a number.";
              }

              return true;
            },
          })}
          value={isUnlimitedBalance ? "" : register(fieldBalance).value}
          placeholder={isUnlimitedBalance ? "Unlimited" : ""}
          error={!!errors[fieldBalance]}
          FormHelperTextProps={{
            className: errors[fieldBalance] ? "error" : "",
          }}
        />
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "24px",
          }}
        >
          hours
        </Typography>
      </Stack>
      {!!errors[fieldBalance] && (
        <Typography
          sx={{
            color: "#D92D20",
            fontSize: "11px",
            fontWeight: 400,
            fontFamily: "Inter",
            marginTop: "10px",
          }}
        >
          {errors[fieldBalance]?.message}
        </Typography>
      )}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ marginTop: "12px" }}
      >
        <Checkbox
          id="isUnlimitedBalance"
          checked={isUnlimitedBalance}
          onChange={(e) => {
            const isChecked = e.target.checked;
            setIsUnlimitedBalance(isChecked);
            setValue(fieldBalance, isChecked ? null : "");
            if (isChecked) clearErrors(fieldBalance);
          }}
          size="large"
          sx={{ marginRight: "100px", borderColor: "red" }}
        />
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "24px",
          }}
        >
          Make unlimited
        </Typography>
      </Stack>
    </>
  );
};
