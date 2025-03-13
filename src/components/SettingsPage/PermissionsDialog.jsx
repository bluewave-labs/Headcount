import { Stack, Typography, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HRMButton from "../Button/HRMButton";
import { Dialog, DialogTitle } from "./SettingsDialog/styles";
import { useSettingsContext } from "./context";
import ChooseManager from "./ChooseManager";
import ChooseEmployees from "./ChooseEmployees";
import {
  changeManagerEmployees,
  removeManagement,
  changePermission,
} from "./api/employees";

const PERMISSION_IDS = {
  Administrator: 1,
  Manager: 2,
  Employee: 3,
};

export default function PermissionsDialog({ open, onClose, setToast }) {
  const context = useSettingsContext();
  if (!context) return;
  const updatedPermissions = context?.updatedPermissions;
  const managerToEmployee = context?.managerToEmployee;
  const employee = updatedPermissions?.[0]?.employee;
  const addEmployeesToManager = context?.addEmployeesToManager;
  const setAddEmployeesToManager = context?.setAddEmployeesToManager;
  const fetchUsers = context?.fetchUsers;

  const handleAddEmployeesToManager = async (oldManagerNewEmployeePayload) => {
    const employeesPayload = {
      managerId: updatedPermissions?.[0]?.employee?.empId,
      empIds: addEmployeesToManager?.map((emp) => emp.empId) || [],
    };
    await changeManagerEmployees([
      oldManagerNewEmployeePayload
        ? oldManagerNewEmployeePayload
        : employeesPayload,
    ]);
  };

  const handleRemoveManager = async () => {
    const payload = {
      managerId: managerToEmployee?.employee?.empId,
    };
    await removeManagement(payload);

    const oldManagerNewEmployeePayload = {
      managerId: managerToEmployee?.manager?.empId,
      empIds: [managerToEmployee?.employee?.empId],
    };

    setAddEmployeesToManager([]);
    handleAddEmployeesToManager(oldManagerNewEmployeePayload);
  };

  const handlePermissionChange = async () => {
    const payload = {
      id: updatedPermissions?.[0]?.employee?.empId,
      permissionId: PERMISSION_IDS[updatedPermissions?.[0]?.newPermission],
    };
    await changePermission(payload);
  };

  const onSubmit = async () => {
    try {
      if (addEmployeesToManager?.length > 0) {
        await handleAddEmployeesToManager();
      }

      if (managerToEmployee?.employee && managerToEmployee?.manager) {
        await handleRemoveManager();
      }

      await handlePermissionChange();
      fetchUsers();

      setToast({
        open: true,
        severity: "success",
        message: "Permission updated successfully",
      });
      onClose();
    } catch (error) {
      console.error("Error updating permissions:", error);
      setToast({
        open: true,
        severity: "error",
        message: "Failed to update permission",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Stack direction="row" justifyContent="space-between">
        <DialogTitle>
          {`Do you approve the change: ${employee?.permission?.type} → ${updatedPermissions?.[0]?.newPermission}?`}
        </DialogTitle>
        <CloseIcon
          onClick={onClose}
          sx={{
            width: "20px",
            height: "20px",
            backgroundColor: "#FFFFFFF",
            color: "#98A2B3",
            textAlign: "right",
            padding: "16px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
      </Stack>
      <DialogContent>
        {updatedPermissions?.[0]?.newPermission === "Manager" && (
          <ChooseEmployees sx={{ overflowY: "auto", height: "100px" }} />
        )}
        {updatedPermissions?.[0]?.newPermission === "Employee" && (
          <ChooseManager />
        )}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
          sx={{ marginTop: "50px" }}
        >
          <HRMButton mode="secondaryB" onClick={onClose} color="primary">
            Cancel
          </HRMButton>
          <HRMButton mode="primary" onClick={onSubmit}>
            Confirm
          </HRMButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
