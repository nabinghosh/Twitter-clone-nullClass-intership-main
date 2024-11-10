import React from 'react'
import '../componets.css'

import MainProfile from './MainProfile/MainProfile'
import { auth } from "../../context/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


function Profile() {
  const [user] = useAuthState(auth);
    return (
        <div className='profilePage'>
            <MainProfile user={user} />
        </div>
    )
}

export default Profile