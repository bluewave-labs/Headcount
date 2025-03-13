import { Grid, Autocomplete, Chip, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "./SettingsDialog/styles";
import { useSettingsContext } from "./context";
import { useEffect, useMemo } from "react";

export default function ChooseEmployees() {
  const context = useSettingsContext();
  const employees = context?.employees;
  const addEmployeesToManager = context?.addEmployeesToManager;
  const setAddEmployeesToManager = context?.setAddEmployeesToManager;
  const updatedPermissions = context?.updatedPermissions;
  const currentEmployee = updatedPermissions?.[0]?.employee;

  const availableEmployees = useMemo(
    () =>
      employees?.filter(
        (emp) => emp.empId !== updatedPermissions?.[0]?.employee?.empId
      ) || [],
    [employees, updatedPermissions]
  );

  useEffect(() => {
    context.setAddEmployeesToManager([]);
  }, [updatedPermissions]);

  const addEmployee = (newEmployee) => {
    if (
      !newEmployee ||
      addEmployeesToManager.some((emp) => emp.empId === newEmployee.empId)
    ) {
      return;
    }

    setAddEmployeesToManager((prev) => {
      if (!Array.isArray(prev)) {
        return [newEmployee];
      }
      return [...prev, newEmployee];
    });
  };

  const deleteEmployee = (employeeToDelete) => {
    setAddEmployeesToManager((prev) =>
      prev.filter((emp) => emp.empId !== employeeToDelete.empId)
    );
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
          Select employees under {currentEmployee.firstName}{" "}
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
            <TextField {...params} placeholder="Select employees" />
          )}
          sx={{
            width: "100%",
            marginBottom: "16px",
          }}
          onChange={(event, value) => addEmployee(value)}
        />

        <Grid
          container
          spacing={2}
          sx={{ maxHeight: "100px", overflow: "auto" }}
        >
          {addEmployeesToManager.map((employee) => (
            <Grid item xs={6} spacing={1} key={employee.id}>
              <Chip
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "160px",
                  color: "#344054",
                  borderRadius: "5px",
                  borderColor: "#D0D5DD",
                  fontSize: "13px",
                  padding: "4px",
                  height: "auto",
                  "& span": {
                    paddingLeft: "4px",
                  },
                }}
                label={`${employee.firstName} ${employee.lastName}`}
                variant="outlined"
                onDelete={() => deleteEmployee(employee)}
                deleteIcon={
                  <CloseIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                      marginRight: "4px",
                    }}
                  />
                }
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
