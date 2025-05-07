import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import './Registersection.css';

const Register = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userdata, setUserdata] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password
    };
    setUserdata(user);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    console.log(userdata);
  }
  return (
    <div className="register-background">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit ={(e)=>
         handleSubmit(e)
        }>
            <label>First Name</label>
            <input required value={firstName}
            onChange={(e)=>{
              setFirstName(e.target.value);
            }}  type="text" placeholder="Enter your first name" />

            <label>Last Name</label>
            <input required value={lastName}
            onChange={(e)=>{
              setLastName(e.target.value);
            }}  type="text" placeholder="Enter your last name" />

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