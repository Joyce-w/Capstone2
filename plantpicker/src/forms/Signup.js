import React, { useState } from "react";
import './Signup.css';
import { useHistory } from "react-router-dom"
import PlantsApi from "../api";
import { Link } from 'react-router-dom';
import useErrorHandling from "../hooks/useErrorHandling";

function Signup() {

  const inital_state = {
	"username" :"",
	"email": "",
	"password":""
  }
  
  // useErrorHandling hook to display necessary error messages
  const [error, setErrorMsg] = useErrorHandling(null);

  const history = useHistory();
  const [formData, setFormData] = useState(inital_state);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name] : value
    }))
  }

  // Handle signup credentials after pressing submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(PlantsApi.registerUser(formData), `/`, setFormData(inital_state) )
    
  }




  return (
    <div className="Signup">
        
      <form className="Signup-form" onSubmit={ handleSubmit }>
        <h1> New User Registeration </h1>
          {error && <p>{ error }</p>}
              <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleChange}
                />

              <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleChange}
                />
        

              <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                />
        <button>Signup</button>
        
          <p className="Signup-loginRoute">No account? <em><Link to ="/login">Login here!</Link></em></p>
        </form>


    </div>
  );
}

export default Signup;
