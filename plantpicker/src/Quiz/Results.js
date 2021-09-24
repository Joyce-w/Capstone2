import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Results.css";

import PlantsApi from "../api";

function Results({data}) {


    const history = useHistory()
    const [allPlants, setAllPlants] = useState([]);
    //Get all plants data
    useEffect(() => {
        async function allPlants() {
            const res = await PlantsApi.quizResults(data);
            setAllPlants(res);
        }
        //if data is empty, return to home page
        if (!data) {
            history.push('/')
        } else {
            allPlants()            
        }

    }, [data])
    

    return (

<div className="quizResults">
            <h1> Quiz Results </h1>
            <div className="quizResults-List">
                    {allPlants.length === 0 ? <span><h3>There doesn't seem to be a match. <Link to="/quiz"><p>Try again? </p></Link> </h3></span> :
                    allPlants.map(p =>
                        <div className="card" key={p.id}>
                            <Link to={`/plants/${p.id}` }>
                            <div class="container">
                                <img src={ p.img } alt={p.plant_name} class="image"></img>
                                    <div class="overlay">
                                        <h3 className="card-title">{ p.plant_name}</h3>
                                    </div>
                            </div>
                            </Link>
                        </div>                    
                    )}

            </div>
                <Link to="plants" class="quizResults-fullList">View the full list of plants </Link>            
        </div>
    )
}

export default Results;