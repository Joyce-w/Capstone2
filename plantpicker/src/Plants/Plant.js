import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { PawPrint, Baby, Wind, Drop, PlusCircle } from "phosphor-react";
import "./Plant.css";
import PlantsApi from "../api";
import { decodeToken } from "react-jwt";


function Plant() {

    const { plant_name } = useParams();
    const [water, setWater] = useState("");
    
    //create state to store plant data
    const [plant, setPlant] = useState({});

    //Get plant data
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
    
    // Get user plant list

  
    //get token from local storage to display current [plant lists]
    let userToken = decodeToken(localStorage.getItem('token')) || null;

    //get plant list based off username
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        async function getUser(currUser) {
            // const res = await PlantsApi.getUser(currUser);
            const plantList = await PlantsApi.getUserLists(currUser);
            setUser(plantList.length === 0 ? null : plantList);
            console.log('userlist', user)
        }
        getUser(userToken.username)

    }, [])

    // Displays select dropdown if the user has lists

    //create state to store list option
    const [list, setList] = useState(0);

    //handle any change on select dropdown options
    const handleChange = (list_id) => {
        console.log(list_id)
        setList(list_id)
    }

    //handle form submit when a list is selected
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await PlantsApi.addPlantToList(list, plant_name)
        history.push(`/user-lists/${list}`)
    }



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
                    <p className="watering"><Drop size={20} /> {water} </p>
                    <br></br>

                    {/* Select user list to add plant to*/}
                    
                    {user ?
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label for="plant-list"> Add to a list: </label>
                        <select value={list} onChange={(e) => handleChange(e.target.value)}>
                            <option>Select from Dropdown</option>
                            {user.map(list =>
                                <option value={ list.id}>
                                    {list.list_name}
                                </option>)
                            }
                        </select>
                        <button > <PlusCircle size={30} /></button>
                    </form>       
                    : <h4><Link to="/user-lists">Create a plant list</Link> to add this to your collection!</h4>}

                </div>
                
        </div>
        </>
    )
}

export default Plant;