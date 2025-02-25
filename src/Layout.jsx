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
import { dbReal } from './firebase.js';
import { ref,get,onDisconnect, update, serverTimestamp } from "firebase/database";

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

  const logout = async() => {
    const user=JSON.parse(localStorage.getItem("user"))
    const userStatusRef = ref(dbReal, `users/${user._id}`);
    // Optionally, cancel any pending onDisconnect operations
    const disconnectObj = onDisconnect(userStatusRef);
    // Cancel any scheduled onDisconnect actions
    disconnectObj.cancel()
      .catch((error) => console.error("Error cancelling onDisconnect:", error));
      const snapshot = await get(userStatusRef);
      if (snapshot.exists()) {
        update(userStatusRef, {
          "status/state": "offline",
          "status/lastSeen": serverTimestamp()
        }).then(() => {
            console.log("User signed out and status set to offline.");
          })
          .catch((error) => console.error("Error during logout:", error));
      }
     

    if (window.gtag) {
      window.gtag("event", "logout", {
        event_category: "User Actions",
        event_label: 'User Logged Out',
        page_location: window.location.href
      });
    }
    console.log("logout Click Tracked!");

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
      <div class="col-3 d-md-block bg-light sidebar sidebar-nav">
        <ul>
          <li>
            <a href="#"><House /> <span>I'm map</span></a>
            <ul class="nav-flyout">
              <li>
                <a href="/dashboard/open-map"><i class="ion-ios-color-filter-outline"></i>Open Map</a>
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
                <a href="/dashboard/chat-with-me"><i class="ion-ios-camera-outline"></i>Chat</a>
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
      </div>
  <div class="col-9 ms-sm-auto" style={{  width: "-webkit-fill-available"}}>
      <div id="main">
        <div class="header">
        <div style={{ float: 'right', padding: '20px' }}  onClick={(e) => {e.preventDefault();logout();}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16"><path d="M7.5 1v7h1V1z"></path> <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"></path>
             </svg></div>
          {/* <a
            style={{ float: 'right', padding: '20px' }}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <span class="glyphicon glyphicon-off"></span>
          </a> */}
        </div>
        {(() => {
          if (isFirstLoad) {
            <p>Welcome</p>;
          }
        })()}
        <Outlet />
      </div>
      </div>
  </div>
  </div>
  );
    
  }

export default Layout;
