import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./NavBar"
import Home from "./Home";
import Register from "./forms/Signup";
import Login from "./forms/Login";


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <NavBar />
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
      </BrowserRouter>

    </div>
  );
}

export default App;
