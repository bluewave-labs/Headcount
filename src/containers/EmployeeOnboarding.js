import React from "react";
import ErrorPage from "../components/Error/ErrorPage";
import StateContext from "../context/StateContext";
import OnboardingPage from "../components/OnboardingPage/OnboardingPage.jsx";

function EmployeeOnboarding() {
  const stateContext = React.useContext(StateContext);
  if (!stateContext.state.user) {
    // No active session
    return <ErrorPage />;
  } else if (!stateContext.state.employee) {
    // No employee record. This happens when admin does not have employee record.
    return <ErrorPage />;
  } else if (stateContext.state.employee.completedOnboardingAt) {
    // Employee has completed onboarding process
    return <ErrorPage />;
  } else {
    // Display employee onboarding page
    return <OnboardingPage />
  }
}

export default EmployeeOnboarding;
