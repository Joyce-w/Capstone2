import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Results.css";

import PlantsApi from "../api";

function Results({data}) {

    //if data is empty, return to home page

    console.log('results page', data)
    
    const [allPlants, setAllPlants] = useState([]);
    //Get all plants data
    useEffect(() => {
        async function allPlants() {
            const res = await PlantsApi.quizResults(data);
            setAllPlants(res);
        }

        allPlants() 
    }, [])
    

    return (

<div className="quizResults">
            <h1> Category of Plants</h1>
            <div className="quizResults-List">
                
                {allPlants && allPlants.map(p =>
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
                )
                    
                }


            </div>
        </div>
    )
}

export default Results;