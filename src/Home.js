import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FadeLoader, GridLoader } from "react-spinners";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setSelectedUser] = useState([]);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = (item) => {
    console.log("selecteduser",user)
    setShowModal(true);
    setSelectedUser(item);
  }
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
  }, []); 
  return (
    <>
    <div class="row pt-4"><h2>Users</h2></div>
    <div class="pt-4">
      {loading && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1000 }}>
          <FadeLoader color="#7561aa" />
        </div>
      )}
 <Modal centered show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name"
                value={user.username}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter the email"
                value={user.mail}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.mail}</td>
              <td> <Button variant="primary"  onClick={()=>handleShow(item)}>
               Edit
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

