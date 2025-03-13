import React, { useState } from "react";
import "./login.css";
import "./signup.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import StateContext from "../../context/StateContext";
import axios from "axios";
import PageContext from "../../context/PageContext";
const { login } = require("../../assets/utils");
const api = require("../../assets/FetchServices");


function Input({ title, name, value, type, valid, placeholder, handleChange }) {
  return (
    <div className="form-group">
      <div className="check-div">
        {valid && !value && (
          <CheckCircleIcon style={{ color: "green", fontSize: "20px" }} />
        )}
        <label>{`${title}*:`}</label>
      </div>
      <input
        name={name}
        type={type ? type : `text`}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={value}
      />
    </div>
  );
}

function Constraint({ text, passed }) {
  return (
    <div className="password-constraints">
      <CheckCircleIcon
        style={{
          color: passed ? "green" : "#D0D5DD",
          fontSize: "20px",
          marginRight: "5px",
        }}
      />
      {text}
    </div>
  );
}

function SetNewPassword({ user, onSubmit }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const stateContext = React.useContext(StateContext);
  const pageContext = React.useContext(PageContext);
  const [validators, setvalidators] = useState({
    password: false, // password is not empty
    confirmPassword: false, // confirm password matches passwor
    specialChar: false, // contains at least a special character
    length: false, //at least 8 characters
    match: false, // passwords match
  });
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    validateInputs(e);
  };

  const validateInputs = (e) => {
    const inputName = e.target.name;
    if (inputName === "password") {
      checkPassword(e.target.value);
    }

    if (inputName === "confirmPassword") {
      setvalidators((values) => ({
        ...values,
        ["match"]: inputs.password === e.target.value,
        ["confirmPassword"]: inputs.password === e.target.value,
      }));
    }
  };

  const checkPassword = (password) => {
    const results = {
      length: false,
      number: false,
      specialChar: false,
      match: password === inputs.confirmPassword,
      confirmPassword: password === inputs.confirmPassword,
    };
    // Check for the length.
    results.length = password.length >= 8;
    // Check if the password contains at least number.
    results.number = /.*[0-9].*/.test(password);
    // Check if the password contains at least a special character.
    results.specialChar = /[*@!#%&()^~{}]+/.test(password);
    const passed = results.length && results.number && results.specialChar;
    results.password = passed;

    const newValidators = { ...validators, ...results };
    setvalidators(newValidators);
    return passed;
  };

  const disableButton = () => {
    const values = Object.values(validators);
    if (values.length === 0) {
      return true;
    }
    for (let value of values) {
      if (!value) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await api.authentication.resetPassword(inputs, id);
      // If password reset is successful, login the user
      login({
        stateContext: stateContext,
        email: res.user,
        password: inputs.password,
      });
      pageContext.navigateTo("resetPassword");
      navigate("/", { replace: true });
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error);
      }
      console.log(error);
    }
  };
  return (
    <div className="sign-up-body">
      <div className="sign-up-container">
        <div className="logo-container">
          <img src={stateContext.state.logo} alt="logo" />
        </div>
        <h2 style={{ marginBottom: "0px" }}>Set new Password</h2>
        <h3>
          Your new password must be different from previously used passwords.
        </h3>
        {message && <div className="error-alert">{message}</div>}
        <form onSubmit={handleSubmit}>
          <Input
            name={"password"}
            title={`Password`}
            valid={validators.password}
            type={"password"}
            placeholder={"Create your password"}
            handleChange={handleChange}
          />
          <Input
            name={"confirmPassword"}
            title={`Confirm password`}
            valid={validators.confirmPassword}
            type={"password"}
            placeholder={"Confirm password"}
            handleChange={handleChange}
          />

          <Constraint
            text={"Must be at least 8 characters"}
            passed={validators.length}
          />
          <Constraint
            text={"Must contain one number"}
            passed={validators.number}
          />
          <Constraint
            text={"Must contain one special character"}
            passed={validators.specialChar}
          />
          <Constraint text={"Must match"} passed={validators.match} />

          <button disabled={disableButton()} className="create-account-button">
            Reset Password
          </button>
        </form>
        <button
          className="back-to-login-button"
          style={{ marginTop: "20px" }}
          onClick={() => {
            pageContext.navigateTo("login");
            navigate("/", { replace: true });
          }}
        >
          <ArrowBackIcon style={{ fontSize: "18px", marginRight: "5px" }} />
          Back to log in
        </button>
      </div>
    </div>
  );
}

export default SetNewPassword;
