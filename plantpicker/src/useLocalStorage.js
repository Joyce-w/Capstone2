import React, { useState, useEffect } from "react";

//accept argument and default value to initalize a value
const useLocalStorage = (key, defaultValue) => {
    
  //use callback to find localstorage 
  const [state, setState] = useState(() => {
    let value
    try {
      value = JSON.parse(
  //look in the windows localStorage to find a value, if no key then set it as default value
        window.localStorage.getItem(key) || JSON.stringify(defaultValue)
      )
    } catch (e) {
      console.log(e)
      value = defaultValue;
    }
    return value;
  })
    
//whenever state changes, update localstorage, listens for a change on 'key' if there is a dropdown list*/
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state]) 
  return [state, setState];
}
export default useLocalStorage;
