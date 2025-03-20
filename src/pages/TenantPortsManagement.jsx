import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";

const TenantPortsManagement = () => {
  const navigate = useNavigate();

  // Initialize ports with predefined values or from localStorage
  const [ports, setPorts] = useState(() => {
    const savedPorts = localStorage.getItem("ports");
    return savedPorts
      ? JSON.parse(savedPorts)
      : [
          { id: 1, name: "Mumbai Port", code: "INBOM", country: "India", state: "Maharashtra", active: true },
          { id: 2, name: "Chennai Port", code: "INMAA", country: "India", state: "Tamil Nadu", active: true },
        ];
  });
     
  const [portData, setPortData] = useState({ id: null, name: "", code: "", country: "", state: "", active: false });
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Save ports to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("ports", JSON.stringify(ports));
  }, [ports]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPortData({ ...portData, [name]: type === "checkbox" ? checked : value });
  };

  const openAddModal = () => {
    setPortData({ id: null, name: "", code: "", country: "", state: "", active: false });
    setEditMode(false);
    setShowModal(true);
  };

  const openEditModal = (port) => {
    setPortData(port);
    setEditMode(true);
    setShowModal(true);
  };

  const savePort = () => {
    if (editMode) {
      setPorts((prevPorts) => prevPorts.map((p) => (p.id === portData.id ? portData : p)));
    } else {
      setPorts([...ports, { ...portData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const deletePort = (id) => {
    if (window.confirm("Are you sure you want to delete this port?")) {
      setPorts(ports.filter((port) => port.id !== id));
    }
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/")}>
        Back to Home
      </button>

      <h1 className="mb-4">Tenant Ports Management</h1>
      <button className="btn btn-primary mb-3" onClick={openAddModal}>
        Add Port
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Port Name</th>
            <th>Port Code</th>
            <th>Country</th>
            <th>State</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ports.map((port) => (
            <tr key={port.id}>
              <td>{port.name}</td>
              <td>{port.code}</td>
              <td>{port.country}</td>
              <td>{port.state}</td>
              <td>{port.active ? "Yes" : "No"}</td>
              <td>
                <button className="btn btn-secondary btn-sm me-2" onClick={() => openEditModal(port)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => deletePort(port.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" aria-hidden="true" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editMode ? "Edit Port" : "Add Port"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Port Name</label>
                    <input type="text" className="form-control" name="name" value={portData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Port Code</label>
                    <input type="text" className="form-control" name="code" value={portData.code} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Country</label>
                    <input type="text" className="form-control" name="country" value={portData.country} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" name="state" value={portData.state} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" name="active" checked={portData.active} onChange={handleInputChange} />
                    <label className="form-check-label">Active</label>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={savePort}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantPortsManagement;
