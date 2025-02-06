import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, Button } from "react-bootstrap";
import { House, Person, Gear, ChevronDown, ChevronRight, List, Tools } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.scss'
import { useToken } from './TokenContext.js';
import './style.scss';
// import axios from 'axios';
import { Link, Outlet, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './Sidebar.jsx';
const Layout = () => {
  const [expanded, setExpanded] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
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
   
    const index = '/layout';
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
    <div class="container-fluid">
     <div class="row">
      <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar sidebar-nav">
        <ul>
          <li>
            <a href="#"><House /> <span>Shop</span></a>
            <ul class="nav-flyout">
              <li>
                <a href="#"><i class="ion-ios-color-filter-outline"></i>Derps</a>
              </li>
              <li>
                <a href="#"><i class="ion-ios-clock-outline"></i>Times</a>
              </li>
              <li>
                <a href="#"><i class="ion-android-star-outline"></i>Hates</a>
              </li>
              <li>
                <a href="#"><i class="ion-heart-broken"></i>Beat</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#"><Person /> <span class="">Controls</span></a>
            <ul class="nav-flyout">
              <li>
                <a href="/dashboard/home"><i class="ion-ios-alarm-outline"></i>Users</a>
              </li>
              <li>
                <a href="/dashboard/profile"><i class="ion-ios-camera-outline"></i>Profile</a>
              </li>
              <li>
                <a href="#"><i class="ion-ios-chatboxes-outline"></i>Hate</a>
              </li>
              <li>
                <a href="#"><i class="ion-ios-cog-outline"></i>Grinder</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#"><i class="ion-ios-briefcase-outline"></i> <span class="">Folio</span></a>
            <ul class="nav-flyout">
              <li>
                <a href="#"><i class="ion-ios-flame-outline"></i>Burn</a>
              </li>
              <li>
                <a href="#"><i class="ion-ios-lightbulb-outline"></i>Bulbs</a>
              </li>
              <li>
                <a href="#"><i class="ion-ios-location-outline"></i>Where You</a>
              </li>
              <li>
                <a href="#"><i class="ion-ios-locked-outline"></i>On Lock</a>
              </li>
               <li>
                <a href="#"><i class="ion-ios-navigate-outline"></i>Ghostface</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#"><i class="ion-ios-analytics-outline"></i> <span class="">Graphicals</span></a>
            <ul class="nav-flyout">
              <li>
                <a href="#"><i class="ion-ios-timer-outline"></i>Timers</a>
              </li>
              <li>
                <a href="#"><i class="ion-arrow-graph-down-left"></i>You Lose</a>
              </li>
              <li>
                <a href="#"><i class="ion-ios-partlysunny-outline"></i>Stormy</a>
              </li>
              <li>
                <a href="#"><i class="ion-ios-timer-outline"></i>Lookie Look</a>
              </li>
              <li>
                <a href="#"><i class="ion-ios-game-controller-a-outline"></i>Dork Mfer</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#"><i class="ion-ios-paper-outline"></i> <span class="">Papers</span></a>
            <ul class="nav-flyout">
              <li>
                <a href="#"><i class="ion-ios-filing-outline"></i>File Cab</a>
              </li>
              <li>
                <a href="#"><i class="ion-ios-information-outline"></i>Infos</a>
              </li>
              <li>
                <a href="#"><i class="ion-ios-paperplane-outline"></i>Planes</a>
              </li>
              <li>
                <a href="#"><i class="ion-android-star-outline"></i>Shop</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#"><i class="ion-ios-navigate-outline"></i> <span class="">Ass Finder</span></a>
            <ul class="nav-flyout">
              <li>
                <a href="#"><i class="ion-ios-flame-outline"></i>Burn</a>
              </li>
              <li>
                <a href="#"><i class="ion-ios-lightbulb-outline"></i>Bulbs</a>
              </li>
              <li>
                <a href="#"><i class="ion-ios-location-outline"></i>Where You</a>
              </li>
              <li>
                <a href="#"><i class="ion-ios-locked-outline"></i>On Lock</a>
              </li>
               <li>
                <a href="#"><i class="ion-ios-navigate-outline"></i>Ghostface</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#"><i class="ion-ios-medical-outline"></i> <span class="">Cocaine</span></a>
          </li>
        </ul>
      </nav>
  <main class="col-md-9 ms-sm-auto col-lg-12 px-4">
      <div id="main">
        <div class="header">
         
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
      </main>
  </div>
  </div>
  );
    
  }

export default Layout;
