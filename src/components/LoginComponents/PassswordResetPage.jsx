import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import StateContext from "../../context/StateContext";
import PageContext from "../../context/PageContext";
import "./login.css";
const { logout } = require("../../assets/utils");

function PasswordResetPage() {
  const stateContext = React.useContext(StateContext);
  const pageContext = React.useContext(PageContext);
  const navigate = useNavigate(); // used to return to landing page

  const handleContinue = () => {
    navigate("/dashboard", { replace: true });
  };

  const handleBackToLogin = async () => {
    try {
      await logout({ pageContext, navigate });
    } catch (error) {
      console.log(error);
    } finally {
      stateContext.clearState();
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="logo-container">
          <img src={stateContext.state.logo} alt="logo" />
        </div>
        <h2 style={{ marginBottom: "0px" }}>Password reset</h2>
        <h3>
          Your password has been successfully reset. Click below to log in
          manually.
        </h3>
        <button
          className="sign-in-button"
          style={{ marginRTop: "20px" }}
          onClick={handleContinue}
        >
          Continue
        </button>
        <button className="back-to-login-button" onClick={handleBackToLogin}>
          <ArrowBackIcon style={{ fontSize: "18px", marginRight: "5px" }} />
          Back to log in
        </button>
      </div>
    </div>
  );
}

export default PasswordResetPage;
