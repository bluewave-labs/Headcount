import { useMemo } from "react";
import { useSettingsContext } from "../context";

export const usePermissions = () => {
  const context = useSettingsContext();
  const users = context?.users;
  const employees = context?.employees;

  const mergedUsers = useMemo(() => {
    if (employees?.length === 0 || users?.length === 0) return [];

    return users
      ?.map((user) => {
        const employee = employees?.find((emp) => emp.empId === user.empId);
        return { ...user, ...employee };
      })
      .sort((a, b) => a.firstName.localeCompare(b.firstName));
  }, [users, employees]);

  return {
    data: mergedUsers,
  };
};
