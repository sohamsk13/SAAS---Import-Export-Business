import { useState } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProductForm() {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([
    { _id: '1', name: 'Laptop', price: 75000, currency: 'INR', hsnCode: '8471' },
    { _id: '2', name: 'Smartphone', price: 40000, currency: 'INR', hsnCode: '8517' },
    { _id: '3', name: 'Headphones', price: 2000, currency: 'INR', hsnCode: '8518' },
  ]);
  
  const [formState, setFormState] = useState({ name: '', price: '', currency: 'INR', hsnCode: '' });

  const openModalForEdit = (product) => {
    setEditingProduct(product);
    setFormState({
      name: product.name,
      price: product.price.toString(),
      currency: product.currency,
      hsnCode: product.hsnCode,
    });
    setShowModal(true);
  };

  const openModalForNewProduct = () => {
    setEditingProduct(null);
    setFormState({ name: '', price: '', currency: 'INR', hsnCode: '' });
    setShowModal(true);
  };

  const deleteProduct = (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setProducts(products.filter(product => product._id !== id));
  };

  const saveProduct = () => {
    const productData = { ...formState, price: parseFloat(formState.price) || 0 };
    if (editingProduct) {
      setProducts(products.map(product => product._id === editingProduct._id ? { ...productData, _id: editingProduct._id } : product));
    } else {
      setProducts([...products, { ...productData, _id: (products.length + 1).toString() }]);
    }
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Product Management</h1>
        <Button variant="primary" onClick={openModalForNewProduct}>Add Product</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Currency</th>
            <th>HSN Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price.toFixed(2)}</td>
              <td>{product.currency}</td>
              <td>{product.hsnCode}</td>
              <td>
                <Button variant="outline-secondary" size="sm" onClick={() => openModalForEdit(product)}>Edit</Button>{' '}
                <Button variant="outline-danger" size="sm" onClick={() => deleteProduct(product._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" value={formState.price} onChange={(e) => setFormState({ ...formState, price: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Currency</Form.Label>
              <Form.Select value={formState.currency} onChange={(e) => setFormState({ ...formState, currency: e.target.value })}>
                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - United States Dollar</option>
                <option value="EUR">EUR - Euro</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>HSN Code</Form.Label>
              <Form.Control type="text" value={formState.hsnCode} onChange={(e) => setFormState({ ...formState, hsnCode: e.target.value })} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={saveProduct}>{editingProduct ? 'Update Product' : 'Save Product'}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}