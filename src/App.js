import { StateProvider } from "./context/StateContext.js";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./containers/LandingPage.js";
import SetNewPasswordPage from "./components/LoginComponents/SetNewPassword.jsx";
import Dashboard from "./containers/Dashboard.js";
import CompleteSignup from "./components/LoginComponents/CompleteSignupPage.js";
import OffboardingPage from "./components/OffboardingComponents/OffboardingPage.jsx";
import EmployeeOnboarding from "./containers/EmployeeOnboarding.js";
import ErrorPage from "./components/Error/ErrorPage.jsx";

function App() {
     return (
    <StateProvider>
       <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<EmployeeOnboarding />} />
        <Route path="/resetpassword/:id" element={<SetNewPasswordPage />} />
        <Route path="/complete-signup/:token" element={<CompleteSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/off-boarding/:token" element={<OffboardingPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes> 
    </StateProvider>
  );
}

export default App;