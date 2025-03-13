import { Box } from "@mui/system";
import React, { useContext } from "react";
import HRMButton from "../Button/HRMButton";
import { Typography } from "@mui/material";
import { multiStepContext } from "../../context/stepContext";

function FirstStep() {
  const { setCurrentStep } = useContext(multiStepContext);
 
  return (
    <Box
      width={"1003px"}
      margin={"0 auto"}
      padding={"69px 0"}
      textAlign={"center"}
      sx={{ border: "2px solid #ebebeb" }}
    >
      <Typography
        variant="h1"
        fontSize={"16px"}
        fontWeight={600}
        margin={"20px auto"}
      >
        Offboarding Process
      </Typography>
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        width={"70%"}
        margin={"0 auto 20px auto"}
        textAlign={"left"}
      >
        As part of our offboarding process, we want to ensure that everything
        proceeds smoothly for you. We want to take this opportunity to thank you
        for your dedication and contributions. We wish you all the best in your
        future endeavors and hope our paths cross again.
      </Typography>

      <Box marginTop={"100px"} marginRight={"100px"} textAlign={"right"}>
        <HRMButton
          mode={"secondaryA"}
          style={{
            margin: "0 20px 0 0",
          }}
        >
          Quit and complete later
        </HRMButton>
        <HRMButton
          mode={"primary"}
          style={{
            padding: "5px 40px",
          }}
          onClick={() => setCurrentStep(2)}
        >
          Next
        </HRMButton>
      </Box>
    </Box>
  );
}

export default FirstStep;
