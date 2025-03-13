import React, { useState } from "react";
import "./login.css";
import "./signup.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StateContext from "../../context/StateContext";
import { useNavigate } from "react-router-dom";
const validator = require("validator");
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

function SingupPage({ user, token, onSubmit }) {
  const stateContext = React.useContext(StateContext);
  const navigate = useNavigate();

  const [validators, setvalidators] = useState({
    firstName: user ? true : false, // firstName is not empty
    lastName: user ? true : false, // lastName is not empty
    email: user ? true : false, // email is valid
    password: false, // password is not empty
    confirmPassword: false, // confirm password matches passwor
    specialChar: false, // contains at least a special character
    length: false, //at least 8 characters
    match: false, // passwords match
  });

  const [inputs, setInputs] = useState({
    firstName: user && user.firstName,
    lastName: user && user.lastName,
    email: user && user.email,
    permissionId: !user && 1, //First signup is for HRM admin
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    validateInputs(e);
  };

  const validateInputs = (e) => {
    const inputName = e.target.name;
    if (inputName === "firstName") {
      setvalidators((values) => ({
        ...values,
        [inputName]: e.target.value.length >= 2,
      }));
    }

    if (inputName === "lastName") {
      setvalidators((values) => ({
        ...values,
        [inputName]: e.target.value.length >= 2,
      }));
    }

    if (inputName === "email") {
      setvalidators((values) => ({
        ...values,
        [inputName]: validator.isEmail(e.target.value),
      }));
    }
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
    if (user) {
      const data = {
        firstName: true,
        lastName: true,
        email: true,
      };
      setvalidators((values) => ({
        ...values,
        ...data,
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
      if (user) {
        //Change password
        await api.authentication.resetPassword(
          {
            password: inputs.password,
            confirmPassword: inputs.confirmPassword,
          },
          token
        );
        // Get associated employee record
        const employee = await api.employee.fetchOneByEmail(user.email);
        stateContext.updateStates({ user, employee });
        if(employee){
          navigate("/onboarding", { replace: true });
        }
        else{ 
           navigate("/dashboard", { replace: true });
        }
      } else {
        //Admin sign up
        let res = await api.authentication.signup(inputs);
        const authUserEmail = res.user;
        //Get auth user data
        res = await api.user.fetchOneByEmail(authUserEmail);
        const authUser = res;
        // Update stateContext with the auth user
        stateContext.updateState("user", authUser);
      }

      if (onSubmit) {
        onSubmit();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="sign-up-body">
      <div className="sign-up-container">
        <div className="logo-container">
          <img src={stateContext.state.logo} alt="logo" />
        </div>
        <h2 style={{ marginBottom: "0px" }}>
          {user ? "Activate account" : "Create HRM admin account"}
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            name={"firstName"}
            title={"Name"}
            value={user && user.firstName}
            valid={validators.firstName}
            placeholder="Enter your name"
            handleChange={handleChange}
          />
          <Input
            name={"lastName"}
            value={user && user.lastName}
            title={`Surname`}
            valid={validators.lastName}
            placeholder="Enter your surname"
            handleChange={handleChange}
          />
          <Input
            name={"email"}
            value={user && user.email}
            title={"Email"}
            valid={validators.email}
            type={"email"}
            placeholder="Enter your email"
            handleChange={handleChange}
          />
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
           {user ? "Activate" : "Get started"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SingupPage;
