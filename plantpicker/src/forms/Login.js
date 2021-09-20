import React, { useState } from "react";
import './Login.css';
import { useHistory } from "react-router-dom"
import PlantsApi from "../api";

function Login({loginUser}) {

  const inital_state = {
	"username" :"",
	"password":""
}

  const [formData, setFormData] = useState(inital_state);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name] : value
    }))
  }


  //get token from login 
  const getToken = async (formData) => {
    let res = await PlantsApi.loginUser(formData)
    return res
  }

  const history = useHistory();
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    await getToken(formData);
    loginUser();
    setFormData(inital_state)
    history.push('/');     
  };


  return (
    <div className="Login">
        
           <form className="Login-form" onSubmit={ handleSubmit }>
              <h1> Login </h1>
              <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={formData.username}
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
        
            <button>Login</button>
        </form>


    </div>
  );
}

export default Login;
 