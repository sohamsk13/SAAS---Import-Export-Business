import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([
    { id: 1, invoiceNumber: "INV-001", po: "PO-12345", customer: "ABC Pvt. Ltd.", invoiceDate: "2025-01-20", totalAmount: 1200 },
    { id: 2, invoiceNumber: "INV-002", po: "PO-67890", customer: "XYZ Traders", invoiceDate: "2025-01-22", totalAmount: 2500 },
    { id: 3, invoiceNumber: "INV-003", po: "PO-54321", customer: "Global Exports", invoiceDate: "2025-01-24", totalAmount: 3100 },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    invoiceNumber: "",
    po: "",
    customer: "",
    invoiceDate: "",
    totalAmount: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Add or Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setInvoices(invoices.map((invoice) => (invoice.id === formData.id ? formData : invoice)));
      setIsEditing(false);
    } else {
      setInvoices([...invoices, { ...formData, id: invoices.length + 1 }]);
    }
    setFormData({ id: null, invoiceNumber: "", po: "", customer: "", invoiceDate: "", totalAmount: "" });
    document.getElementById("closeModal").click();
  };

  // Edit invoice
  const handleEdit = (invoice) => {
    setIsEditing(true);
    setFormData(invoice);
  };

  // Delete invoice
  const handleDelete = (id) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1>Commercial Invoice Management</h1>
      <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#invoiceModal">
        Add New Invoice
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Invoice Number</th>
            <th>PO</th>
            <th>Customer</th>
            <th>Invoice Date</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.po}</td>
              <td>{invoice.customer}</td>
              <td>{invoice.invoiceDate}</td>
              <td>${invoice.totalAmount}</td>
              <td>
                <a href="/CommercialInvoicePrint.html" target="_blank" className="btn btn-secondary btn-sm">
                  Download
                </a>
                <button className="btn btn-secondary btn-sm mx-1" onClick={() => handleEdit(invoice)} data-bs-toggle="modal" data-bs-target="#invoiceModal">
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(invoice.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Invoice Modal */}
      <div className="modal fade" id="invoiceModal" tabIndex="-1" aria-labelledby="invoiceModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="invoiceModalLabel">{isEditing ? "Edit Invoice" : "Add Invoice"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Invoice Number</label>
                  <input type="text" className="form-control" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Purchase Order (PO)</label>
                  <input type="text" className="form-control" name="po" value={formData.po} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Customer</label>
                  <input type="text" className="form-control" name="customer" value={formData.customer} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Invoice Date</label>
                  <input type="date" className="form-control" name="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Total Amount</label>
                  <input type="number" className="form-control" name="totalAmount" value={formData.totalAmount} onChange={handleInputChange} required />
                </div>
                <button type="submit" className="btn btn-primary">{isEditing ? "Update" : "Add"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <button id="closeModal" className="d-none" data-bs-dismiss="modal"></button>
    </div>
  );
};

export default InvoicesPage;
