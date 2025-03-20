import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Department = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Human Resources", description: "Handles hiring and administration.", isActive: true },
    { id: 2, name: "Finance", description: "Manages company finances and budgeting.", isActive: true }
  ]);

  const [currentDepartment, setCurrentDepartment] = useState({ id: null, name: "", description: "", isActive: true });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentDepartment({
      ...currentDepartment,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveDepartment = () => {
    if (currentDepartment.id) {
      setDepartments(
        departments.map((dept) => (dept.id === currentDepartment.id ? currentDepartment : dept))
      );
    } else {
      setDepartments([...departments, { ...currentDepartment, id: departments.length + 1 }]);
    }
    setCurrentDepartment({ id: null, name: "", description: "", isActive: true });
  };

  const editDepartment = (id) => {
    const department = departments.find((dept) => dept.id === id);
    setCurrentDepartment(department);
  };

  const deleteDepartment = (id) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Department Management</h1>
      <button
        type="button"
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#departmentModal"
        onClick={() => setCurrentDepartment({ id: null, name: "", description: "", isActive: true })}
      >
        Add Department
      </button>

      <div className="modal fade" id="departmentModal" tabIndex="-1" aria-labelledby="departmentModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="departmentModalLabel">Add/Edit Department</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Department Name</label>
                  <input type="text" className="form-control" name="name" value={currentDepartment.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" name="description" rows="3" value={currentDepartment.description} onChange={handleInputChange}></textarea>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" name="isActive" checked={currentDepartment.isActive} onChange={handleInputChange} />
                  <label className="form-check-label">Active</label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={saveDepartment}>Save Department</button>
            </div>
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td>{dept.id}</td>
              <td>{dept.name}</td>
              <td>{dept.description}</td>
              <td>{dept.isActive ? "Active" : "Inactive"}</td>
              <td>
                <button className="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#departmentModal" onClick={() => editDepartment(dept.id)}>Edit</button>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => deleteDepartment(dept.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Department;
