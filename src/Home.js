import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CiCirclePlus } from "react-icons/ci";
import { toast } from 'react-toastify';
import { FadeLoader, GridLoader } from "react-spinners";
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [name, setUsername] = useState('');
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [user, setSelectedUser] = useState({
    name: '',
    email: '',
    password:'',
    _id:0
  });
  const navigate = useNavigate();

  const [modalheading, setModalHeading] = useState('Add User');
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = (item) => {
    console.log("selecteduser",user)
    setShowModal(true);
    setSelectedUser(item!=null?item:[]);
    setModalHeading(item!=null?"Edit User":"Add User")
    setEditMode(item!=null?true:false)
  }
  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
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
    loadData();
  }, []); 
  const loadData = async () => {
    setLoading(true);
    try {
      const url = "https://newapi-5y5y.onrender.com/api/users/getAllUsers";
      const token=localStorage.getItem('token')
      const response = await axios.get(url,{
        headers: {
          'Authorization': 'Bearer '+token,
        },
      });
      
      console.log("response:", response);
      setUserData(response.data);
    } catch (error) {
      showErrorToast(error.response.data.message)
      navigate('/login')
      console.error("Error:", error);
    }
    setLoading(false);
  };
  const updateUser=async()=>{
    const userData={
      "name":user.name,
      // "password":user.password,
      "email":user.email,
      "deptId":2
   }
   let _id=user._id;
   const url = 'https://newapi-5y5y.onrender.com/api/users/updateUserById?id='+_id;
   
    try {
      const token=localStorage.getItem('token')

      const response = await axios.put(url, userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        },
      });
      setTimeout(() => {
        loadData(); 
      }, 2000);
      setShowModal(false)
      showSuccessToast(user.name+" updated successfully")
      console.log('response', response);
    } catch (error) {
      showErrorToast(error.response.data.message)
      navigate('/login')
      console.log('error', error);
      return error;
    } finally {
    }
  }
  const addUser=async()=>{
    const token=localStorage.getItem('token')

    console.log("userdataforadd",user)
    const userData={
      "name":user.name,
      // "password":user.password,
      "email":user.email,
   }
   const url = 'https://newapi-5y5y.onrender.com/api/users';
   
    try {
      const response = await axios.post(url, userData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        },
      });
      setTimeout(() => {
        loadData(); 
      }, 2000);
      setShowModal(false)
      showSuccessToast(user.name+" added successfully")
      console.log('response', response);
    } catch (error) {
      showErrorToast(error.response.data.message)
      navigate('/login')

      console.log('error', error);
      return error;
    } finally {
    }
  }
  let handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({
      ...user,
      [name]: value,
    });
  };
  let deleteUser= (item)=>{
   if(confirm(`Are you sure to delete this user ${item.name}?`)){
     try{
      const token=localStorage.getItem('token')

      let _id=item._id;
      const url = "https://newapi-5y5y.onrender.com/api/users/deleteUserById?id="+_id;
      axios.delete(url,{
        headers: {
          'Authorization': 'Bearer '+token
        },
      })
      .then(response =>{
        setTimeout(() => {
          loadData(); 
        }, 2000);
       
        showSuccessToast(item.name+" is deleted successfully")
        console.log("Data deleted:", response.data)
      })
      .catch(error =>showErrorToast(error.response.data.message,
      navigate('/login')
      )
      );
        
     }
     catch(error){
     console.log("error",error)
     }
   }
  }
  return (
    <>
    <div class="row pt-4"><div class="col-12 d-flex justify-content-between align-items-center">
    <h2>Users</h2>
    <span class="d-flex justify-content-end">
    <CiCirclePlus onClick={() => {handleShow(null)}}  style={{ fontSize: '2rem', color: '#007bff', fontWeight: 'bold' }} />
    </span>
  </div></div>
    <div class="pt-4">
      {loading && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1000 }}>
          <FadeLoader color="#7561aa" />
        </div>
      )}
 <Modal centered show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalheading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name"
                value={user.name||''}
                onChange={handleInputChange}
                name="name" // Name should match state key
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter the email"
                value={user.email||''}
                onChange={handleInputChange}
                name="email" // Name should match state key
                autoFocus
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter the password"
                value={user.password||''}
                onChange={handleInputChange}
                name="password" // Name should match state key
                autoFocus
              />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label hidden className="fw-bold">ID</Form.Label>
              <Form.Control
                type="number"
                hidden
                placeholder="Enter the Id"
                value={user._id||0}
                onChange={handleInputChange}
                name="_id" // Name should match state key
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editMode==false?addUser:updateUser}>
           {editMode==false?"Add":"Update"}
          </Button>
        </Modal.Footer>
      </Modal>      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
               <td>{item.active?"Active":"In Active"}</td>
              <td> <Button variant="primary"  onClick={()=>handleShow(item)}>
               Edit
              </Button> <Button  className="pr-2" variant="primary"  onClick={()=>deleteUser(item)}>
               Delete
              </Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </div>
   </>

  );
};
export default Home;

