import React from 'react';
import './login.css'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyIcon from '@mui/icons-material/Key';

const ForgotPasswordPage = () => {
  return (
    <body class="login-body">
    <div className="login-container">
      <h2 style={{marginBottom: "0px"}}>Forgot password?</h2>
      <h3>No worries, we'll send you reset instructions.</h3>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" />
      </div>
      <button style={{marginTop: "0px"}} className="create-account-button">Reset password</button>
      <button className="back-to-login-button"> <ArrowBackIcon style={{fontSize: "18px", marginRight: "5px"}}/>Back to log in</button>
    </div>
    </body>
  );
};

export default ForgotPasswordPage;

//Control panel settings for storybook
ForgotPasswordPage.propTypes = {};

//Default values for this component
ForgotPasswordPage.defaultProps = {};