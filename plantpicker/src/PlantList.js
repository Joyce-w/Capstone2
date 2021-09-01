import React, { useState, useEffect} from "react";
import "./PlantList.css";
import { PlusCircle } from "phosphor-react";
import PlantsApi from "./api";


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
                    <div class="card">
                        <div>
                            <img src={p.img}></img>
                        <PlusCircle size={35} className="plusCircle"/>
                        </div>
                        
                        <div class="card-body">
                            <h3 class="card-title">{ p.plant_name}</h3>
                        </div>
                    </div>                    
                    )
                }



            </div>
        </div>

    )
}

export default PlantList;