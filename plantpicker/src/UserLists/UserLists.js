// import "./UserLists.css";
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PlantsApi from "../api";
import { decodeToken } from "react-jwt";
import { Note } from "phosphor-react";
import "./UserLists.css"
import useErrorHandling from '../hooks/useErrorHandling';

function UserLists({ isLoggedIn }) {
    const [user, setUser] = useState({})
    const history = useHistory();

    //retrieve token from local storage and decode
    let userToken = decodeToken(localStorage.getItem('token')) || null;

    useEffect(() => {
        async function getUser(currUser) {
            const res = await PlantsApi.getUser(currUser);
            setUser({
                "id": res.user.id,
                "username": res.user.username,
                "plant_list": res.plant_lists
            })

        }
    
        getUser(userToken.username)

    }, [])

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
        e.preventDefault();
        console.log('submit data', listName, user.id)
    setErrorMsg(PlantsApi.createList(listName, user.id), `/user-lists`, window.location.reload())
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

                
                {user && user.plant_list ?
                    user.plant_list.map((list, idx) => 
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