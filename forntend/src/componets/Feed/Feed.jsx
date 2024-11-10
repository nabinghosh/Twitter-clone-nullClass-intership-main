import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import "./Feed.css";
// import '../componets.css'
import TweetBox from "./TweetBox/TweetBox";
import useLoggedInUser from "../../hooks/useLoggedInUser";

//URL
import { URL } from "../../util/URL";

//SweetAlrt
import {SweetAlrt} from '../../util/SweetAlrt'

//MUI
import CircularProgress from "@mui/material/CircularProgress";

function Feed() {
    const [posts, setPosts] = useState([]);
    const [loggedInUser] = useLoggedInUser();
    const [loding , setLoding] = useState(true);

    const email = loggedInUser?.email;
    const username = loggedInUser?.username;
    const photo = loggedInUser?.photo;

    useEffect(() => {
        //fetch('https://pacific-peak-30751.herokuapp.com/post')
        try{
            fetch(`${URL}/post/getAllPost`)
            .then(res => res.json())
            .then(data => {
                setPosts(data.reverse());
                setLoding(false);
            })
        }catch(error){
            setLoding(false);
            SweetAlrt("something worng", "error");
            console.log(error);
        }
    }, [posts])

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <TweetBox />
            {
                loding ? <div style={{display: 'flex' ,  justifyContent:'center' ,  flexDrection:'row', paddingTop : '1rem' }}> <CircularProgress /></div>
                :
                 posts &&  posts.map(p => <Post key={p._id} p={p} email= {email} loggedUserPhoto={username} loggedUsername={photo}/>)
                 
            }
        </div>

    )

}

export default Feed