import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, Table, Container } from "react-bootstrap";

   const CustomerForm = () => {
  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Global Tech",
      contact: "Pradip Kanase",
      email: "pradip@globaltech.com",
      phone: "0123456789",
      country: "USA",
    },
  ]);
  const [formData, setFormData] = useState({});

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setCustomers([...customers, { id: customers.length + 1, ...formData }]);
    handleClose();
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  return (
    <Container className="mt-5 p-4 border rounded shadow">
      <h1 className="mb-4 text-center">Customer Management</h1>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add Customer
      </Button>

      <Table bordered striped hover>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Contact Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.contact}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.country}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(customer.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add/Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control type="text" name="name" onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Name</Form.Label>
              <Form.Control type="text" name="contact" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" name="country" onChange={handleInputChange} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Customer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CustomerForm;