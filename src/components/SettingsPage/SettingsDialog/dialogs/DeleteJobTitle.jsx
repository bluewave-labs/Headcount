import { useSettingsContext } from "../../context";
import { useMemo } from "react";
import { Controller } from "react-hook-form";
import { Autocomplete } from "@mui/material";
import { TextField } from "../styles";

export const DeleteJobTitle = ({ form, selectedItem }) => {
  const context = useSettingsContext();
  const jobTitles = context?.jobTitles;

  const transferJobTitleOptions = useMemo(() => {
    if (!selectedItem) return [];

    return jobTitles
      .filter((jobTitle) => jobTitle.roleId !== selectedItem.roleId)
      .sort((a, b) => a.roleTitle.localeCompare(b.roleTitle));
  }, [selectedItem]);

  return (
    <Controller
      name="jobTitleDestination"
      control={form.control}
      defaultValue={transferJobTitleOptions[0] || {}}
      render={({ field: { onChange, ...props } }) => (
        <Autocomplete
          color="secondary"
          fullWidth
          getOptionLabel={(option) => option.roleTitle}
          onChange={(_, value) => onChange(value)}
          options={transferJobTitleOptions}
          renderInput={(params) => <TextField {...params} />}
          size="small"
          {...props}
        />
      )}
    />
  );
};
