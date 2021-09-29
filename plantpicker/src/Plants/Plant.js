import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { PawPrint, Baby, Wind, Drop, PlusCircle } from "phosphor-react";
import "./Plant.css";
import PlantsApi from "../api";
import { decodeToken } from "react-jwt";

import useErrorHandling from "../hooks/useErrorHandling";


function Plant() {

    const { plant_name } = useParams();
    const [water, setWater] = useState("");
    
    //create state to store plant data
    const [plant, setPlant] = useState({});

    //Get plant data from API
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
            setWater("can go a few days without watering.")
        } else {
            setWater("can go a week without watering!")
        }
    }, [plant_name])
    
  
    //get username from token from local storage to display current [plant lists]
    let userToken = decodeToken(localStorage.getItem('token'));
    console.log('userTOken', userToken)
    
    //get plant list based off username
    const [usersPlantList, setUsersPlantList] = useState(null)


    useEffect(() => {
        async function getUser(currUser) {
            const res = await PlantsApi.getUser(currUser);
   
            const plantList = await PlantsApi.getUserLists(currUser || null);
            !plantList ? setUsersPlantList(null) : setUsersPlantList(plantList);
        }

        if (!userToken) {
            setUsersPlantList(null)
        } else {
            getUser(userToken.username)
        }

    }, [])

    // Displays select dropdown if the user has lists

    //create state to store list option
    const [list, setList] = useState(0);

    //handle any change on select dropdown options
    const handleChange = (list_id) => {
        setList(list_id)
    }


    // useErrorHandling hook to display necessary error messages
    const [error, setErrorMsg] = useErrorHandling(null)
    
    //handle form submit when a list is selected

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(PlantsApi.addPlantToList(list, plant_name), `/user-lists/${list}`, null)
    }

    /**Try and catch to display error message if an api returns an error
     * the above handleSubmit incorporates a universal hook 
     * DELETE if hook is successfully incorporated in other area! 
     */

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await PlantsApi.addPlantToList(list, plant_name);
    //         history.push(`/user-lists/${list}`)
    //     } catch (error) {
    //         setError(error)
    //     }

    // }


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
                    <p className="watering"><Drop size={20} /> { plant.plant_name} {water} </p>
                    <br></br>

                    {/* Select user list to add plant to*/}
                    
                    {usersPlantList && 
                        <form onSubmit={(e) => handleSubmit(e)}>
                        {error && <p>{ error } </p>}
                            <label htmlFor="plant-list"> Add to a list: </label>
                            <select value={list} onChange={(e) => handleChange(e.target.value)}>
                                <option>Select from Dropdown</option>

                                {usersPlantList.map(list =>
                                    <option key={ list.id } value={list.id}>
                                        {list.list_name}
                                    </option>)
                                }
                            </select>
                            <button > <PlusCircle size={30} /></button>
                        </form> 
                    }
                    {!usersPlantList && userToken && <h4><Link to="/user-lists">Create a plant list</Link> to add this to your collection!</h4> }

                    {!userToken && <h4>Create an account to add this plant to your collection</h4>}
                    

                </div>
                
        </div>
        </>
    )
}

export default Plant;