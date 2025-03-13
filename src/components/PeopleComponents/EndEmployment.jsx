import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  styled,
  createTheme,
  ThemeProvider,
  Dialog,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import EndEmployeeDialog from "./EndEmployeeDialog";
import ConfirmationDialog from "./ConfirmationDialog";
const api = require("../../assets/FetchServices");

const StyledAlert = styled(MuiAlert)(() => ({
  border: "solid 1px #D0D5DD",
  borderRadius: "12px",
  backgroundColor: "#FFFFFF", // white background
  color: "#475467", // close icon color

  "& .MuiAlert-message": {
    fontSize: "13px", // adjust font size
    color: "#475467", // gray text color
  },
  "& .MuiAlert-icon": {
    display: "none", // hide the icon
  },
}));

// Create a custom theme to override typography styles
const customTheme = createTheme({
  typography: {
    h2: {
      fontWeight: 600,
      fontFamily: "Inter",
      fontSize: "16px",
      color: "#101828",
    },
    body1: {
      fontWeight: 600,
      fontFamily: "Inter",
      fontSize: "13px",
      color: "#344054",
    },
    body2: {
      fontWeight: 550,
      fontFamily: "Inter",
      fontSize: "14px",
      color: "#101828",
    },
    body3: {
      fontWeight: 550,
      fontFamily: "Inter",
      fontSize: "12px",
      color: "#475467",
    },
    body4: {
      fontWeight: 550,
      fontFamily: "Inter",
      fontSize: "12px",
      color: "#344054",
    },
    body5: {
      fontWeight: 400,
      fontFamily: "Inter",
      fontSize: "13px",
      color: "#344054",
      padding: "9px, 10px, 9px, 10px",
    },
    body6: {
      fontWeight: 400,
      fontFamily: "Inter",
      fontSize: "13px",
      color: "#667085",
      marginLeft: "15px",
      padding: "9px, 10px, 9px, 10px",
    },
  },
});

export default function ActionButtonEmployee({ empId, open, onClose }) {
  const [openEndEmployeeDialog, setOpenEndEmployeeDialog] = useState(open);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [dialogData, setDialogData] = useState({
    Option: "",
    Date: null,
    Notes: "",
    Reason: "",
    empId: "null",
  });

  // Function to handle changes in the Select component

  // Close   "End employment" dialog
  const handleCloseEndEmployeeDialog = () => {
    setOpenEndEmployeeDialog(false);
    onClose(false);
    setDialogData({
      Option: "",
      Date: null,
      Notes: "",
      Reason: "",
      empId: null,
    });
  };

  // Open confirmation dialog
  const handleOpenConfirmationDialog = (data) => {
    setDialogData(data);
    setOpenEndEmployeeDialog(false);
    setOpenConfirmationDialog(true);
  };

  //Close Confirmation dialog and open end employee dialog
  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setOpenEndEmployeeDialog(true);
    onClose(false);
  };

  // Close dialogs and open success popup for 5 seconds.
  const handleConfirm = async () => {
    console.log("data from firstdialog", dialogData);
    //Close dialogs and open success popup for 5 seconds
    setOpenConfirmationDialog(false);
    setOpenEndEmployeeDialog(false);
    setOpenSuccessPopup(true);

    await api.employee.remove(dialogData);

    setTimeout(() => {
      setOpenSuccessPopup(false);
      onClose(false);
      window.location.reload();
    }, 5000); // 5 seconds
  };

  return (
    <ThemeProvider theme={customTheme}>
      <EndEmployeeDialog
        open={openEndEmployeeDialog}
        onClose={handleCloseEndEmployeeDialog}
        openConfirmationDialog={handleOpenConfirmationDialog}
        empId={empId}
      />
      <Dialog
        open={openConfirmationDialog}
        onClose={handleCloseConfirmationDialog}
      >
        <ConfirmationDialog
          closeConfirmationDialog={handleCloseConfirmationDialog}
          onConfirm={handleConfirm}
          data={dialogData}
          empId={empId}
        />
      </Dialog>
      <Snackbar
        open={openSuccessPopup}
        autoHideDuration={5000}
        onClose={() => setOpenSuccessPopup(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <StyledAlert onClose={() => setOpenSuccessPopup(false)}>
          Employee termination successful!
        </StyledAlert>
      </Snackbar>
    </ThemeProvider>
  );
}

ActionButtonEmployee.propTypes = {
  empId: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
};
