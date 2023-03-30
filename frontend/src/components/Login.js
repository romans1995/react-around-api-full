import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


const Login = ({ handleLogin }) => {
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
    handleLogin(email, password);
  }

  return (
    <div className="login-form" height="80" width="80" color="#fff">
      <h2 className="login-form__title">Log in</h2>
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
              Log in
            </button>
            <p className="login-form__footer-text">
              Not a member yet?{" "}
              <Link to="/signup" className="login-form__footer-link">
                Sign up here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  )

}
export default Login;