'use strict'

import './App.css';
import { useState, useEffect } from 'react';
import { decodeToken } from "react-jwt";
import { BrowserRouter, Route, } from "react-router-dom";
import UserContext from './UserContext';
import NavBar from "./NavBar"
import Home from "./Home";
import Register from "./forms/Signup";
import Login from "./forms/Login";
import PlantList from "./Plants/PlantList";
import Plant from "./Plants/Plant";
import UserList from "./UserLists/UserLists";
import List from "./UserLists/List"
import QuizForm from './Quiz/QuizForm';
import Results from "./Quiz/Results"
import PlantsApi from './api';


function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //handles localstorage, api, token when logging out
  const logoutUser = async () => {
    setIsLoggedIn(false);
    setToken(null)
    localStorage.clear();
    await PlantsApi.logoutUser();
  }

  const loginUser = async () => {
    setIsLoggedIn(true);
    setToken(localStorage.getItem('token'))
  }


  
  const [data, setData] = useState(null)

  const getData = (answers, positions) => {
    let { lighting, watering, has_kids, has_pets, does_flower } = answers;

    setData(() => ({
      ...data,
      does_flower,
      has_kids,
      has_pets,
      lighting: +lighting,
      "pos": positions,
      watering      

    }))

  }

  return (
    <div className="App">
      <UserContext.Provider value={ {token, isLoggedIn} }>
        <BrowserRouter>
          
          <NavBar token={token} setIsLoggedIn={setIsLoggedIn} logoutUser={logoutUser}/>
        <Route exact path="/">
          <Home/>
        </Route>

        {/* Form components */}
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route exact path="/login">
            <Login loginUser={loginUser}/>
        </Route>

        {/* Plant Components */}
        <Route exact path="/plants">
          <PlantList/>
        </Route>

        <Route exact path="/plants/:plant_name">
          <Plant/>
        </Route>

        {/* User Components */}
        <Route exact path="/user-lists">
            <UserList isLoggedIn={ isLoggedIn}/>
        </Route>

        <Route exact path="/user-lists/:list_id">
          <List/>
        </Route>

        
        <Route exact path="/quiz">
          <QuizForm getData={getData}/>
        </Route >

        <Route exact path="/results">
          <Results data={ data}/>
          </Route >
          
        
      </BrowserRouter>
      </UserContext.Provider>
      
    </div>
  );
}

export default App;
