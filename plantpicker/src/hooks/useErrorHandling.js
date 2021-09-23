import { useState } from "react";
import { useHistory } from "react-router-dom";


/**userErrorHandling has 3 parameters.
 * First parameter is an api call that runs when passed in
 * Second is a path that designates where the user is redirect to after the api call successfully happens. If an error occurs, an error from the api will display for the user.
 * Third if there are any methods that need to be run, the methods will run afterwards 
 */
const useErrorHandling = (initalVal) => {

    const [error, setError] = useState(initalVal);


    const history = useHistory()

    const setErrorMsg = async (apiMethod, path=null, methods=null) => {
        try {
            await apiMethod
            if (path) history.push(path)

            if (methods) {
                methods()
            }
        } catch (e) {
            console.log('ERRORRR', e)
            setError(e)
        }
    }

    return [error, setErrorMsg]
}

export default useErrorHandling;