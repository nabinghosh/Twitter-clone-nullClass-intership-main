import { useEffect, useState } from "react";
// import { useUserAuth } from "../context/UserAuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../context/firebase";


//URL
import { URL } from "../util/URL";

const useLoggedInUser = () => {
    const [ user] = useAuthState(auth);
    const email = user?.email;
    const [loggedInUser, setLoggedInUser] = useState({});


    useEffect(() => {
        fetch(`${URL}/user/loggedInUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setLoggedInUser(data)
            })
    }, [email, loggedInUser])

    return [loggedInUser, setLoggedInUser];
}

export default useLoggedInUser