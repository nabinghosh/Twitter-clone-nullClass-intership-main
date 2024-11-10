import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../context/firebase";
import { signOut } from "firebase/auth";


//componets
import Sidebar from '../Sidebar/Sidebar';
import Widgets from "../Widgets/Widgets";


const Home = () => {
    const navigate = useNavigate();
    const [ user , isLoding] = useAuthState(auth);
    const handleLogout = async () => {
        try {
             signOut(auth);
             localStorage.clear("lodingUser");
            navigate("/login");
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className="app">
            <Sidebar handleLogout={handleLogout} user={user} />
            <Outlet />
            <Widgets />
        </div>
    );
};

export default Home;