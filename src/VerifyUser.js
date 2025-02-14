import { useSearchParams } from "react-router-dom";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import axios from 'axios/dist/browser/axios.cjs';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FadeLoader, GridLoader } from "react-spinners";
const VerifyUser = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    const [newpassword, SetNewPassword] = useState('');
    const [confirmpassword, SetConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [userData, setUser] = useState([]);
    const [errorText, setError] = useState('');
    const showErrorToast = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    useEffect(() => {
        VerifyUser();
    }, []);
    const VerifyUser = async () => {
        try {
            const url = "https://newapi-5y5y.onrender.com/api/users/verify?token=" + token;
            const response = await axios.get(url);
            console.log('response', userData);
             setUser(response.data)
            console.log('userData', userData);

            if (response.data.verified) {
                // navigate("./login")
            }
            else {
                //   return (<div>response.data.message</div>);
            }
            return response;
        } catch (error) {
            console.log('error', error);
            return error;
        } finally {
        }
    }
    
    

    if (userData != null && userData.verified) {
        return (
            navigate('/change-password?id='+userData.userId)
        );
    }
    else {
        return (<div>{userData.message}</div>);
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
