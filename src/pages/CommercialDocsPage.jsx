import React, { useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";

const CommercialDocsPage = () => {
  const [lcList, setLcList] = useState([
    { id: 1, number: "LC123456", customer: "ABC Exports", issueDate: "2025-01-01", expiryDate: "2025-06-30", amount: "$150,000", status: "Active" },
    { id: 2, number: "LC654321", customer: "XYZ Imports", issueDate: "2025-02-15", expiryDate: "2025-08-15", amount: "$250,000", status: "Expired" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentLC, setCurrentLC] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleView = (lc) => {
    setCurrentLC(lc);
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (lc) => {
    setCurrentLC(lc);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setLcList(lcList.filter((lc) => lc.id !== id));
  };

  const handleSave = () => {
    if (editMode) {
      setLcList(lcList.map((lc) => (lc.id === currentLC.id ? currentLC : lc)));
    } else {
      setLcList([...lcList, { ...currentLC, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h1>Letter of Credit Management</h1>
      <Button
        variant="primary"
        onClick={() => {
          setEditMode(true);
          setCurrentLC({ number: "", customer: "", issueDate: "", expiryDate: "", amount: "", status: "" });
          setShowModal(true);
        }}
      >
        Add New LC
      </Button>
      
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>LC ID</th>
            <th>LC Number</th>
            <th>Customer</th>
            <th>Issue Date</th>
            <th>Expiry Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lcList.map((lc) => (
            <tr key={lc.id}>
              <td>{lc.id}</td>
              <td>{lc.number}</td>
              <td>{lc.customer}</td>
              <td>{lc.issueDate}</td>
              <td>{lc.expiryDate}</td>
              <td>{lc.amount}</td>
              <td>{lc.status}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleView(lc)}>View</Button>
                <Button variant="secondary" size="sm" onClick={() => handleEdit(lc)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(lc.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit LC" : "View LC"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>LC Number</Form.Label>
              <Form.Control
                type="text"
                value={currentLC?.number || ""}
                readOnly={!editMode}
                onChange={(e) => setCurrentLC({ ...currentLC, number: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Customer</Form.Label>
              <Form.Control
                type="text"
                value={currentLC?.customer || ""}
                readOnly={!editMode}
                onChange={(e) => setCurrentLC({ ...currentLC, customer: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Issue Date</Form.Label>
              <Form.Control
                type="date"
                value={currentLC?.issueDate || ""}
                readOnly={!editMode}
                onChange={(e) => setCurrentLC({ ...currentLC, issueDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                value={currentLC?.expiryDate || ""}
                readOnly={!editMode}
                onChange={(e) => setCurrentLC({ ...currentLC, expiryDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                value={currentLC?.amount || ""}
                readOnly={!editMode}
                onChange={(e) => setCurrentLC({ ...currentLC, amount: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={currentLC?.status || ""}
                readOnly={!editMode}
                onChange={(e) => setCurrentLC({ ...currentLC, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        {editMode && (
          <Modal.Footer>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default CommercialDocsPage;
