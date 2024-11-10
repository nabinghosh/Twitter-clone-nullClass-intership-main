import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useSignInWithEmailAndPassword , useSignInWithGoogle } from 'react-firebase-hooks/auth';

//auth
import { auth } from "../../context/firebase";

//img
import twitterimg from '../../imgs/logo.webp'

//sweetAlrt
import {SweetAlrt} from '../../util/SweetAlrt'

//URL
import { URL } from "../../util/URL";

//css
import "./Login.css";

//mui
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
    const navigate = useNavigate();

    const [data , setData] = useState({email : "", password : ""});
    const [loding , setLoding] = useState(false);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoding(true);

        if(!error){
           
            
            
        if(data.email && data.password){
            
            try{
                
                await fetch(`${URL}/user/checkUser/${data.email}/${data.password}`)
                .then(res=>res.json())
                .then(async user => {
                     if(user.length != 0){
                        signInWithEmailAndPassword(data.email , data.password)
                        .then(d =>{
                            setLoding(false);
                            SweetAlrt("Login successfully" , "success");
                            localStorage.setItem("lodingUser" , JSON.stringify({name : user[0].name , userName : user[0].userName ,email : user[0].email , profileImage : user[0].profileImage}));
                            navigate('/');
                        }).then((error)=>{
                            setLoding(false);
                            console.log(error);
                        });
             
                     }else{
                        SweetAlrt("Invalid email and  password" , "error")
                     }
                })
                    }catch(error){
                        SweetAlrt("something  wrong" , "error");
                        setLoding(false);
                        console.log(error);
                    }
        }else{
            SweetAlrt("invalid fild data" , "error")
            setLoding(false);
        }
        }

    };

    return (
        <>
            <div className="login-container">
                <div className="image-container">
                    <img className=" image" src={twitterimg} alt="twitterImage" />
                </div>

                <div className="form-container ">
                    <div className="form-box" >
                        {/* <TwitterIcon style={{ color: "skyblue" }} /> */}
                        <h2 className="heading text-white pb-4">Happening now</h2>

                        <form onSubmit={handleSubmit}>

                            <input
                                type="email" className="email"
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
                                {
                                    !loading ? <button type="submit" className="btn" >Log In</button>
                                    : 
                                    <button type="submit" className="btn pt-2 pb-2" style={{backgroundColor : 'gray'}} disabled><CircularProgress size="1.5rem"/></button>
                                }
                               
                            </div>
                        </form>
                        <hr />
                        {/* <div>
                            <GoogleButton
                                className="g-btn"
                                type="light"

                                onClick={handleGoogleSignIn}
                            />


                        </div> */}
                    </div>
                    <div>
                        <spna className="text-light">Don't have an account?</spna>
                        <Link
                            to="/signup"
                            style={{
                                textDecoration: 'none',
                                color: 'var(--twitter-color)',
                                fontWeight: '600',
                                marginLeft: '5px'
                            }}
                        >
                            Sign up
                        </Link>
                    </div>
                </div>


            </div>


        </>
    );
};

export default Login;