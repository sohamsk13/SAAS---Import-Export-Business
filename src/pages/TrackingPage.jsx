import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const TrackingPage = () => {
    const [trackingData, setTrackingData] = useState({
        enquiryID: "",
        stepNo: "",
        stepName: "",
    });

    const [checklist, setChecklist] = useState([
        {
            taskNo: 1,
            taskName: "Enquiry",
            status: "Pending",
            assignedTo: 101,
            referenceID: "Ref001",
            isRequiredFile: "1",
            path: "/path/to/file",
        },
    ]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setTrackingData((prev) => ({ ...prev, [id]: value }));
    };

    const addChecklistRow = () => {
        setChecklist([
            ...checklist,
            {
                taskNo: checklist.length + 1,
                taskName: "Enquiry",
                status: "Pending",
                assignedTo: "",
                referenceID: "",
                isRequiredFile: "0",
                path: "",
            },
        ]);
    };

    const removeChecklistRow = (index) => {
        setChecklist(checklist.filter((_, i) => i !== index));
    };

    const handleChecklistChange = (index, field, value) => {
        const updatedChecklist = checklist.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setChecklist(updatedChecklist);
    };

    const saveTracking = () => {
        console.log({ trackingData, checklist });
        alert("Tracking data saved successfully!");
    };

    const trackEnquiry = (enquiry) => {
        alert(`Tracking Enquiry ID: ${enquiry.id}, Name: ${enquiry.name}`);
    };

    const downloadEnquiry = (enquiry) => {
        const jsonData = JSON.stringify(enquiry, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Enquiry_${enquiry.id}.json`;
        link.click();
    };

    const enquiries = [
        { id: 1, name: "John Doe", details: "Exporting machinery", date: "2025-01-01" },
        { id: 2, name: "Jane Smith", details: "Agricultural products", date: "2025-01-02" },
        { id: 3, name: "Michael Brown", details: "Shipping rates", date: "2025-01-03" },
    ];

    return (
        <div className="container mt-5">
            <h1>Enquiry Tracking Management</h1>
            <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addTrackingModal">
                Add Tracking
            </button>

            {/* Enquiry List Table */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Enquiry ID</th>
                        <th>Enquirer Name</th>
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
                            <td>{enquiry.details}</td>
                            <td>{enquiry.date}</td>
                            <td>
                                <button className="btn btn-secondary btn-sm me-2" onClick={() => trackEnquiry(enquiry)}>
                                    Track
                                </button>
                                <button className="btn btn-warning btn-sm me-2">Update Status</button>
                                <button className="btn btn-success btn-sm" onClick={() => downloadEnquiry(enquiry)}>
                                    Download
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Tracking Modal */}
            <div className="modal fade" id="addTrackingModal" tabIndex="-1" aria-labelledby="addTrackingModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Tracking</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <h5>Tracking Details</h5>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Enquiry ID</label>
                                        <input type="number" className="form-control" id="enquiryID" value={trackingData.enquiryID} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Step Number</label>
                                        <input type="number" className="form-control" id="stepNo" value={trackingData.stepNo} onChange={handleInputChange} required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Step Name</label>
                                    <input type="text" className="form-control" id="stepName" value={trackingData.stepName} onChange={handleInputChange} required />
                                </div>

                                {/* Checklist Section */}
                                <h5>Checklist</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Task No</th>
                                            <th>Task Name</th>
                                            <th>Status</th>
                                            <th>Assigned To</th>
                                            <th>Reference ID</th>
                                            <th>File Required</th>
                                            <th>Path</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {checklist.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input type="number" className="form-control" value={item.taskNo} onChange={(e) => handleChecklistChange(index, "taskNo", e.target.value)} required />
                                                </td>
                                                <td>
                                                    <select className="form-control" value={item.taskName} onChange={(e) => handleChecklistChange(index, "taskName", e.target.value)}>
                                                        <option>Enquiry</option>
                                                        <option>Get Quotation</option>
                                                        <option>Negotiation</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-control" value={item.status} onChange={(e) => handleChecklistChange(index, "status", e.target.value)}>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Completed">Completed</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="number" className="form-control" value={item.assignedTo} onChange={(e) => handleChecklistChange(index, "assignedTo", e.target.value)} />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control" value={item.referenceID} onChange={(e) => handleChecklistChange(index, "referenceID", e.target.value)} />
                                                </td>
                                                <td>
                                                    <select className="form-control" value={item.isRequiredFile} onChange={(e) => handleChecklistChange(index, "isRequiredFile", e.target.value)}>
                                                        <option value="1">Yes</option>
                                                        <option value="0">No</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control" value={item.path} onChange={(e) => handleChecklistChange(index, "path", e.target.value)} />
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger btn-sm" onClick={() => removeChecklistRow(index)}>Remove</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button className="btn btn-primary mt-3" onClick={saveTracking}>Save Tracking</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackingPage;
