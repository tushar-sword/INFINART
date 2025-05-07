import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Loginsection.css';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userdata, setUserdata] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    setUserdata(user);
    setEmail("");
    setPassword("");
    console.log(userdata);
  }

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Email</label>
          <input required value={email} 
          onChange={(e)=>{
            setEmail(e.target.value);
          }} type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input required value={password} 
          onChange={(e)=>{
            setPassword(e.target.value);
          }} type="password" placeholder="Enter your password" />

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