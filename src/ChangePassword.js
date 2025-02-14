import { useSearchParams } from "react-router-dom";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import axios from 'axios/dist/browser/axios.cjs';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FadeLoader, GridLoader } from "react-spinners";
const ChangePassword = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
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
    useEffect( () => {
    },[]);
   
    const ChangePassword = async () => {
        if(newpassword!=confirmpassword){
            showErrorToast("Confirm password not matching")
            return false;
        }
        // Imagine you got a token from an API
        setLoading(true);
        var userDatas = await postData();
        setUser(userDatas.data)
        setLoading(false);
        console.log('userss', userData);
        if (userDatas.status == 200) {
          console.log('userData', userData);
          localStorage.setItem('token', userData.id);
          setToken(userData.email)
          navigate('/dashboard');
        } else {
          showErrorToast(userData.message);
        }
      };
      const validatePassword=async(value)=>{
        if(""==confirmpassword){setError("");}
        if(newpassword!=confirmpassword){
         setError("Confirm password not matching")
        }
        else{
            setError("");
        }
       };
    const postData = async () => {
        const url = 'https://newapi-5y5y.onrender.com/api/users/updateUserById?id='+id;
        const payload = {
          password: confirmpassword,
        };
    
        try {
          const response = await axios.put(url, payload, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          console.log('response', response);
          return response;
        } catch (error) {
          console.log('error', error);
          return error;
        } finally {
        }
      };
   
    if(true){
        return (
    
            <div>
              {/* Loader Overlay */}
              {loading && (
                <div  style={{position: "fixed",top: "50%",left: "50%",transform: "translate(-50%, -50%)",zIndex: 1000}}>
                  <FadeLoader color="#7561aa" />
                </div>
              )}
              <div class="container">
                <div class="screen">
                  <div class="screen__content">
                    <form class="login">
                      <div class="login__field">
                        <i class="login__icon fas fa-user"></i>
                        <input
                          type="text"
                          class="login__input"
                          placeholder="Enter new password"
                          value={newpassword}
                          onChange={(e) => SetNewPassword(e.target.value)}
                        ></input>

                      </div>
                      <div class="login__field">
                        <i class="login__icon fas fa-lock"></i>
                        <input
                          type="password"
                          class="login__input"
                          placeholder="Confirm password"
                          value={confirmpassword}
                    onChange={(e) =>  SetConfirmPassword(e.target.value)}
                           onKeyUp={validatePassword}
                        ></input>
                        <div style={{color:"red"}}>{errorText}</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          ChangePassword();
                        }}
                        class="button login__submit"
                      >
                        <span class="button__text">Change Password</span>
                        <i class="button__icon fas fa-chevron-right"></i>
                      </button>
                    </form>
                    <div class="social-login">
                      <h3>log in via</h3>
                      <div class="social-icons">
                        <a href="#" class="social-login__icon fab fa-instagram"></a>
                        <a href="#" class="social-login__icon fab fa-facebook"></a>
                        <a href="#" class="social-login__icon fab fa-twitter"></a>
                      </div>
                    </div>
                  </div>
                  <div class="screen__background">
                    <span class="screen__background__shape screen__background__shape4"></span>
                    <span class="screen__background__shape screen__background__shape3"></span>
                    <span class="screen__background__shape screen__background__shape2"></span>
                    <span class="screen__background__shape screen__background__shape1"></span>
                  </div>
                </div>
              </div>
              </div>
          );
    }
  
}
export default ChangePassword;
