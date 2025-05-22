/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import {Pencil, Trash2} from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SoftwareRequestCard from "../components/SoftwareRequestCard";
import NoRequests from "../components/NoRequests";
import NoSoftware from "../components/NoSoftware";
import { getEnv } from "../helpers/getEnv";

export default function Home() {
  const [data, setData] = useState([]);
  const [requests, setRequests] = useState([]);
  const role = localStorage.getItem("role");
  const [editData, setEditData] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (role == "Employee"){

      const username = localStorage.getItem("username");

      axios.get(`${getEnv('VITE_BACKEND_URL')}/api/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        console.log(res.data.filter((req)=> req.user.username == username));
        setRequests(res.data.filter((req)=> req.user.username == username));
     });

    }else{
      axios
        .get(`${getEnv('VITE_BACKEND_URL')}/api/software`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  const handleEdit = (id) => {
    const selectedItem = data.find((item) => item.id === id);
    if (selectedItem) {
      setEditData(selectedItem);
      const token = localStorage.getItem("token");
      axios
        .patch(`${getEnv('VITE_BACKEND_URL')}/api/software/${id}`, editData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(data.map((item) => (item.id === id ? response.data.software : item)));          
        })
        .catch((error) => {
          console.error("Error updating item:", error);
        });
    }
  }
  
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${getEnv('VITE_BACKEND_URL')}/api/software/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <div className="flex flex-col items-center mt-20 px-4">
      <h1 className="text-4xl font-bold mt-4">Welcome to LEUCINE</h1>
      <p className="text-lg mb-8">Your software management solution</p>
      {role != "Employee" &&(data.length !== 0?<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-800 capitalize">
                {item.name}
              </h3>
              {role == "Admin" && <div className="flex gap-2">
                <button
                  onClick={() => {handleEdit(item.id); handleShow()}}
                  className="p-1.5 rounded-full hover:bg-blue-100 text-blue-600 transition"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-full hover:bg-red-100 text-red-600 transition"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>}
            </div>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>: <NoSoftware/>)}
      {role == 'Employee' &&(requests.length !=0 ?<div className="grid gap-6 px-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4  ">
        {requests.map((request) => (
          <SoftwareRequestCard key={request.id} request={request} />
        ))}
      </div>: <NoRequests/>)}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Software</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Software Name</Form.Label>
              <Form.Control
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Software Description</Form.Label>
              <Form.Control as="textarea" rows={4} value={editData.description} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleClose(); handleEdit(editData.id)}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
