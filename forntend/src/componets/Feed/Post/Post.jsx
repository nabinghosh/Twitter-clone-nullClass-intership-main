import React , {useEffect, useState} from "react";
import "./Post.css";


//componets
import LikedUserDisply from './LikedUserDisply'

//mui
import { Avatar, IconButton } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import FavoriteIcon from '@mui/icons-material/Favorite';


//URL
import { URL } from "../../../util/URL";
import { logEvent } from "firebase/analytics";


function Post({ p}) {
  let { name, username, photo, post, profilePhoto, likes , _id } = p;
  const [isLiked, setIsLiked] = useState(false);

  const loggedInUser_diteil = JSON.parse(localStorage.getItem("lodingUser"));
  

  useEffect(()=>{
    const likedPost = likes.some(u => u.email === loggedInUser_diteil.email);
    if(likedPost){
      setIsLiked(true);
    }
  }, []);

  const handleLike =async ()=>{
    if(isLiked){
      likes =  likes.filter((u) => u.email != loggedInUser_diteil.email);
      UpdateLiked();
      setIsLiked(false);

    }else{
      likes = [...likes , {email : loggedInUser_diteil.email , name : loggedInUser_diteil.name ,userName : loggedInUser_diteil.userName , profilePhoto : loggedInUser_diteil.profileImage}];
      console.log(likes);

      UpdateLiked();
      setIsLiked(true);
    }
  }


  //Update like function
  

  const UpdateLiked = async()=>{
    try{
      fetch(`${URL}/post/liked/${_id}`, {
        method: "PATCH",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({likes :likes}),
      })
        .then(res => res.json())
        .then(data => {
        })
     }catch(error){
      console.log("error : " + error);
     }
  }

  let likesBtnStyle = {
     "alignItem" : "center",
     "marginTop" : "-5px"
   }

   //formatNumberWithSuffix
   const formatNumberWithSuffix = (count) => {
    if (count >= 1e9) {
      return (count / 1e9).toFixed(2) + "B";
    } else if (count >= 1e6) {
      return (count / 1e6).toFixed(2) + "M";
    } else if (count >= 1e3) {
      return (count / 1e3).toFixed(2) + "K";
    } else {
      return count.toString();
    }
  }

  //liked user vierw diigonal
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    
  };
 


  return (
    <div className="post" >
      <LikedUserDisply open={open} setOpen={setOpen} likes={likes}/>
      <div className="post__avatar">
        <Avatar src={profilePhoto} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>{name}{" "}
              <span className="post__headerSpecial">
                <VerifiedUserIcon className="post__badge" /> @{username}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{post}</p>
          </div>
        </div>
        <img src={photo} alt="" width='500' />
        <div className="post__footer">
          {
                
                isLiked ?
              <div  className="post__footr__icon" style={{display : 'flex'}}>
                <div>
                <IconButton style={{marginTop : '-10px'}} onClick={handleLike}>
                    <FavoriteIcon  color="error"></FavoriteIcon>
              </IconButton>
                  </div>
              <div style={likesBtnStyle}  onClick={()=>setOpen(true)}>{formatNumberWithSuffix(likes.length)+" like"}</div>
              </div>
              :
              <div className="post__footr__icon" style={{display : 'flex'}}>
              <div>
              <IconButton style={{marginTop : '-10px'}}  onClick={handleLike}>
                    <FavoriteBorderIcon fontSize="small" />
              </IconButton>
                </div>
              <div style={likesBtnStyle} onClick={()=> setOpen(true)}>{formatNumberWithSuffix(likes.length)+" like"}</div>
              </div>
          }
          <ChatBubbleOutlineIcon className="post__footer__icon" fontSize="small" />
          <RepeatIcon className="post__footer__icon" fontSize="small" />
          <PublishIcon className="post__footer__icon" fontSize="small" />
        </div>
      </div>
    </div>
  );
}


export default Post;