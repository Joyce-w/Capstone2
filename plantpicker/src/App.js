import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./NavBar"
import Home from "./Home";
import Register from "./Forms/Signup";
import Login from "./Forms/Login";
import PlantList from "./Plants/PlantList";
import Plant from "./Plants/Plant";


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <NavBar />
        <Route exact path="/">
          <Home/>
        </Route>

        {/* Forms component */}
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>

        {/* Plant Component */}
        <Route exact path="/plants">
          <PlantList/>
        </Route>

        <Route exact path="/plants/:plant_name">
          <Plant/>
        </Route>


      </BrowserRouter>

    </div>
  );
}

export default App;
