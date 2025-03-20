import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";

const Role = () => {
    // Predefined roles stored in state
    const [roles, setRoles] = useState([
        { _id: "1", name: "Admin", description: "Full access to system", active: true },
        { _id: "2", name: "Editor", description: "Can edit content", active: true },
        { _id: "3", name: "Viewer", description: "Can only view content", active: false },
    ]);

    const [currentRole, setCurrentRole] = useState({ id: null, name: "", description: "", active: true });
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setCurrentRole({ ...currentRole, [id]: type === "checkbox" ? checked : value });
    };

    const saveRole = () => {
        if (currentRole.id) {
            // Update existing role
            setRoles(roles.map(role => (role._id === currentRole.id ? currentRole : role)));
        } else {
            // Create new role with a random ID
            setRoles([...roles, { ...currentRole, _id: Date.now().toString() }]);
        }
        setCurrentRole({ id: null, name: "", description: "", active: true });
        setShowModal(false);
    };

    const editRole = (id) => {
        const roleToEdit = roles.find(role => role._id === id);
        setCurrentRole({ ...roleToEdit, id: roleToEdit._id });
        setShowModal(true);
    };

    const deleteRole = (id) => {
        setRoles(roles.filter(role => role._id !== id));
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Role Management</h1>
            <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
                Add Role
            </Button>

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentRole.id ? "Edit Role" : "Add Role"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Role Name</Form.Label>
                            <Form.Control
                                type="text"
                                id="name"
                                value={currentRole.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                id="description"
                                rows={3}
                                value={currentRole.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                id="active"
                                label="Active"
                                checked={currentRole.active}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveRole}>
                        Save Role
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Table */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Role ID</th>
                        <th>Role Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map(role => (
                        <tr key={role._id}>
                            <td>{role._id}</td>
                            <td>{role.name}</td>
                            <td>{role.description}</td>
                            <td>{role.active ? "Active" : "Inactive"}</td>
                            <td>
                                <Button variant="secondary" size="sm" className="me-2" onClick={() => editRole(role._id)}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => deleteRole(role._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Role;
