import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

const ProformaNotes = () => {
    const [notes, setNotes] = useState([
        { id: 1, title: "We declare that this invoice shows the actual price of the Good described and that all particulars are true and correct.", active: true },
        { id: 2, title: "We are sure you will find our quality as per your requirement and our price so competitive. Please let us know your courier address details if you require a sample for testing purposes.", active: false }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [newNote, setNewNote] = useState({ title: "", active: true });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewNote({ ...newNote, [name]: type === "checkbox" ? checked : value });
    };

    const handleSaveNote = () => {
        if (editingNote) {
            // Update existing note
            setNotes(notes.map(note => note.id === editingNote.id ? { ...editingNote, ...newNote } : note));
            setEditingNote(null);
        } else {
            // Add new note
            setNotes([...notes, { id: notes.length + 1, ...newNote }]);
        }
        setShowModal(false);
        setNewNote({ title: "", active: true });
    };

    const handleEdit = (note) => {
        setEditingNote(note);
        setNewNote(note);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    return (
        <div className="container mt-5">
            <h1>Invoice Notes Template Management</h1>
            <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>Add New Note Template</Button>

            {/* Notes Table */}
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
                    {notes.map(note => (
                        <tr key={note.id}>
                            <td>{note.id}</td>
                            <td>{note.title}</td>
                            <td>{note.active ? "Yes" : "No"}</td>
                            <td>
                                <Button variant="secondary" size="sm" onClick={() => handleEdit(note)}>Edit</Button>
                                <Button variant="danger" size="sm" className="mx-2" onClick={() => handleDelete(note.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Adding/Editing Notes */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingNote ? "Edit Note Template" : "Add New Note Template"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Note Title</Form.Label>
                            <Form.Control as="textarea" rows={3} name="title" value={newNote.title} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check 
                                type="checkbox"
                                label="Active"
                                name="active"
                                checked={newNote.active}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSaveNote}>{editingNote ? "Update Note" : "Save Note"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProformaNotes;
