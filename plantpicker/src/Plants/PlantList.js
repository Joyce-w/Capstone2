import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./PlantList.css";
import PlantsApi from "../api";




function PlantList() {

    //create state to store plant data
    const [allPlants, setAllPlants] = useState([]);
    //Get all plants data
    useEffect(() => {
        async function allPlants() {
            const res = await PlantsApi.getAllPlants();
            setAllPlants(() => res);
        }

        allPlants() 
    },[])

    return (
        <div className="PlantList">
            <h1> Category of Plants</h1>
            <div className="PlantList-List">
                
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

export default PlantList;