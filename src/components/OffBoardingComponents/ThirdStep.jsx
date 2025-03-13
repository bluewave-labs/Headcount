import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import HRMButton from "../Button/HRMButton";
import { multiStepContext } from "../../context/stepContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function QuestionBox({ index, data, setResponse }) {
  return (
    <Box>
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        margin={"80px auto 20px auto"}
        textAlign={"left"}
        width={"70%"}
      >
        {data.question}
      </Typography>

      <TextField
        style={{ textAlign: "left", width: "70%", margin: "0 auto" }}
        InputLabelProps={{ shrink: false }}
        multiline
        rows={3}
        value={data.answer}
        onChange={(e) => {
          setResponse(index, e.target.value);
        }}
      />
    </Box>
  );
}

function ThirdStep() {
  const { setCurrentStep, state, setResponse, handleSave } =
    useContext(multiStepContext);

  const handleNext = async () => {
    await handleSave();
  };

  return (
    <Box
      width={"1003px"}
      margin={"0 auto 40px auto"}
      textAlign={"center"}
      sx={{ border: "2px solid #ebebeb", padding: "63px 0" }}
      component="form"
    >
      <Typography
        variant="h1"
        fontSize={"16px"}
        fontWeight={600}
        margin={"20px auto"}
      >
        Answer questions below as detailed as possible
      </Typography>
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        margin={"0 auto 20px auto"}
      >
        Your answers are going to be used to further improve our processs.
      </Typography>

      {state.offboardingSurveyResponses.map((item, index) => {
        return (
          <QuestionBox
            key={index}
            index={index}
            data={item}
            setResponse={setResponse}
          />
        );
      })}

      <br />

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "50px",
        }}
      >
        <HRMButton
          mode={"secondaryA"}
          startIcon={<ArrowBackIcon />}
          style={{
            padding: "10px",
            width: "132px",
            height: "32px",

            fontSize: "13px",
          }}
          onClick={() => setCurrentStep(state.step - 1)}
        >
          Previous
        </HRMButton>
        <HRMButton
          mode={"primary"}
          style={{
            padding: "10px",
            width: "132px",
            height: "32px",
            fontSize: "13px",
          }}
          onClick={handleNext}
        >
          Save and next
        </HRMButton>
      </div>
    </Box>
  );
}

export default ThirdStep;
