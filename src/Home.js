import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const Home = () => {
  const [username, setUsername] = useState('');

  function loadData() {
    var userid=localStorage.getItem('token')
    var id=userid?userid:0;
    const url =  'https://newapi-5y5y.onrender.com/api/getUserById?id='+id
    var userData=postData(url);
  }
  const postData = async (url) => {
    axios.get(url)
    .then(response => {
      setUsername(response.data.name)
      console.log('Data:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  loadData();
  return (
    <div className="card" style={{ width: '18rem' }}>
  <div className="card-body">
    {/* <h1 className="card-title">Welcome</h1> */}
    {/* <h3 className="card-subtitle mb-2 text-muted">Welcome</h3> */}
    <h1 className="card-text">Hi, {username}</h1>
  </div>
</div>
  );
};
export default Home;
