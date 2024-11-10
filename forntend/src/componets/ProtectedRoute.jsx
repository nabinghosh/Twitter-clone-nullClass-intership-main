import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../context/firebase";

const ProtectedRoute = ({ children }) => {
    const [ user , isLoding] = useAuthState(auth);

    // console.log("Check user in Private: ", user);
       
    if(isLoding){
        return <></>;
    }
 
    if (!user) {
        return <Navigate to="/logIn" />;
    }
    return children;
};

export default ProtectedRoute;