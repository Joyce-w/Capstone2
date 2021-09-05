// import "./UserLists.css";
import { useEffect, useState, useContext } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import PlantsApi from "./api";
import { decodeToken } from "react-jwt";
import "./List.css"

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
            getData(res.plants_list)
        }

         async function getData(plantList) {
            console.log('list', plantList)

            return plantList.map(async (p) => {
                let res = await PlantsApi.getPlant(p);
                setPlantInfo((plantInfo) => 
                    [...plantInfo, res]
                )
            }
                
        )}

        getList(list_id);
        



    }, [])
    console.log('list', list)
    console.log(plantInfo)


    return (
        <div className="List">
            <h1>Plant List</h1>
            <p>User information here</p>
            <div className="List-card-container">
                {plantInfo ?
                    
                    plantInfo.map(p =>
                        <Link to={`/plants/${p.id}` }>
                        <div class="Plant-card">
                            <img src={p.img}className="Plant-card-img" alt={p.plant_name}></img>
                            <div className="Plant-card-body">
                                <h4>{p.plant_name}</h4>
                            </div>
                        </div>
                        </Link>
                    )
                    : <p>No list present</p>
                }
            </div>

        </div>
    )
}

export default List;