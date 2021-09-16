import './App.css';
import { useState, useEffect } from 'react';
import { decodeToken } from "react-jwt";
import { BrowserRouter, Route, } from "react-router-dom";
import UserContext from './UserContext';
import PlantsApi from "./api";
import NavBar from "./NavBar"
import Home from "./Home";
import Register from "./Forms/Signup";
import Login from "./Forms/Login";
import PlantList from "./Plants/PlantList";
import Plant from "./Plants/Plant";
import UserList from "./UserLists";
import List from "./List"
import QuizForm from './Quiz/QuizForm';



function App() {


  return (
    <div className="App">
      {/* <UserContext.Provider value={ user }> */}
        <BrowserRouter>
          
        <NavBar />
        <Route exact path="/">
          <Home/>
        </Route>

        {/* Form components */}
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route exact path="/login">
          <Login/>
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
          <UserList/>
        </Route>

        <Route exact path="/user-lists/:list_id">
          <List />
        </Route>


        <Route exact path="/quiz">
          <QuizForm />
        </Route>

      </BrowserRouter>
      {/* </UserContext.Provider> */}

    </div>
  );
}

export default App;
