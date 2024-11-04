import React, { useState } from 'react';
import './AccountCreation.css';
import axios from 'axios';

function AccountCreation() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://foodie_reviewApp-backend.cloud-stacks.com/api/users', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setIsAccountCreated(true);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Account creation failed');
    }
  };

  return (
    <div className="account-creation-container">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <button type="submit">Create Account</button>
      </form>
      {isAccountCreated && <p>Account created successfully! Please check your email for confirmation.</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default AccountCreation;
