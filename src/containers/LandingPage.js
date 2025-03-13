import React from 'react'
import Placeholder from "../components/PeopleComponents/Placeholder.js";
import { useContext } from "react";
import Onboarding from "../containers/Onboarding.js";
import LoginPage from "../components/LoginComponents/LoginPage.jsx";
import CheckYourEmailPage from "../components/LoginComponents/CheckYourEmailPage.jsx";
import ForgotPasswordPage from "../components/LoginComponents/ForgotPasswordPage.jsx";
import PasswordResetPage from "../components/LoginComponents/PassswordResetPage.jsx";
import SetNewPasword from "../components/LoginComponents/SetNewPassword.jsx";
import ServerErrorPage from "../components/Error/ServerErrorPage.js";
import SingupPage from "../components/LoginComponents/SingupPage.js";
import PageContext from "../context/PageContext.js";

function LandingPage() {
    const pageContext = useContext(PageContext);

  return (
    <>
      {pageContext.page.placeholder && <Placeholder content={"Loading..."} />} 
      {pageContext.page.onboarding && <Onboarding />}
      {pageContext.page.login && <LoginPage />}
      {pageContext.page.checkMail && <CheckYourEmailPage />}
      {pageContext.page.forgotPassword && <ForgotPasswordPage />}
      {pageContext.page.resetPassword && <PasswordResetPage />}
      {pageContext.page.newPassword && <SetNewPasword />}
      {pageContext.page.signup && <SingupPage />}
      {pageContext.page.networkError && <ServerErrorPage />}
     </>
  )
}

export default LandingPage