import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const EmployeeManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [employeeData, setEmployeeData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        isActive: true
    });
    const [employees, setEmployees] = useState([
        {
            id: 1,
            firstName: 'Dinesh',
            lastName: 'Nanaware',
            email: 'dinesh@example.com',
            phone: '0123456789',
            isActive: true
        },
        {
            id: 2,
            firstName: 'Jagdish',
            lastName: 'Dixit',
            email: 'jagdish@example.com',
            phone: '9876543210',
            isActive: true
        }
    ]);

    const saveEmployee = () => {
        if (employeeData.id) {
            // Edit existing employee
            setEmployees((prevEmployees) =>
                prevEmployees.map((emp) =>
                    emp.id === employeeData.id ? employeeData : emp
                )
            );
        } else {
            // Add new employee
            const newEmployee = {
                ...employeeData,
                id: employees.length + 1, // Auto-increment ID
            };
            setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
        }
        setShowModal(false); // Close modal after saving
        setEmployeeData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            isActive: true
        }); // Reset employee data
    };

    const editEmployee = (id) => {
        const employee = employees.find((emp) => emp.id === id);
        setEmployeeData(employee);
        setShowModal(true); // Open modal when editing
    };

    const deleteEmployee = (id) => {
        setEmployees((prevEmployees) =>
            prevEmployees.filter((emp) => emp.id !== id)
        );
    };

    const handleInputChange = (e) => {
        const { id, value, checked, type } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Employee Management</h1>

            {/* Button to trigger modal for adding new employee */}
            <button type="button" className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
                Add Employee
            </button>

            {/* Employee Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} aria-labelledby="employeeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="employeeModalLabel">Add/Edit Employee</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form id="employeeForm">
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="firstName" value={employeeData.firstName} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="lastName" value={employeeData.lastName} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" value={employeeData.email} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input type="text" className="form-control" id="phone" value={employeeData.phone} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="isActive" checked={employeeData.isActive} onChange={handleInputChange} />
                                        <label className="form-check-label" htmlFor="isActive">Active</label>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={saveEmployee}>Save Employee</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Table to display Employees */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.isActive ? 'Active' : 'Inactive'}</td>
                            <td>
                                <button className="btn btn-secondary btn-sm" onClick={() => editEmployee(employee.id)}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeManagement;
