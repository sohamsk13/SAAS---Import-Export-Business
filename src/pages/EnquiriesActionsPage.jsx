import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const EnquiriesActionsPage = () => {
    const [enquiries, setEnquiries] = useState([
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1 555-1234', country: 'USA', status: 'New', details: 'Product Inquiry', date: '2025-01-20' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+44 20 7946 0958', country: 'UK', status: 'Pending', details: 'Shipping Details', date: '2025-01-19' },
    ]);

    const [modalData, setModalData] = useState(null);
    
    const handleEdit = (enquiry) => {
        setModalData(enquiry);
    };
    
    const handleView = (enquiry) => {
        setModalData(enquiry);
    };
    
    const handleSave = () => {
        console.log('Saving data:', modalData);
        setModalData(null);
    };

    return (
        <div className="container mt-5">
            <h1>International Enquiries Management</h1>
            <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#enquiryModal">
                Add Enquiry
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Enquiry ID</th>
                        <th>Enquirer Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Country</th>
                        <th>Status</th>
                        <th>Details</th>
                        <th>Date Received</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {enquiries.map((enquiry) => (
                        <tr key={enquiry.id}>
                            <td>{enquiry.id}</td>
                            <td>{enquiry.name}</td>
                            <td>{enquiry.email}</td>
                            <td>{enquiry.phone}</td>
                            <td>{enquiry.country}</td>
                            <td>{enquiry.status}</td>
                            <td>{enquiry.details}</td>
                            <td>{enquiry.date}</td>
                            <td>
                                <button className="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#enquiryModal" onClick={() => handleView(enquiry)}>View</button>
                                <button className="btn btn-primary btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#enquiryModal" onClick={() => handleEdit(enquiry)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal for Viewing/Editing Enquiries */}
            <div className="modal fade" id="enquiryModal" tabIndex="-1" aria-labelledby="enquiryModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="enquiryModalLabel">{modalData ? 'Edit Enquiry' : 'Add Enquiry'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {modalData && (
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Enquirer Name</label>
                                        <input type="text" className="form-control" value={modalData.name} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Enquirer Email</label>
                                        <input type="email" className="form-control" value={modalData.email} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Enquirer Phone</label>
                                        <input type="text" className="form-control" value={modalData.phone} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Country</label>
                                        <input type="text" className="form-control" value={modalData.country} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Inquiry Details</label>
                                        <textarea className="form-control" value={modalData.details} readOnly></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Date Received</label>
                                        <input type="date" className="form-control" value={modalData.date} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <input type="text" className="form-control" value={modalData.status} readOnly />
                                    </div>
                                </form>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {modalData && <button type="button" className="btn btn-primary" onClick={handleSave}>Save Changes</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnquiriesActionsPage;
