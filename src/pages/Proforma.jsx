import React, { useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Proforma = () => {
  const [invoices, setInvoices] = useState([
    { id: 1, customer: "ABC Corporation", purchaseOrderID: "PO-101", origin: "India", destination: "USA", amount: 15000 },
    { id: 2, customer: "John Doe", purchaseOrderID: "JD-PO102", origin: "India", destination: "Germany", amount: 8500 },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentInvoice({});
  };

  const handleAddOrEdit = () => {
    if (isEditing) {
      setInvoices(
        invoices.map((inv) => (inv.id === currentInvoice.id ? currentInvoice : inv))
      );
    } else {
      setInvoices([...invoices, { ...currentInvoice, id: invoices.length + 1 }]);
    }
    handleClose();
  };

  const handleEdit = (invoice) => {
    setCurrentInvoice(invoice);
    setIsEditing(true);
    handleShow();
  };

  const handleDelete = (id) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1>Proforma Invoice Management</h1>
      <Button variant="primary" className="mb-3" onClick={handleShow}>
        Add New Proforma Invoice
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Customer</th>
            <th>Purchase Order ID</th>
            <th>Country of Origin</th>
            <th>Country of Destination</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.customer}</td>
              <td>{invoice.purchaseOrderID}</td>
              <td>{invoice.origin}</td>
              <td>{invoice.destination}</td>
              <td>${invoice.amount.toFixed(2)}</td>
              <td>
                <Button variant="secondary" size="sm" href="ProformaPrint.html">
                  Download
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleEdit(invoice)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleDelete(invoice.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Invoice" : "Add New Proforma Invoice"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Customer</Form.Label>
              <Form.Control
                type="text"
                value={currentInvoice.customer || ""}
                onChange={(e) =>
                  setCurrentInvoice({ ...currentInvoice, customer: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Purchase Order ID</Form.Label>
              <Form.Control
                type="text"
                value={currentInvoice.purchaseOrderID || ""}
                onChange={(e) =>
                  setCurrentInvoice({ ...currentInvoice, purchaseOrderID: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country of Origin</Form.Label>
              <Form.Control
                type="text"
                value={currentInvoice.origin || ""}
                onChange={(e) =>
                  setCurrentInvoice({ ...currentInvoice, origin: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country of Destination</Form.Label>
              <Form.Control
                type="text"
                value={currentInvoice.destination || ""}
                onChange={(e) =>
                  setCurrentInvoice({ ...currentInvoice, destination: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total Amount</Form.Label>
              <Form.Control
                type="number"
                value={currentInvoice.amount || ""}
                onChange={(e) =>
                  setCurrentInvoice({ ...currentInvoice, amount: parseFloat(e.target.value) || 0 })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrEdit}>
            {isEditing ? "Save Changes" : "Add Invoice"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Proforma;
