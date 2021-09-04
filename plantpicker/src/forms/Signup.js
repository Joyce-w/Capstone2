import React, { useState } from "react";
import './Signup.css';
import { useHistory } from "react-router-dom"
import PlantsApi from "../api";

function Signup() {

  const inital_state = {
	"username" :"",
	"email": "",
	"password":""
}

  const history = useHistory();
  const [formData, setFormData] = useState(inital_state);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name] : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const { username, email, pw } = formData;
    let res = await PlantsApi.registerUser(formData);
    if (res) {
      setFormData(inital_state)
      history.push('/');     
    };
  }

  return (
    <div className="Signup">
        
      <form className="Signup-form" onSubmit={ handleSubmit }>
              <h1> Signup </h1>
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
        </form>


    </div>
  );
}

export default Signup;
