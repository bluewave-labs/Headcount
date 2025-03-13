import { useSettingsContext } from "../context";
import { departmentsApi, transferEmployeesDepartment } from "../api";

const successMessage = (action) => `Department ${action}ed successfully`;

const errorMessage = (action) => `Failed to ${action}`;

export const useDepartmentData = ({
  onClose,
  setError,
  selectedItem,
  setToast,
  action,
}) => {
  const context = useSettingsContext();
  const departments = context?.departments;
  const fetchDepartmentsPeople = context?.fetchDepartmentsPeople;
  const fetchDepartments = context?.fetchDepartments;
  const employees = context?.employees;

  const handleSuccess = (response) => {
    if (typeof response === "string" && response?.includes("already exists")) {
      setError("departmentName", {
        message: response,
      });
    } else {
      fetchDepartmentsPeople();
      fetchDepartments();
      onClose();
      setToast({
        open: true,
        severity: "success",
        message: successMessage(action),
      });
    }
  };

  const handleError = (error) => {
    console.error("Error submitting data:", error);
    onClose();
    setToast({
      open: true,
      severity: "error",
      message: errorMessage(action),
    });
  };

  const addDepartment = (data) => {
    departmentsApi.create(data).then(handleSuccess).catch(handleError);
  };

  const editDepartment = (data) => {
    const departmentById = departments.find(
      (item) => item.id === selectedItem.id
    );

    if (!departmentById) {
      console.error("Department not found!");
      return;
    }

    const formattedData = {
      ...departmentById,
      departmentName: data.departmentName,
    };

    departmentsApi.update(formattedData).then(handleSuccess).catch(handleError);
  };

  const deleteDepartment = () => {
    departmentsApi
      .delete(selectedItem.id)
      .then(handleSuccess)
      .catch(handleError);
  };

  const transferEmployees = (data) => {
    const { departmentDestination } = data;

    const employeeEmpIds = employees
      .filter((employee) => employee.departmentId === selectedItem.id)
      .map((employee) => employee.empId);

    const transferData = {
      employeeEmpIds,
      destinationDepartmentId: departmentDestination.id,
    };

    transferEmployeesDepartment(transferData)
      .then((response) => {
        console.log("Transfer employess successfully:", response.data);
        deleteDepartment();
      })
      .catch((error) => {
        console.error("Transfer employess error:", error);
      });
  };

  return {
    add: addDepartment,
    edit: editDepartment,
    delete: transferEmployees,
  };
};
