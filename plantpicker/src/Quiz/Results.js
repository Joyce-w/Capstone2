import React, { useState, useEffect } from "react";

import PlantsApi from "../api";

function Results({data}) {

    //if data is empty, return to home page

    console.log('results page', data)
    
    const [allPlants, setAllPlants] = useState([]);
    //Get all plants data
    useEffect(() => {
        async function allPlants() {
            const res = await PlantsApi.quizResults(data);
            console.log('results', res)
            // setAllPlants(res);
        }

        allPlants() 
    }, [])
    

    return (
        <h1>Results page</h1>


    )
}

export default Results;