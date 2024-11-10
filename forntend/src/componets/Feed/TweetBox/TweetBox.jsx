import React, { useState } from "react";
import "./TweetBox.css";
import axios from "axios";
import { auth } from "../../../context/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useLoggedInUser from "../../../hooks/useLoggedInUser";


//URL
import { URL } from "../../../util/URL";

//MUI
import CircularProgress from '@mui/material/CircularProgress';
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

//SweetAlrt
import {SweetAlrt} from '../../../util/SweetAlrt'

function TweetBox() {
    const [loggedInUser] = useLoggedInUser();
    const [ user ] = useAuthState(auth);
    const email = user?.email;
    const uName = loggedInUser?.userName;
    const LogeedName = loggedInUser?.name;
    const pImage = loggedInUser?.profileImage;
    const [TweetPostData , setTweetPostData] = useState({  profilePhoto: "" ,post:"",  photo: "", name : "" , username : "" ,  email:email , likes : []});
    

    const [ImgUploadLoding , setImgUploadLoding] = useState(false);
    const [loding , setLoding] = useState(false);

    const handleUploadImage = async(e) => {
        setImgUploadLoding(true);
        const image = e.target.files[0];

        const formData = new FormData();
        formData.set('image', image)

        axios.post("https://api.imgbb.com/1/upload?key=c1e87660595242c0175f82bb850d3e15", formData)
            .then(res => {
                setTweetPostData({...TweetPostData , photo :   res.data.data.display_url});
                setImgUploadLoding(false)
            })
            .catch((error) => {
                console.log(error);
                SweetAlrt("post imag fail", "error");
            })

    }
    
    const handleTweet = async(e) => {
        setLoding(true);
        e.preventDefault();
            let result = await fetch(`${URL}/post/post`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ ...TweetPostData ,  name : LogeedName, username :uName , profilePhoto : pImage}),
            })
            .then(res => res.json())
            .then(data => {
                setLoding(false);
                console.log(data);
            })

            setTweetPostData({...TweetPostData , post : "" , photo : ""});
        }

        

    return (
        <>
          <div className="tweetBox">
        <form onSubmit={handleTweet}>
            <div className="tweetBox__input">
                <Avatar src= {loggedInUser ? loggedInUser.profileImage  : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} />
                <input
                    type="text"
                    placeholder="What's happening?"
                    onChange={(e) => setTweetPostData({...TweetPostData , post : e.target.value})}
                    value={TweetPostData.post}
                    required
                />

            </div>
            <div className="imageIcon_tweetButton">
                <label htmlFor='image' className="imageIcon">
                    {
                        ImgUploadLoding ? <p>Uploading Image</p> : <p>{TweetPostData.photo ? 'Image Uploaded' : <AddPhotoAlternateOutlinedIcon />}</p>
                    }
                </label>
                <input
                    type="file"
                    id='image'
                    className="imageInput"
                    onChange={handleUploadImage}
                />
                {/* <Button className="tweetBox__tweetButton" type="submit">Tweet</Button> */}
                
                {
                    ImgUploadLoding ? 
                    <Button className="tweetBox__tweetButton"  disabled>Tweet</Button> : 
                    loding ? 
                    <Button  className="tweetBox__tweetButton" disabled ><CircularProgress size="1.5rem"/></Button>
                    :
                    <Button className="tweetBox__tweetButton" type="submit">Tweet</Button>
                }
            </div>
        </form>

    </div>
        </>
    )
}
export default TweetBox;