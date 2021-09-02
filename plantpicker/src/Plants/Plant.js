import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PawPrint, Baby, Wind, Drop } from "phosphor-react";
import "./Plant.css";
import PlantsApi from "../api";


function Plant() {

    const { plant_name } = useParams();

    const [water, setWater] = useState("");
    
    //create state to store plant data
    const [plant, setPlant] = useState({});
    //Get all plants data
    useEffect(() => {
        async function getPlant(name) {
            
            const res = await PlantsApi.getPlant(name);
            setPlant(() => res);
        }

        getPlant(plant_name)
        
            //check value of drought tolerance of plant
        if (plant.drought_tolerant === "low") {
            setWater("Soil should be constantly wet but not soaking")
        } else if (plant.drought_tolerant === "medium") {
            setWater("Can go a few days without watering.")
        } else {
            setWater("Can go a week without watering!")
        }   
    }, [plant_name])
    


    return (
        <>
        <div className="Plant-div">
            
            <div className="Plant-leftDiv">
                <img src={plant.img} alt={plant.plant_name}></img>
            </div>
                <div className="Plant-rightDiv">
                    <h1>{plant.plant_name}</h1>
                    <p>{plant.details}</p>
                    <p>Max Height: { plant.max_height}"</p>
                    <p>Temperature Range: {plant.min_temp}-{plant.max_temp} °F |  °C</p>
                    <p>Produces Flowers: {plant.flowering ? "Yes" : "No"}</p>
                    
                    <hr></hr>
                    
                    <h4>Additional Notes</h4>
                    <p className="pet-friendly"><PawPrint size={20} />{ plant.pet_friendly ? "Pet friendly" : "Can be toxic to pets!"}</p>
                    <p className="kid-friendly"><Baby size={20} />{ plant.kid_friendly ? "Kid friendly" : "Take caution around children"}</p>
                    <p className="air-purify"><Wind size={20} />{ plant.air_purifying ? "Air purifying" : "Not as effective in purifying the air but still nice to have around!"}</p>
                    <p className="watering"><Drop size={20} /> { water} </p>
                    
            </div>
        </div>
        </>
    )
}

export default Plant;