import React, { useState, useEffect } from 'react';
import './mainprofile.css';

// import Post from "./Post/Post"
import Post from '../../Feed/Post/Post'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import useLoggedInUser from '../../../hooks/useLoggedInUser';

//URL
import { URL } from '../../../util/URL';

//MUI
import EditProfile from '../EditProfile/EditProfile';
import AddLinkIcon from '@mui/icons-material/AddLink';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import LockResetIcon from '@mui/icons-material/LockReset';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CircularProgress from "@mui/material/CircularProgress";

//SweetAlrt
import {SweetAlrt} from '../../../util/SweetAlrt'


const MainProfile = ({ user }) => {
  const navigate = useNavigate();
  // const [imageURL, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUser] = useLoggedInUser();
  const username = user?.email?.split('@')[0];
  const [posts, setPosts] = useState([]);
  const [Postloding , setPostLoding] = useState(true);

  const email = loggedInUser?.email;


  useEffect(() => {
    try{
      fetch(`${URL}/post/user/post?email=${email}`)
      .then(res => res.json())
      .then(data => {
        setPostLoding(false);
          setPosts(data.reverse());
      })
    }catch(error){
      SweetAlrt("fatch all post fail", "error");
      setPostLoding(false);
      console.log(error);
    }
}, [email])

  const handleUploadCoverImage = e => {
    setIsLoading(true);
    setIsLoading(true);
    const image = e.target.files[0];

    const formData = new FormData();
    formData.set('image', image)

    axios.post("https://api.imgbb.com/1/upload?key=c1e87660595242c0175f82bb850d3e15", formData)
      .then(res => {
        const url = res.data.data.display_url;

        setIsLoading(false)
        if (url) {
          fetch(`${URL}/user/profileEdit/${email}`, {
            method: "PATCH",
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({coverImage : url}),
          })
            .then(res => res.json())
            .then(data => {
              console.log('done', data);
            })
        }

      })
      .catch((error) => {
        console.log(error);
        window.alert(error);
        setIsLoading(false);
      })
  }

  const handleUploadProfileImage = e => {
    setIsLoading(true);
    const image = e.target.files[0];

    const formData = new FormData();
    formData.set('image', image)

    axios.post("https://api.imgbb.com/1/upload?key=c1e87660595242c0175f82bb850d3e15", formData)
      .then(res => {
        const url = res.data.data.display_url;

        setIsLoading(false)
        if (url) {
          fetch(`${URL}/user/profileEdit/${email}`, {
            method: "PATCH",
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({profileImage : url}),
          })
            .then(res => res.json())
            .then(data => {
              console.log('done', data);
            })
        }

      })
      .catch((error) => {
        console.log(error);
        window.alert(error);
        setIsLoading(false);
      })
  }

  return (
    <div>
      <ArrowBackIcon className='arrow-icon' onClick={() => navigate('/')} />
      <h4 className='heading-4'>{username}</h4>
      <div className='mainprofile' >
        {/* <h1 className='heading-1' style={{ color: "white" }}>Building of profile page Tweets </h1> */}
        <div className='profile-bio'>
          {
            <div >
              <div className='coverImageContainer'>
                <img src={loggedInUser?.coverImage ? loggedInUser?.coverImage : 'https://www.proactivechannel.com/Files/BrandImages/Default.jpg'} alt="" className='coverImage' />
                <div className='hoverCoverImage'>
                  <div className="imageIcon_tweetButton">
                    <label htmlFor='image' className="imageIcon">
                      {
                        isLoading ?
                          <LockResetIcon className='photoIcon photoIconDisabled ' />
                          :
                          <CenterFocusWeakIcon className='photoIcon' />
                      }
                    </label>
                    <input
                      type="file"
                      id='image'
                      className="imageInput"
                      onChange={handleUploadCoverImage}
                    />
                  </div>
                </div>
              </div>
              <div className='avatar-img'>
                <div className='avatarContainer'>
                  <img src={loggedInUser?.profileImage ? loggedInUser?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} className="avatar" alt='' />
                  <div className='hoverAvatarImage'>
                    <div className="imageIcon_tweetButton">
                      <label htmlFor='profileImage' className="imageIcon">
                        {
                          isLoading ?
                            <LockResetIcon className='photoIcon photoIconDisabled ' />
                            :
                            <CenterFocusWeakIcon className='photoIcon' />
                        }
                      </label>
                      <input
                        type="file"
                        id='profileImage'
                        className="imageInput"
                        onChange={handleUploadProfileImage}
                      />
                    </div>
                  </div>
                </div>
                <div className='userInfo'>
                  <div>
                    <h3 className='heading-3'>
                      {loggedInUser?.name ? loggedInUser.name : user && user.displayName}
                    </h3>
                    <p className='usernameSection'>@{username}</p>
                  </div>
                  <EditProfile user={user} loggedInUser={loggedInUser} />
                </div>
                <div className='infoContainer'>
                  {loggedInUser.bio ? <p>{loggedInUser.bio}</p> : ''}
                  <div className='locationAndLink'>
                    {loggedInUser?.location ? <p className='subInfo'><MyLocationIcon /> {loggedInUser.location}</p> : ''}
                    {loggedInUser?.website ? <p className='subInfo link'><AddLinkIcon /> {loggedInUser.website}</p> : ''}
                  </div>
                </div>
                <h4 className='tweetsText'>Tweets</h4>
                <hr />
              </div>
              {
                Postloding ? <div style={{display: 'flex' ,  justifyContent:'center' ,  flexDrection:'row', paddingTop : '1rem' }}> <CircularProgress /></div>
                :
                 posts &&  posts.map(p => <Post key={p._id} p={p} email={email} />)
                 
            }
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MainProfile;