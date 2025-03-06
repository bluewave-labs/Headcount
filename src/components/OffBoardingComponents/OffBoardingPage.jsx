import React, { useContext, useEffect, useState } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import { multiStepContext } from "../../context/stepContext";
import FinalStep from "./FinalStep";
import { Box } from "@mui/system";
import CustomizedSteppers from "../CustomizedSteppers";
import ErrorPage from "../Error/ErrorPage";
import NoContentComponent from "../PeopleComponents/NoContentComponent";
import { useParams } from "react-router-dom";

const api = require("../../assets/FetchServices");

function OffboardingPage() {
  const { state, setState, setDownloadable } = useContext(multiStepContext);

  const { token } = useParams();
  const [status, setStatus] = useState({
    error: false,
    loading: true,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        if (!token) {
          throw "Token is null";
        }
        const data = await api.offboarding.fetchOneByToken(token);
        if (!data) {
          throw "Invalid token";
        }
        setState(data);
        const downloadable = await api.offboardingDocument.fetchAll();
        setDownloadable(downloadable);
        setStatus({ ...status, loading: false });
      } catch (err) {
        console.log(err);
        setStatus({
          error: true,
          loading: false,
        });
      }
    }
    fetchData();
  }, []);

  if (status.loading) {
    return (
      <NoContentComponent>
        <p>Loading. Please wait...</p>
      </NoContentComponent>
    );
  }
  if (status.error) {
    return <ErrorPage />;
  }
  function showstep(step) {
    switch (step) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      case 4:
        return <FinalStep />;
    }
  }
  return (
    <>
      <Box
        width={"1003px"}
        height={"166px"}
        margin={"125px auto 49px auto"}
        sx={{
          border: "2px solid #ebebeb",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CustomizedSteppers
          stepnumber={state.step - 1}
          steps={[
            { label: "Start", description: "" },
            { label: "Sign and Upload", description: "" },
            { label: "Complete questionnaire", description: "" },
            { label: "Finish", description: "" },
          ]}
        />
      </Box>
      {showstep(state.step)}
    </>
  );
}

export default OffboardingPage;
