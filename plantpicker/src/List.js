// import "./UserLists.css";
import { useEffect, useState, useContext } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Trash, PencilLine } from "phosphor-react";
import PlantsApi from "./api";
import "./List.css"

function List(listData) {
    console.log(listData)
    const { list_id } = useParams();

    const [plantInfo, setPlantInfo] = useState([]);
    const [listInfo, setListInfo] = useState([]);

    const history = useHistory();

    useEffect(() => {
        // Gets a list of plants based off a list id
        async function getList(id) {
            //get list of plants pertaining to the list_id 
            const res = await PlantsApi.getList(id);
            // save list data
            setListInfo(res);
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
        await PlantsApi.deleteList(list_id)

        //redirect back to user list
        history.push(`/user-lists/`)
    })

    const handleTrashClick = async (plant) => {
        //delete from api
        let res = await PlantsApi.deletePlantFromList(list_id, plant)
        console.log(res)
        history.push(`/user-lists/${list_id}`)
    }



    //Edit title
    const [listName, setListName] = useState("");
    const handleChange = (e) => {
        setListName(e.target.value)
    }

    //Toggles dropdown for new list form
    const handleNewForm = (e) => {
        e.target.classList.toggle("active")
        let content = e.target.nextSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = 10 + "em";
        }
    }

    const handleNewListName = (async (e) => {
        await PlantsApi.editListTitle(list_id, listName)
    });


    
    return (
        <div className="List">
            <h1>{ listInfo.list_name}</h1>
            <p>Created by { listInfo.username}</p>
                <button onClick={()=> deleteList()}><Trash size={20}/> Delete Entire List</button>
               
                <button onClick={(e) => handleNewForm(e)} className="collapsible"><PencilLine size={20} /> Edit Name</button>

                <div className="content">
                    <form className="List-form" onSubmit={(e) =>handleNewListName(e)}>
                        <label htmlFor="listName">New Title:</label>
                        <input
                            type="text"
                            name="title"
                            placeholder={ listName}
                            value={listName}
                            onChange={(e) => handleChange(e)}
                        ></input>
                        <button>Update Title</button>
                    </form>
                </div>




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