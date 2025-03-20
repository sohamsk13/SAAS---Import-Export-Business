import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

const ProformaTC = () => {
    const [terms, setTerms] = useState([
        {
            id: 1,
            title: [
                "1. All above offered prices are based on FOB (Any port in INDIA)",
                "2. Delivery time: 20 to 25 days",
                "3. Price validity: 15 days",
                "4. Third party inspection charges applicable extra",
            ],
            active: true
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingTerm, setEditingTerm] = useState(null);
    const [newTerm, setNewTerm] = useState({ title: "", active: true });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewTerm({ ...newTerm, [name]: type === "checkbox" ? checked : value });
    };

    const handleSaveTerm = () => {
        const formattedTitle = newTerm.title.split("\n").map((line, index) => `${index + 1}. ${line.trim()}`);
        
        if (editingTerm) {
            // Update existing term
            setTerms(terms.map(term => term.id === editingTerm.id ? { ...editingTerm, title: formattedTitle, active: newTerm.active } : term));
            setEditingTerm(null);
        } else {
            // Add new term
            setTerms([...terms, { id: terms.length + 1, title: formattedTitle, active: newTerm.active }]);
        }
        setShowModal(false);
        setNewTerm({ title: "", active: true });
    };

    const handleEdit = (term) => {
        setEditingTerm(term);
        setNewTerm({ title: term.title.join("\n"), active: term.active });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setTerms(terms.filter(term => term.id !== id));
    };

    return (
        <div className="container mt-5">
            <h1>Invoice Terms & Conditions Template Management</h1>
            <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>Add New Terms Template</Button>

            {/* Terms Table */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {terms.map(term => (
                        <tr key={term.id}>
                            <td>{term.id}</td>
                            <td>
                                <ul>
                                    {term.title.map((line, index) => <li key={index}>{line}</li>)}
                                </ul>
                            </td>
                            <td>{term.active ? "Yes" : "No"}</td>
                            <td>
                                <Button variant="secondary" size="sm" onClick={() => handleEdit(term)}>Edit</Button>
                                <Button variant="danger" size="sm" className="mx-2" onClick={() => handleDelete(term.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Adding/Editing Terms */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingTerm ? "Edit Terms Template" : "Add New Terms Template"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Terms & Conditions (Enter each line separately)</Form.Label>
                            <Form.Control as="textarea" rows={4} name="title" value={newTerm.title} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check 
                                type="checkbox"
                                label="Active"
                                name="active"
                                checked={newTerm.active}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSaveTerm}>{editingTerm ? "Update Terms" : "Save Terms"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProformaTC;
