import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const LC = () => {
  const [lcRecords, setLcRecords] = useState([
    { id: 1, number: "LC123456", customer: "ABC Exports", issueDate: "2025-01-01", expiryDate: "2025-06-30", amount: "$150,000", status: "Active" },
    { id: 2, number: "LC654321", customer: "XYZ Imports", issueDate: "2025-02-15", expiryDate: "2025-08-15", amount: "$250,000", status: "Expired" },
    { id: 3, number: "LC789012", customer: "Global Traders", issueDate: "2025-03-10", expiryDate: "2025-09-10", amount: "$500,000", status: "Pending" },
    { id: 4, number: "LC321654", customer: "Green Supply Co.", issueDate: "2025-04-20", expiryDate: "2025-10-20", amount: "$200,000", status: "Active" },
    { id: 5, number: "LC456789", customer: "Logistics Pro", issueDate: "2025-05-05", expiryDate: "2025-11-05", amount: "$350,000", status: "Cancelled" },
  ]);

  const [selectedLC, setSelectedLC] = useState(null);
  const [newLC, setNewLC] = useState({ number: "", customer: "", issueDate: "", expiryDate: "", amount: "", status: "Active" });

  // Handle input changes
  const handleChange = (e, isNew = false) => {
    const { name, value } = e.target;
    if (isNew) {
      setNewLC((prev) => ({ ...prev, [name]: value }));
    } else {
      setSelectedLC((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add New LC
  const addLC = () => {
    if (!newLC.number || !newLC.customer || !newLC.issueDate || !newLC.expiryDate || !newLC.amount) return;
    setLcRecords([...lcRecords, { id: lcRecords.length + 1, ...newLC }]);
    setNewLC({ number: "", customer: "", issueDate: "", expiryDate: "", amount: "", status: "Active" });
  };

  // Edit LC
  const saveEdit = () => {
    setLcRecords(lcRecords.map((lc) => (lc.id === selectedLC.id ? selectedLC : lc)));
  };

  // Delete LC
  const deleteLC = (id) => {
    setLcRecords(lcRecords.filter((lc) => lc.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Letter of Credit Management</h2>

      {/* Add New LC Button */}
      <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addLCModal">
        Add New LC
      </button>

      {/* LC Table */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
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
          {lcRecords.map((lc) => (
            <tr key={lc.id}>
              <td>{lc.id}</td>
              <td>{lc.number}</td>
              <td>{lc.customer}</td>
              <td>{lc.issueDate}</td>
              <td>{lc.expiryDate}</td>
              <td>{lc.amount}</td>
              <td>{lc.status}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" data-bs-toggle="modal" data-bs-target="#viewLCModal" onClick={() => setSelectedLC(lc)}>View</button>
                <button className="btn btn-secondary btn-sm me-2" data-bs-toggle="modal" data-bs-target="#editLCModal" onClick={() => setSelectedLC(lc)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteLC(lc.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add LC Modal */}
      <div className="modal fade" id="addLCModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New LC</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input className="form-control mb-2" name="number" placeholder="LC Number" value={newLC.number} onChange={(e) => handleChange(e, true)} />
              <input className="form-control mb-2" name="customer" placeholder="Customer" value={newLC.customer} onChange={(e) => handleChange(e, true)} />
              <input type="date" className="form-control mb-2" name="issueDate" value={newLC.issueDate} onChange={(e) => handleChange(e, true)} />
              <input type="date" className="form-control mb-2" name="expiryDate" value={newLC.expiryDate} onChange={(e) => handleChange(e, true)} />
              <input className="form-control mb-2" name="amount" placeholder="Amount" value={newLC.amount} onChange={(e) => handleChange(e, true)} />
              <button className="btn btn-success w-100" data-bs-dismiss="modal" onClick={addLC}>Add</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit LC Modal */}
      {selectedLC && (
        <div className="modal fade" id="editLCModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit LC</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <input className="form-control mb-2" name="number" value={selectedLC.number} onChange={handleChange} />
                <input className="form-control mb-2" name="customer" value={selectedLC.customer} onChange={handleChange} />
                <input type="date" className="form-control mb-2" name="issueDate" value={selectedLC.issueDate} onChange={handleChange} />
                <input type="date" className="form-control mb-2" name="expiryDate" value={selectedLC.expiryDate} onChange={handleChange} />
                <input className="form-control mb-2" name="amount" value={selectedLC.amount} onChange={handleChange} />
                <button className="btn btn-primary w-100" data-bs-dismiss="modal" onClick={saveEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LC;
