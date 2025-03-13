import { useMemo } from "react";
import { Grid, Autocomplete, Typography } from "@mui/material";
import { TextField } from "./SettingsDialog/styles";
import { useSettingsContext } from "./context";

export default function ChooseManager() {
  const context = useSettingsContext();
  const employees = context?.employees;
  const updatedPermissions = context?.updatedPermissions;
  const currentEmployee = updatedPermissions?.[0]?.employee;

  const availableEmployees = useMemo(
    () =>
      employees?.filter(
        (emp) =>
          Number(emp?.empId) !== Number(updatedPermissions?.[0]?.employee?.empId)
      ) || [],
    [employees, updatedPermissions]
  );

  const addNewManager = (newManager) => {
    const managerToEmployee = {
      employee: updatedPermissions?.[0]?.employee,
      manager: newManager,
    };

    context.setManagerToEmployee(managerToEmployee);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Typography
          sx={{
            marginBottom: "8px",
            color: "#101828",
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          Select manager of {currentEmployee.firstName}{" "}
          {currentEmployee.lastName}
        </Typography>
        <Autocomplete
          fullWidth
          color="secondary"
          size="small"
          options={availableEmployees?.sort((a, b) =>
            a.firstName.localeCompare(b.firstName)
          )}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          renderInput={(params) => (
            <TextField {...params} placeholder="Select manager" />
          )}
          sx={{
            width: "100%",
            marginBottom: "16px",
          }}
          onChange={(event, value) => addNewManager(value)}
        />
      </Grid>
    </Grid>
  );
}
