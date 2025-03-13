import Box from "@mui/system/Box";
import { useScrollTrigger } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HRMButton from "../Button/HRMButton";
import UserDropdown from "./UserDropdown";
import StateContext from "../../context/StateContext";
import { useContext } from "react";

/**
 * Header component for most pages. Contains the company logo and the current user's information.
 *
 * Props:
 * - window: Used to handle changes to the header when scrolling
 *
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function Header({ window, style }) {
  const navigate = useNavigate();

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  const stateContext = useContext(StateContext);

  const showOnboardingButton =
    stateContext.state.employee &&
    !stateContext.state.employee.completedOnboardingAt;
  return (
    <Box
      className={trigger ? "scrolled" : ""}
      sx={{
        ...{
          boxSizing: "border-box",
          width: "100%",
          height: "87px",
          padding: "20px",
          paddingRight: "40px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "fixed",
          "&.scrolled": {
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #EBEBEB",
            boxShadow: "0 10px 6px #10182808",
            zIndex: 1,
          },
        },
        ...style,
      }}
    >
      {showOnboardingButton && (
        <HRMButton
          mode="primary"
          onClick={() => navigate("/onboarding", { replace: true })}
          style={{ marginRight: "40px" }}
        >
          Complete onboarding
        </HRMButton>
      )}
      <UserDropdown />
    </Box>
  );
}

//Control panel settings for storybook
Header.propTypes = {};

//Default values for this component
Header.defaultProps = {};
