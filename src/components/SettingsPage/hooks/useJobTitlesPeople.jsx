import { useSettingsContext } from "../context";

const jobTitlesColumns = [
  { header: "Name", contentKey: "roleTitle" },
  { header: "People", contentKey: "count" },
];

export const useJobTitlesPeople = () => {
  const context = useSettingsContext();

  return {
    data: context?.jobTitlesPeople,
    columns: jobTitlesColumns,
  };
};
