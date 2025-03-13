import { AddEditDepartment } from "./dialogs/AddEditDepartment";
import { AddEditJobTitle } from "./dialogs/AddEditJobTitle";
import { AddEditTimeOffPolicy } from "./dialogs/AddEditTimeOffPolicy";
import { DeleteDepartment } from "./dialogs/DeleteDepartment";
import { DeleteJobTitle } from "./dialogs/DeleteJobTitle";
import { DeleteTimeOffPolicy } from "./dialogs/DeleteTimeOffPolicy";

export const tabNames = {
  departments: "departments",
  jobtitles: "jobtitles",
  timeoffs: "timeoffs",
  permissions: "permissions",
};

export const dialogTitle = {
  add: {
    [tabNames.departments]: "Add a new department",
    [tabNames.jobtitles]: "Add a new job title",
    [tabNames.timeoffs]: "Add policy",
  },
  edit: {
    [tabNames.departments]: "Rename department",
    [tabNames.jobtitles]: "Rename job title",
    [tabNames.timeoffs]: "Edit policy",
  },
  delete: {
    [tabNames.departments]: "Where do you want to transfer affected employees?",
    [tabNames.jobtitles]: "Where do you want to transfer affected employees?",
    [tabNames.timeoffs]: "Reassign all employees to another policy",
  },
};

export const dialogContent = {
  add: {
    [tabNames.departments]: AddEditDepartment,
    [tabNames.jobtitles]: AddEditJobTitle,
    [tabNames.timeoffs]: AddEditTimeOffPolicy,
  },
  edit: {
    [tabNames.departments]: AddEditDepartment,
    [tabNames.jobtitles]: AddEditJobTitle,
    [tabNames.timeoffs]: AddEditTimeOffPolicy,
  },
  delete: {
    [tabNames.departments]: DeleteDepartment,
    [tabNames.jobtitles]: DeleteJobTitle,
    [tabNames.timeoffs]: DeleteTimeOffPolicy,
  },
};
