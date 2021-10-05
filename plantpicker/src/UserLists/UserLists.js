// import "./UserLists.css";
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlantsApi from "../api";
import { decodeToken } from "react-jwt";
import { Note, User } from "phosphor-react";
import "./UserLists.css"
import useErrorHandling from '../hooks/useErrorHandling';
import UserContext from '../UserContext';

function UserLists({ isLoggedIn }) {
    const [user, setUser] = useState({})
    const [plantList, setPlantList] = useState([])

    const { token } = useContext(UserContext);
    //retrieve token from local storage and decode
    // let userToken = decodeToken(JSON.parse(localStorage.getItem('token'))) || undefined;

    useEffect(() => {
        async function getUser() {
            let user = decodeToken(JSON.parse(token));

            const res = await PlantsApi.getUser(user.username);
            setPlantList(res.plant_lists)
            setUser({
                "id": res.user.id,
                "username": res.user.username
            })
        }
        getUser()

    }, [token])

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

    const inital_state = "";
    const [listName, setListName] = useState(inital_state);

    const handleChange = (e) => {
        setListName(e.target.value)
    }

      // useErrorHandling hook to display necessary error messages
    const [error, setErrorMsg] = useErrorHandling(null);

    const handleSubmit = async (e) => {
        setErrorMsg(PlantsApi.createList(listName, user.id))
    }
    
    return (
        
        <div className="UserLists">
            <h1> Here are the list(s) you've made so far! </h1>

            <span><Note size={25} /></span><button onClick={(e) => handleNewForm(e)} className="collapsible">New List</button>


            <div className="content">
                <form className="UserLists-form" onSubmit={(e) =>handleSubmit(e)}>
                    <label htmlFor="listName">Make a new list:</label>
                    <input
                        type="text"
                        name="username"
                        placeholder={ listName}
                        value={listName}
                        onChange={(e) => handleChange(e)}
                    ></input>
                    <button>Create</button>
                </form>
            </div>


                    

            <div className="userLists">

                {plantList ?
                    plantList.map((list, idx) => 
                        <div className="UserLists-lists"key={ list.list_id}>
                            <Link to={`/user-lists/${list.list_id}`}> {idx+1}. { list.list_name}</Link>
                    </div>) :
                    <p>No list yet!</p>
                }                
            </div>

        </div>

    )
}

export default UserLists;