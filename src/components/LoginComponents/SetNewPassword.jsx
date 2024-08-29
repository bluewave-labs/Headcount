import React, { useState } from 'react';
import './login.css'; 
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function SetNewPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [atLeastEightCharacters, setAtLeastEightCharacters] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setHasSpecialCharacter(hasSpecialCharacterCheck(e.target.value));
    setAtLeastEightCharacters(atLeastEightCharactersCheck(e.target.value));
    setIsPasswordValid(validatePassword(e.target.value));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const hasSpecialCharacterCheck = (password) => {
    const regex = /[!@#$%^&*-_]/;
    return regex.test(password);
  };

  const atLeastEightCharactersCheck = (password) => {
    return password.length >= 8;
  };

  const validatePassword = (password) => {
    return atLeastEightCharactersCheck(password) && hasSpecialCharacterCheck(password);
  };

  return (
    <body class="login-body">
    <div className="login-container">
      <h2 style={{marginBottom: "0px"}}>Set new Password</h2>
      <h3>Your new password must be different to previously used passwords.</h3>
      <div className="form-group">
        <div className='check-div'>
          {isPasswordValid && <CheckCircleIcon style={{ color: 'green' , fontSize: '20px'}} />}
          <label>Password</label>
        </div>    
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />
      </div>
      <div className="form-group">
        <div className='check-div'>
          <label>Confirm Password</label>
        </div>    
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm your password"
        />
      </div>
      <div className="password-constraints">
        <CheckCircleIcon style={{ color: atLeastEightCharacters ? 'green' : '#D0D5DD', fontSize: '20px', marginRight:"5px" }} />
        Must be at least 8 characters
      </div>
      <div className="password-constraints">
        <CheckCircleIcon style={{ color: hasSpecialCharacter ? 'green' : '#D0D5DD', fontSize: '20px', marginRight:"5px"}} />
        Must contain one special character
      </div>
      <button className="sign-in-button" style={{marginTop: "15px"}}>
        Reset Password
      </button>
      <button className="back-to-login-button"> <ArrowBackIcon style={{fontSize: "18px", marginRight: "5px"}}/>Back to log in</button>
    </div>
    </body>
  );
}

export default SetNewPasswordPage;

//Control panel settings for storybook
SetNewPasswordPage.propTypes = {};

//Default values for this component
SetNewPasswordPage.defaultProps = {};