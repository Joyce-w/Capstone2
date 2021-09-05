// import "./UserLists.css";
import { useEffect, useState, useContext } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Trash } from "phosphor-react";
import PlantsApi from "./api";
import "./List.css"

function List(listData) {
    console.log(listData)
    const { list_id } = useParams();

    const [plantInfo, setPlantInfo] = useState([]);

    const history = useHistory();

    useEffect(() => {
        // Gets a list of plants based off a list id
        async function getList(id) {
            //get list of plants pertaining to the list_id 
            const res = await PlantsApi.getList(id);
            console.log('plant_list', res.plants_list)

            //gets plant data from res
            getData(res.plants_list)
        }
        
        // Gets plant data based off the plants in the list
        async function getData(plantList) {
            return plantList.map(async (p) => {
                let res = await PlantsApi.getPlant(p);
                setPlantInfo((plantInfo) =>
                    [...plantInfo, res]
                )
            })
        }
        
        getList(list_id);
    }, [])

    //Delete entire list
    const deleteList = (async () => {
        console.log(list_id)
        let res = await PlantsApi.deleteList(list_id)

        //redirect back to user list
        history.push(`/user-list/`)
    })

    const handleTrashClick = async (plant) => {
        //delete from api
        console.log('params',list_id, plant)
        let res = await PlantsApi.deletePlantFromList(list_id, plant)
        console.log(res)
        history.push(`/user-list/${list_id}`)
    }
    
    return (
        <div className="List">
            <h1>Plant List</h1>
            <p>User information here</p>
             <button onClick={()=> deleteList()}><Trash size={20}/> Delete Entire List</button>

            <div className="List-card-container">
                {plantInfo ?
                    
                    plantInfo.map(p =>
                        <div class="Plant-card">
                            <Link to={`/plants/${p.id}` }>
                            <img src={p.img}className="Plant-card-img" alt={p.plant_name}></img>
                            <div className="Plant-card-body">
                                    <h4>{p.plant_name}</h4>
                            </div>
                            </Link>
                            <button onClick={(e)=> handleTrashClick(p.id) }><Trash size={20}/></button>
                         
                        </div>
                    )
                    : <p>No list present</p>
                }
            </div>

        </div>
    )
}

export default List;