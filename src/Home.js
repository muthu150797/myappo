import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const Home = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState([]);

  function loadData() {
    var userid=localStorage.getItem('token')
    var id=userid?userid:0;
   // const url =  'https://newapi-5y5y.onrender.com/api/getUserById?id='+id
       const url =  'https://newapi-5y5y.onrender.com/api/getAllUsers' ;
     var userData=postData(url);
    if (userData != null) {
      console.log("setUserDdfsgfgsdata",userData)
    } 
    else{
      console.log(userData.data)
    }
  }
  const postData = async (url) => {
    axios.get(url)
    .then(response => {
      setUsername(response.data.name)
      console.log('Data dsdgdfgfd:', response.data);
      setUserData(response.data)

      return response
    })
    .catch(error => {
      console.error('Error:', error);
      return error

    });
  };
  loadData();
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
      {userData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.mail}</td>
            </tr>
          ))}
      </tbody>
    </Table>
//     <div className="card" style={{ width: '18rem' }}>
//   <div className="card-body">
//     {/* <h1 className="card-title">Welcome</h1> */}
//     {/* <h3 className="card-subtitle mb-2 text-muted">Welcome</h3> */}
//     <h1 className="card-text">Hi, {username}</h1>
//   </div>
// </div>
  );
};
export default Home;
