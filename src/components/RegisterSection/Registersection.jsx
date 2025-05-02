import React from 'react';
import { Link } from 'react-router-dom';
import './Registersection.css';

const Register = () => {
  return (
    <div className="register-background">
      <div className="register-container">
        <h2>Register</h2>
        <form>
            <label>First Name</label>
            <input type="text" placeholder="Enter your first name" />

            <label>Last Name</label>
            <input type="text" placeholder="Enter your last name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <button type="submit">Register</button>
        </form>
        <p>
            Have an account ! <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;