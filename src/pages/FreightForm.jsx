import React, { useState } from "react";
import { Modal, Button, Table, Form, Container } from "react-bootstrap";

   const FreightForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [charges, setCharges] = useState([
    { description: "Base Shipping", amount: 150, type: "Export", insurance: true },
    { description: "Additional Handling", amount: 50, type: "Service", insurance: false },
  ]);
  const [chargeData, setChargeData] = useState({ description: "", amount: "", type: "", insurance: false });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setChargeData({ ...chargeData, [name]: type === "checkbox" ? checked : value });
  };

  const addOrUpdateCharge = () => {
    setCharges([...charges, chargeData]);
    setChargeData({ description: "", amount: "", type: "", insurance: false });
    setShowModal(false);
  };

  const deleteCharge = (index) => {
    setCharges(charges.filter((_, i) => i !== index));
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Freight Quotation Management</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Quotation Date</Form.Label>
          <Form.Control type="date" defaultValue="2023-01-15" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Valid Until</Form.Label>
          <Form.Control type="date" defaultValue="2023-06-15" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Terms and Conditions</Form.Label>
          <Form.Control as="textarea" rows={3} defaultValue="All deliveries subject to a standard carriage charge unless otherwise stated." />
        </Form.Group>
        <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">Add Freight Charge</Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Insurance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {charges.map((charge, index) => (
            <tr key={index}>
              <td>{charge.description}</td>
              <td>${charge.amount.toFixed(2)}</td>
              <td>{charge.type}</td>
              <td>{charge.insurance ? "✔️" : "❌"}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => deleteCharge(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success">Save Quotation</Button>

      {/* Modal for Adding/Editing Charges */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add/Edit Freight Charge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Charge Description</Form.Label>
              <Form.Control type="text" name="description" value={chargeData.description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" name="amount" value={chargeData.amount} onChange={handleInputChange} step="0.01" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Charge Type</Form.Label>
              <Form.Control type="text" name="type" value={chargeData.type} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Insurance Included" name="insurance" checked={chargeData.insurance} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={addOrUpdateCharge}>Save Charge</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

 export default FreightForm;