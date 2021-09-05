// import "./UserLists.css";
import { useEffect, useState, useContext } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import PlantsApi from "./api";
import { decodeToken } from "react-jwt";

function List(listData) {
    console.log(listData)
    const { list_id } = useParams();

    const [list, setList] = useState();

    const [plantInfo, setPlantInfo] = useState([]);

    useEffect(() => {
        async function getList(id) {
            //get list of plants pertaining to the list_id 
            const res = await PlantsApi.getList(id);
            console.log('plant_list', res.plants_list)
            setList(res.plants_list)
            
            // //get plant data and set in state
            // let info = res.plants_list.map(async p => {return await PlantsApi.getPlant(p)});
            // console.log(info)
        }
        getList(list_id);
        getData(list)

         async function getData(plantList) {
            console.log('list', plantList)

            return plantList.map(async (p) => {
                let res = await PlantsApi.getPlant(p);
                setPlantInfo((plantInfo) => 
                    [...plantInfo, res]
                )
            }
            
                // setPlantInfo((plantInfo) => {
                //     [...await PlantsApi.getPlant(p)]
                // })
            )
        }
        

    }, [])

    // useEffect(() => {
    //     async function getData(plantList) {
    //         console.log('list', plantList)

    //         plantList.map(async (p) => {
    //             let res = await PlantsApi.getPlant(p);
    //             setPlantInfo((plantInfo) => 
    //                 [...plantInfo, res]
    //             )
    //         }
            
    //             // setPlantInfo((plantInfo) => {
    //             //     [...await PlantsApi.getPlant(p)]
    //             // })
    //         )
    //     }
    //     getData(list)

    // },[list])
    

    return (
        <div className="List">
            
        </div>

    )
}

export default List;