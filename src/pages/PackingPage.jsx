import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PackingPage = () => {
  const [packingLists, setPackingLists] = useState([
    {
      id: 1,
      invoiceNumber: "INV-2025-001",
      customer: "ABC Exports",
      invoiceDate: "2025-01-01",
      countryOfOrigin: "India",
      countryOfDestination: "USA",
      totalGrossWeight: "2500 KG",
    },
    {
      id: 2,
      invoiceNumber: "INV-2025-002",
      customer: "XYZ Imports",
      invoiceDate: "2025-01-10",
      countryOfOrigin: "China",
      countryOfDestination: "Germany",
      totalGrossWeight: "1800 KG",
    },
  ]);

  const [editingList, setEditingList] = useState(null);
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    customer: "",
    invoiceDate: "",
    countryOfOrigin: "",
    countryOfDestination: "",
    totalGrossWeight: "",
  });

  const [showModal, setShowModal] = useState(false); // Control modal visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingList !== null) {
      // Update existing entry
      setPackingLists(
        packingLists.map((list) =>
          list.id === editingList ? { ...formData, id: editingList } : list
        )
      );
      setEditingList(null);
    } else {
      // Add new entry
      setPackingLists([...packingLists, { ...formData, id: packingLists.length + 1 }]);
    }

    // Reset form and close modal
    setFormData({
      invoiceNumber: "",
      customer: "",
      invoiceDate: "",
      countryOfOrigin: "",
      countryOfDestination: "",
      totalGrossWeight: "",
    });
    setShowModal(false);
  };

  const handleEdit = (id) => {
    const list = packingLists.find((item) => item.id === id);
    setEditingList(id);
    setFormData(list);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setPackingLists(packingLists.filter((item) => item.id !== id));
  };

  const handleDownload = () => {
    window.location.href = "PackingListPrint.html";
  };

  return (
    <div className="container mt-5">
      <h1>Packing List Management</h1>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        {editingList !== null ? "Edit Packing List" : "Add New Packing List"}
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Invoice Number</th>
            <th>Customer</th>
            <th>Invoice Date</th>
            <th>Country of Origin</th>
            <th>Country of Destination</th>
            <th>Total Gross Weight</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packingLists.map((list) => (
            <tr key={list.id}>
              <td>{list.id}</td>
              <td>{list.invoiceNumber}</td>
              <td>{list.customer}</td>
              <td>{list.invoiceDate}</td>
              <td>{list.countryOfOrigin}</td>
              <td>{list.countryOfDestination}</td>
              <td>{list.totalGrossWeight}</td>
              <td>
                <button className="btn btn-secondary btn-sm me-1" onClick={handleDownload}>
                  Download
                </button>
                <button className="btn btn-secondary btn-sm me-1" onClick={() => handleEdit(list.id)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(list.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }} aria-modal="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingList !== null ? "Edit Packing List" : "Add New Packing List"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Invoice Number</label>
                    <input type="text" className="form-control" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Customer</label>
                    <input type="text" className="form-control" name="customer" value={formData.customer} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Invoice Date</label>
                    <input type="date" className="form-control" name="invoiceDate" value={formData.invoiceDate} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Country of Origin</label>
                    <input type="text" className="form-control" name="countryOfOrigin" value={formData.countryOfOrigin} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Country of Destination</label>
                    <input type="text" className="form-control" name="countryOfDestination" value={formData.countryOfDestination} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Total Gross Weight</label>
                    <input type="text" className="form-control" name="totalGrossWeight" value={formData.totalGrossWeight} onChange={handleChange} required />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingList !== null ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Backdrop for modal */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default PackingPage;
