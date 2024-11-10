import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleButton from "react-google-button";
import { useCreateUserWithEmailAndPassword  , useSignInWithGoogle} from 'react-firebase-hooks/auth';


//img
import twitterimg from '../../imgs/logo.webp'

//auth
import { auth } from "../../context/firebase";

//URL
import { URL } from "../../util/URL";

//sweetAlrt
import {SweetAlrt} from '../../util/SweetAlrt'

//css
import "./Login.css"


const Signup = () => {
    let navigate = useNavigate();
    
    const [data , setData] = useState({
        userName :"" ,
        name : "" ,
         email : "",
         password : "" ,
         profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
         coverImage : "https://www.proactivechannel.com/Files/BrandImages/Default.jpg",
         bio : "",
         location : "",
         website :"",
         dob : ""
    });
    const [loding , setLoding] = useState(false);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoding(true);


        if(data.name && data.userName && data.email && data.password){
            try{
                await fetch(`${URL}/user/userFind/${data.email}`)
                .then(res=>res.json())
                .then(async user => {
                     if(user.length == 0){
                        createUserWithEmailAndPassword(data.email , data.password)
             
                        await fetch(`${URL}/user/register`, {
                            method : "POST",
                            body: JSON.stringify(data),
                            headers : {
                                'content-type': 'application/json'
                            }
                        })
                        .then(res=>res.json())
                        .then(data => {
                            SweetAlrt("SignIn succesfully" , "success")
                                navigate('/')
                                setLoding(false);
                        })
    
                     }else{
                        SweetAlrt("email already exists" , "error")
                        console.log("email alredy exit");
                        setLoding(false);
                     }
                })
                    }catch(error){
                        setLoding(false);
                        SweetAlrt("something  wrong" , "error");
                        console.log(error);
                    }
        }else{
            SweetAlrt("invalid fild data" , "error")
            setLoding(false);
        }
    };

    
    // const [signInWithGoogle, GoogleUser, GoogleLoading, GoogleError] = useSignInWithGoogle(auth);

    // const handleGoogleSignIn = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await signInWithGoogle(data.email , data.password);
    //         navigate("/Home");
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

    return (

        <div style={{height : 'auto' , overflowX:'hidden'}}>
            <div className="login-container">

                <div className="image-container">
                    <img className="image" src={twitterimg} alt="twitterImage" />
                </div>


                <div className="form-container">
                    <div className="">
                        <h2 className="heading text-light">Happening now</h2>

                        <div className="d-flex align-items-sm-center">
                            <h3 className="heading1 text-light"> Join X today </h3>
                        </div>


                        <form onSubmit={handleSubmit}>

                            <input className="display-name" style={{ backgroudColor: "red" }}
                                type="username"
                                placeholder="@username "
                               onChange={(e)=>setData({...data , userName : e.target.value})}
                               required
                            />

                            <input className="display-name" style={{ backgroudColor: "red" }}
                                type="name"
                                placeholder="Enter Full Name"
                                onChange={(e) => setData({...data , name : e.target.value})}
                                required
                            />

                            <input className="email"
                                type="email"
                                placeholder="Email address"
                                onChange={(e) => setData({...data , email : e.target.value})}
                                required
                            />



                            <input className="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setData({...data , password : e.target.value})}
                                required
                            />


                            <div className="btn-login">
                                <button type="submit" className="btn">Sign Up</button>
                            </div>
                        </form>
                        <hr />
                        {/* <div className="google-button">
                            <GoogleButton

                                className="g-btn"
                                type="light"

                                onClick={handleGoogleSignIn}
                            />
                        </div> */}
                        <div>
                            <span className="text-light">Already have an account?</span>
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: 'none',
                                    color: 'var(--twitter-color)',
                                    fontWeight: '600',
                                    marginLeft: '5px'
                                }}
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Signup;