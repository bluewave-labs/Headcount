import { useSettingsContext } from "../../context";
import { Controller } from "react-hook-form";
import { useMemo } from "react";
import { Autocomplete } from "@mui/material";
import { TextField } from "../styles";

export const DeleteTimeOffPolicy = ({ form, selectedItem }) => {
  const context = useSettingsContext();
  const timeOffPolicies = context?.timeOffPolicies;

  const transferTimeOffPoliciesOptions = useMemo(() => {
    if (!selectedItem) return [];
    return timeOffPolicies
      .filter((policy) => policy.id !== selectedItem.id)
      .sort((a, b) => a.category.localeCompare(b.category));
  }, [selectedItem]);

  return (
    <Controller
      name="newTimeOffPolicy"
      control={form.control}
      defaultValue={transferTimeOffPoliciesOptions[0] || {}}
      render={({ field: { onChange, ...props } }) => (
        <Autocomplete
          color="secondary"
          fullWidth
          getOptionLabel={(option) => option.category}
          onChange={(_, value) => onChange(value)}
          options={transferTimeOffPoliciesOptions}
          renderInput={(params) => <TextField {...params} />}
          size="small"
          {...props}
        />
      )}
    />
  );
};
