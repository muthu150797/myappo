import { useSearchParams } from "react-router-dom";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import axios from 'axios/dist/browser/axios.cjs';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyUser = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    const [userData, setUser] = useState('');
    useEffect( () => {
       
    });
   const VerifyUser =async()=>{
        try {
            const url = "https://newapi-5y5y.onrender.com/api/users/verify?token="+token;
            const response = await axios.get(url);
            console.log('response', response.data);
            await setUser(response.data)
            if(response.data.verified){
               // navigate("./login")
            }
            else{
             //   return (<div>response.data.message</div>);
            }
            return response;
        } catch (error) {
            console.log('error', error);
            return error;
        } finally {
        }
    }
    VerifyUser();
    if(userData.verified){
        //navigate("./login")
    }
    else{
    return (<div>userData.verified.message</div>);
    }
    {/* alert();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); // Get 'myQuery' from URL
    if(token==null){
        return <div>Invalid Token</div>;
    }
    else{
        return <div>Query Value: {token}</div>;
    } */}
}
export default VerifyUser;
