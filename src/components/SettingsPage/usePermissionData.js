import { useSettingsContext } from "./context";
import { usersApi } from "./api";

const successMessage = () => `Permission updated successfully`;

const errorMessage = () => `Failed to update`;

export const usePermissionData = ({
  onClose,
  setError,
  selectedItem,
  setToast,
  action,
}) => {
  const context = useSettingsContext();
  const users = context?.users;
  const fetchUsers = context?.fetchUsers;
  const fetchEmployees = context?.fetchEmployees;
  const employees = context?.employees;

  const handleSuccess = (response) => {
    fetchUsers();
    fetchEmployees();
    onClose();
    setToast({
      open: true,
      severity: "success",
      message: successMessage(action),
    });
  };

  const handleError = (error) => {
    onClose();
    setToast({
      open: true,
      severity: "error",
      message: errorMessage(action),
    });
  };

  const updatePermission = (data) => {
    usersApi.update(data).then(handleSuccess).catch(handleError);
  };

  return {
    update: updatePermission,
  };
};
