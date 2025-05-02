import React from 'react';
import { Link } from 'react-router-dom';
import './Loginsection.css';

const Login = () => {
  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#">Forget Password</a>
          </div>

          <button type="submit">Log in</button>
        </form>
        <p>
          Don’t have an account <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;