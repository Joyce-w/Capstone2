// import "./UserLists.css";
import { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PlantsApi from "./api";
import UserContext from './UserContext';
import { decodeToken } from "react-jwt";

function UserLists() {
  const [user, setUser] = useState([])
  
    //retrieve token from local storage and decode
    let userToken = decodeToken(localStorage.getItem('token')) || null;
    console.log(userToken)
    
    useEffect(() => {
        async function getUser(currUser) {
            const res = await PlantsApi.getUser(currUser);
            console.log('userlist res', res)
            setUser({
                "username": res.user.username,
                "plant_list": res.plant_lists
            })
        }
        getUser(userToken.username)

    }, [])
    console.log(user.plant_list)

    return (
        <div className="UserLists">
            <h1> hello {user.username} </h1>
            {user.plant_list.map(list => <p>{ list }</p>)}
        </div>

    )
}

export default UserLists;