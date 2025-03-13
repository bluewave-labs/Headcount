import React, { useState } from "react";
import { produce } from "immer";
const api = require("../assets/FetchServices");

export const multiStepContext = React.createContext();

const StepContext = ({ children }) => {
  const [state, setState] = useState({});
  const [downloadable, setDownloadable] = useState([]);

  const setResponse = (index, value) => {
    const data = produce(state, (newState) => {
      newState.offboardingSurveyResponses[index].answer = value;
    });
    setState(data);
  };
  const setCurrentStep = (step) => {
    const data = produce(state, (newState) => {
      newState.step = step;
    });
    setState(data);
  };

  const handleSave = async () => {
    const newState = { ...state, step: state.step + 1 }; // Advance to the next step
    const data = await api.offboarding.update(newState); // Save the current data
    setState(data);
  };
  return (
    <>
      <multiStepContext.Provider
        value={{
          state,
          setState,

          setCurrentStep,
          setResponse,
          handleSave,

          downloadable,
          setDownloadable,
        }}
      >
        {children}
      </multiStepContext.Provider>
    </>
  );
};

export default StepContext;
