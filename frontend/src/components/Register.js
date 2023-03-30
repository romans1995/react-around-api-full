import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Register = ({ handleRegister }) => {
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: "",
    password: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLoginInfo({
      ...userLoginInfo,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userLoginInfo;
    handleRegister(email, password);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  }


  return (
    <div className="login-form" height="80" width="80" color="#fff">
      <h2 className="login-form__title">Sign up</h2>
      <form className="login-form__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="login-form__input"
          placeholder="Email"
          value={userLoginInfo.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="login-form__input"
          placeholder="Password"
          value={userLoginInfo.password}
          onChange={handleChange}
        />

        <div className="login-form__footer">
          <div className="login-form__footer-wrapper">
            <button type="submit" className="login-form__submit-button">
              Sign up
            </button>
            <p className="login-form__footer-text">
              member?{" "}
              <Link to="/signin" className="login-form__footer-link">
                Sign in here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  )

}
export default Register;