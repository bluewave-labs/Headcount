import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CheckIcon from "@mui/icons-material/Check";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import "./CustomizedSteppers.css";
import { fonts, colors } from "../assets/Styles";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#7F56D9",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#7F56D9",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#F9FAFB",
  zIndex: 1,
  color: "#D0D5DD",
  width: 50,
  height: 50,
  display: "flex",
  border: "1px,solid",
  borderColor: "#EAECF0",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "#7F56D9",
    color: "#FFFFFF",
    border: "1px,solid",
    borderColor: "#F9F5FF",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#7F56D9",
    color: "#FFFFFF",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {completed ? <CheckIcon /> : <FiberManualRecordIcon />}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

export default function CustomizedSteppers({ stepnumber, steps }) {
  return (
    <Stepper
      alternativeLabel
      activeStep={stepnumber}
      connector={<ColorlibConnector />}
      sx={{
        marginBottom: "40px"
      }}
    >
      {steps.map((step) => (
        <Step key={step.label}>
          <StepLabel
            StepIconComponent={ColorlibStepIcon}
            sx={{
              "& .MuiStepLabel-label": {
                color: "#344054",
                fontFamily: "Inter",
                fontSize: "13px",
              }, // Change 'red' to your desired color
              "& .MuiStepLabel-label.Mui-active": {
                color: "#6941C6",
                fontFamily: "Inter",
                fontSize: "13px",
              }, // Active step color
              "& .MuiStepLabel-label.Mui-completed": {
                color: "#344054",
                fontFamily: "Inter",
                fontSize: "13px",
              }, // Completed step color
            }}
          >
            <div
              className="font-semibold"
              style={{ fontFamily: fonts.fontFamily, color: colors.darkGrey }}
            >
              {step.label}
            </div>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
