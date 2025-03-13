import { useSettingsContext } from "../context";

const departmentColumns = [
  { header: "Name", contentKey: "departmentName" },
  { header: "People", contentKey: "count" },
];

export const useDepartmentPeople = () => {
  const context = useSettingsContext();

  return {
    data: context?.departmentsPeople,
    columns: departmentColumns,
  };
};
