import React, { useState } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';

const QuotationsPage = () => {
  const [quotations, setQuotations] = useState([
    { id: 1, no: 'QTN-001', customer: 'John Doe', date: '2025-01-20', price: 5000, status: 'Approved' },
    { id: 2, no: 'QTN-002', customer: 'Jane Smith', date: '2025-01-18', price: 7200, status: 'Pending' },
    { id: 3, no: 'QTN-003', customer: 'Rajesh Kumar', date: '2025-01-15', price: 3500, status: 'Rejected' },
    { id: 4, no: 'QTN-004', customer: 'Maria Gonzalez', date: '2025-01-10', price: 12000, status: 'Approved' },
    { id: 5, no: 'QTN-005', customer: 'Li Wei', date: '2025-01-05', price: 8450, status: 'Pending' },
    { id: 6, no: 'QTN-006', customer: 'Aisha Ibrahim', date: '2025-01-03', price: 10000, status: 'Rejected' },
    { id: 7, no: 'QTN-007', customer: 'Michael Brown', date: '2025-01-01', price: 15300, status: 'Approved' },
    { id: 8, no: 'QTN-008', customer: 'Emma Wilson', date: '2024-12-30', price: 2800, status: 'Pending' },
    { id: 9, no: 'QTN-009', customer: 'Omar Ali', date: '2024-12-25', price: 4750, status: 'Rejected' },
    { id: 10, no: 'QTN-010', customer: 'Sophia Laurent', date: '2024-12-20', price: 6100, status: 'Approved' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentQuotation, setCurrentQuotation] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleEdit = (quotation) => {
    setCurrentQuotation(quotation);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const filteredQuotations = quotations.filter(quotation => quotation.id !== id);
    setQuotations(filteredQuotations);
  };

  const handleSave = () => {
    console.log('Saving new quotation...');
    setShowModal(false);
    // You can add functionality here to save the new quotation
  };

  const addProductDetail = () => {
    // Logic to dynamically add product rows can go here
  };

  return (
    <div className="container mt-5">
      <h1>Quotation Management</h1>
      <Button className="mb-3" variant="primary" onClick={handleShow}>
        Add Quotation
      </Button>

      {/* Quotation Listing Table */}
      <Table bordered>
        <thead>
          <tr>
            <th>Quotation ID</th>
            <th>Quotation No</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map(quotation => (
            <tr key={quotation.id}>
              <td>{quotation.id}</td>
              <td>{quotation.no}</td>
              <td>{quotation.customer}</td>
              <td>{quotation.date}</td>
              <td>{`$${quotation.price.toLocaleString()}`}</td>
              <td>{quotation.status}</td>
              <td>
                <Button variant="secondary" size="sm" onClick={() => handleEdit(quotation)}>
                  View
                </Button>{' '}
                <Button variant="primary" size="sm" onClick={() => handleEdit(quotation)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(quotation.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Adding New Quotation */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentQuotation ? 'Edit Quotation' : 'Add New Quotation'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="quotationNo">
              <Form.Label>Quotation No</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentQuotation ? currentQuotation.no : ''}
              />
            </Form.Group>
            <Form.Group controlId="quotationDate">
              <Form.Label>Quotation Date</Form.Label>
              <Form.Control
                type="date"
                defaultValue={currentQuotation ? currentQuotation.date : ''}
              />
            </Form.Group>
            <Form.Group controlId="totalPrice">
              <Form.Label>Total Price</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentQuotation ? currentQuotation.price : ''}
              />
            </Form.Group>
            <Form.Group controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={3} defaultValue={currentQuotation ? currentQuotation.notes : ''} />
            </Form.Group>
            <Form.Group controlId="terms">
              <Form.Label>Terms and Conditions</Form.Label>
              <Form.Control as="textarea" rows={3} defaultValue={currentQuotation ? currentQuotation.terms : ''} />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentQuotation ? currentQuotation.status : ''}
              />
            </Form.Group>

            {/* Product Details Section */}
            <h5>Product Details</h5>
            <Table bordered>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Quantity</th>
                  <th>Price Per Unit</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Dynamically added rows will go here */}
              </tbody>
            </Table>
            <Button variant="link" onClick={addProductDetail}>
              + Add Product Detail
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Quotation
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QuotationsPage;
