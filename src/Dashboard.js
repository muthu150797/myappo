import React, { useState, useEffect } from 'react';
import { useToken } from './TokenContext.js';
import './style.scss';
// import axios from 'axios';
import { Link, Outlet, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap'
const Dashboard = () => {
  const { token, setToken } = useToken();
  const [tableData, setTableData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  let isFirstLoad = true;
  const navigate = useNavigate();
  
  // Access current URL components
  const { pathname, search, hash } = location;
  const currentUrl = `${pathname}${search}${hash}`;
  // Step 2: Fetch data function
  const fetchData = () => {
    // Replace this with your data fetching logic
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

    // // Make a GET request
    // axios
    //   .get(apiUrl)
    //   .then((response) => {
    //     console.log('Data:', response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    // setIsLoaded(true);
  };
  // Step 3: Update state on button click
  useEffect(() => {
   
    const index = '/dashboard';
    const regex = new RegExp(`\\b${pathname}\\b`, 'i'); // 'i' for case-insensitive search
    const match = index.match(regex);
    if (localStorage.getItem('token') != null) {
      setToken('');
    }
    if (pathname == index) {
      isFirstLoad = true;
    } else {
      isFirstLoad = false;
    }
    fetchData();
  }, []);
  const toggleSidebar = () => {
    const container = document.querySelector('.container');
    container.classList.toggle('collapsed');
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token') 
    navigate('/');
  };
  const toggle = () => {
    if (document.getElementById('mySidebar').style.width == '0px') {
      document.getElementById('mySidebar').style.width = '250px';
      document.getElementById('main').style.marginLeft = '250px';
    } else {
      document.getElementById('mySidebar').style.width = '0';
      document.getElementById('main').style.marginLeft = '0';
    }
  };
  const openNav = () => {
    alert(document.getElementById('mySidebar').style.width);
  };

  const closeNav = () => {
    alert(document.getElementById('mySidebar').style.width);
  };
  return (
    <div>
      <div id="mySidebar" class="sidebar">
        <ul>
          <li>
            <Link to="/dashboard/home">Home</Link>
          </li>
          <li>
            <Link to="/dashboard/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/settings">Settings</Link>
          </li>
        </ul>
      </div>

      <div id="main">
        <div class="header">
          <button class="openbtn" onClick={toggle}>
            ☰
          </button>
          <a
            style={{ float: 'right', padding: '20px' }}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <span class="glyphicon glyphicon-off"></span>
          </a>
        </div>
        {(() => {
          if (isFirstLoad) {
            <p>Welcome</p>;
          }
        })()}
        <Outlet />
      </div>
    </div>
  );
};
export default Dashboard;
