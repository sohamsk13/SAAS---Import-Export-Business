import React, { useState } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";

const OrdersPage = () => {
    const [orders, setOrders] = useState([
        { _id: "1", customer: "John Doe", orderNo: "PO12345", date: "2025-03-15", cost: 250.00, status: "Pending" },
        { _id: "2", customer: "Jane Smith", orderNo: "PO67890", date: "2025-03-10", cost: 450.50, status: "Approved" },
        { _id: "3", customer: "Mike Johnson", orderNo: "PO11223", date: "2025-02-28", cost: 120.75, status: "Completed" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [error, setError] = useState(null);

    const [newOrder, setNewOrder] = useState({
        customer: "",
        orderNo: "",
        date: "",
        cost: "",
        status: "Pending"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    const handleSaveOrder = () => {
        setError(null);
        if (!newOrder.customer || !newOrder.orderNo || !newOrder.date || !newOrder.cost) {
            setError("All fields are required.");
            return;
        }

        const orderData = {
            ...newOrder,
            cost: Number(newOrder.cost),
            _id: editingOrder ? editingOrder._id : (orders.length + 1).toString()
        };

        if (editingOrder) {
            // Update existing order
            setOrders(orders.map(order => order._id === editingOrder._id ? orderData : order));
            setEditingOrder(null);
        } else {
            // Add new order
            setOrders([...orders, orderData]);
        }

        setShowModal(false);
        resetForm();
    };

    const handleEdit = (order) => {
        setEditingOrder(order);
        setNewOrder({ ...order, date: new Date(order.date).toISOString().split("T")[0] });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setOrders(orders.filter(order => order._id !== id));
    };

    const resetForm = () => {
        setNewOrder({ customer: "", orderNo: "", date: "", cost: "", status: "Pending" });
    };

    return (
        <div className="container mt-5">
            <h1>Purchase Order Management</h1>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="primary" className="mb-3" onClick={() => { resetForm(); setShowModal(true); }}>
                Add New Purchase Order
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Purchase Order No</th>
                        <th>Order Date</th>
                        <th>Total Cost</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.customer}</td>
                            <td>{order.orderNo}</td>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>${order.cost.toFixed(2)}</td>
                            <td>{order.status}</td>
                            <td>
                                <Button variant="primary" size="sm" className="mx-2" onClick={() => handleEdit(order)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(order._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingOrder ? "Edit Purchase Order" : "Add New Purchase Order"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Customer</Form.Label>
                            <Form.Control type="text" name="customer" value={newOrder.customer} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Purchase Order No</Form.Label>
                            <Form.Control type="text" name="orderNo" value={newOrder.orderNo} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Order Date</Form.Label>
                            <Form.Control type="date" name="date" value={newOrder.date} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Total Cost</Form.Label>
                            <Form.Control type="number" name="cost" value={newOrder.cost} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select name="status" value={newOrder.status} onChange={handleInputChange}>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSaveOrder}>{editingOrder ? "Update Order" : "Save Order"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OrdersPage;
