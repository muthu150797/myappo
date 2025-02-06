import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FadeLoader, GridLoader } from "react-spinners";

const Home = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const url = "https://newapi-5y5y.onrender.com/users";
        const response = await axios.get(url);
        console.log("response:", response);

        setUserData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
      setLoading(false);
    };

    loadData();
  }, []); // Runs only once when component mounts

  // function loadData() {
  //   var userid=localStorage.getItem('token')
  //   var id=userid?userid:0;
  //  // const url =  'https://newapi-5y5y.onrender.com/api/getUserById?id='+id
  //      const url =  'https://newapi-5y5y.onrender.com/api/getAllUsers' ;
  //      setLoading(true);
  //    var userData=postData(url);
  //  //  setLoading(false);
  //   if (userData != null) {
  //     console.log("setUserDdfsgfgsdata",userData)
  //   } 
  //   else{
  //     console.log(userData.data)
  //   }
  // }
  // const postData = async (url) => {
  //   axios.get(url)
  //   .then(response => {
  //     setUsername(response.data.name)
  //     console.log('Data dsdgdfgfd:', response.data);
  //     setUserData(response.data)

  //     return response
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //     return error

  //   });
  // };
  // loadData();
  return (
    <div>
      {loading && (
        <div  style={{position: "fixed",top: "50%",left: "50%",transform: "translate(-50%, -50%)",zIndex: 1000}}>
          <FadeLoader color="#7561aa" />
        </div>
      )}
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
              <td>{item.username}</td>
              <td>{item.mail}</td>
            </tr>
          ))}
      </tbody>
    </Table>
    </div>
    
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
