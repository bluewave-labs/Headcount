import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Stack } from "@mui/system";
import { DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HRMButton from "../../Button/HRMButton";
import { dialogTitle, dialogContent } from "./constants";
import { Dialog, DialogTitle } from "./styles";
import { useDepartmentData } from "./useDepartmentData";
import { useJobTitleData } from "./useJobTitleData";
import { useTimeOffPoliciesData } from "./useTimeOffPoliciesData";
import { tabNames } from "./constants";
export { tabNames } from "./constants";

export default function CustomDialog({
  open,
  onClose,
  action,
  tabName,
  selectedItem,
  setToast,
}) {
  const form = useForm();
  const departmentData = useDepartmentData({
    onClose,
    setError: form.setError,
    selectedItem,
    setToast,
    action,
  });

  const jobTitleData = useJobTitleData({
    onClose,
    setError: form.setError,
    selectedItem,
    setToast,
    action,
  });

  const timeOffPoliciesData = useTimeOffPoliciesData({
    onClose,
    setError: form.setError,
    selectedItem,
    setToast,
    action,
  });

  const Content = useMemo(() => {
    if (!action || !tabName) return null;
    return dialogContent[action][tabName];
  }, [action, tabName]);

  const onSubmit = (data) => {
    if (tabName === tabNames.departments) return departmentData[action](data);
    if (tabName === tabNames.jobtitles) return jobTitleData[action](data);
    if (tabName === tabNames.timeoffs) return timeOffPoliciesData[action](data, selectedItem);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Stack direction="row" justifyContent="space-between">
        <DialogTitle>{dialogTitle?.[action]?.[tabName]}</DialogTitle>
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
        {Content && (
          <Content form={form} selectedItem={selectedItem} action={action} />
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
          <HRMButton mode="primary" onClick={form.handleSubmit(onSubmit)}>
            Save
          </HRMButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
