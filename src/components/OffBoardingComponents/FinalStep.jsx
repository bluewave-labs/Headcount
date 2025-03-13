import {
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import HRMButton from "../Button/HRMButton";
import { multiStepContext } from "../../context/stepContext";
import thankYouVector from "../../Images/placeholder.svg";
import api from "../../assets/FetchServices";
import { useLocation, useNavigate } from "react-router-dom";
import EmployeeSnackbar from "../PeopleComponents/Snackbar";

const getHomePath = (location) => {
  const fullUrl = window.location.href;
  const relativeUrl = location.pathname;
  if (fullUrl === relativeUrl) {
    return fullUrl;
  }
  return fullUrl.substring(0, fullUrl.indexOf(relativeUrl));
};

function FinalStep() {
  const { state } = useContext(multiStepContext);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    container: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "486px",
      height: "237px",
      bgcolor: "#fff",
      boxShadow:
        "0px 8px 8px -4px #10182808;box-shadow:%200px%2020px%2024px%20-4px%20#10182814",
      borderRadius: "12px",
      p: "32px",
    },
    title: {
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "38px",
      textAlign: "left",
      color: "#344054",
    },
    description: {
      fontSize: "13px",
      fontWeight: "400",
      lineHeight: "28px",
      textAlign: "left",
      marginTop: "8px",
    },
    buttonContainer: {
      textAlign: "right",
      marginTop: "32px",
    },
    buttonCancel: {
      margin: "0 24px",
      width: "124px",
      height: "34px",
    },
    buttonConfirm: {
      width: "124px",
      height: "34px",
    },
    toastContainer: {
      position: "absolute",
      top: "24px",
      right: "8px",
      width: "570px",
      height: "52px",
      bgcolor: "#fff",
      boxShadow:
        "0px 8px 8px -4px #10182808;box-shadow:%200px%2020px%2024px%20-4px%20#10182814",
      borderRadius: "12px",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    toastTitle: {
      fontSize: "13px",
      lineHeight: "20px",
    },
    toastBox: {
      display: "flex",
      justifyContent: "space-between ",
      alignItems: "center",
    },
    toastClose: {
      color: "grey",
      display: "inline-block",
      padding: "0",
      minHeight: "0",
      minWidth: "0",
      margin: "8px 0 0 32px",
    },
  };

  const handleAlert = async () => {
    try {
      setLoading(true);
      const offboardingId = state.id;
      const dashboardUrl = `${getHomePath(location)}/dashboard`;
      await api.offboarding.submit({ offboardingId, dashboardUrl });
      setLoading(false);
      setIsSubmitted(false);
      handleClose();
      setCompleted(true);
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      width={"1003px"}
      margin={"0 auto"}
      textAlign={"center"}
      padding={"100px 0"}
      sx={{ border: "2px solid #ebebeb" }}
    >
      {completed && (
        <EmployeeSnackbar
          isOpen={true}
          message={
            " Thank you for filling in the survey. Your response is sent to the HR administrator."
          }
        />
      )}
      <img
        src={thankYouVector}
        style={{ margin: "20px auto" }}
        alt="thank-you-vector"
      />
      <Typography
        variant="h1"
        fontSize={"16px"}
        fontWeight={600}
        margin={"0 auto 20px auto"}
      >
        All set. Thank you for completing the offboarding!
      </Typography>
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        width={"70%"}
        margin={"20px auto"}
      >
        Note that your responses will only be sent to the HR admin, and not your
        manager.
      </Typography>
      <HRMButton
        mode={"primary"}
        style={{
          padding: "10px",
          width: "218px",
          height: "32px",
          margin: "0 auto 20px auto",
        }}
        onClick={handleOpen}
        enabled={isSubmitted}
      >
        Complete and notify the HR
      </HRMButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.container}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={style.title}
          >
            Are you sure you want to send your responses?
          </Typography>
          <Typography id="modal-modal-description" sx={style.description}>
            When you confirm, all your responses will be sent to the HR
            administrator.
          </Typography>
          <Box sx={style.buttonContainer}>
            <HRMButton
              mode={"secondaryB"}
              style={style.buttonCancel}
              onClick={handleClose}
            >
              Cancel
            </HRMButton>
            <HRMButton
              mode={"primary"}
              style={style.buttonConfirm}
              onClick={handleAlert}
              startIcon={
                loading ? <CircularProgress color="inherit" size={16} /> : ""
              }
            >
              Confirm
            </HRMButton>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default FinalStep;
