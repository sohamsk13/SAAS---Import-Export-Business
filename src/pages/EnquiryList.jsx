import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const enquiries = [
    { id: 1, name: "John Doe", details: "Exporting machinery", date: "2025-01-01" },
    { id: 2, name: "Jane Smith", details: "Agricultural products", date: "2025-01-02" },
    { id: 3, name: "Michael Brown", details: "Shipping rates", date: "2025-01-03" },
];

const EnquiryList = () => {
    const navigate = useNavigate();

    const trackEnquiry = (enquiryId) => {
        navigate(`/tracking/${enquiryId}`);
    };

    const downloadEnquiry = (enquiry) => {
        const jsonData = JSON.stringify(enquiry, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Enquiry_${enquiry.id}.json`;
        link.click();
    };

    return (
        <div className="container mt-5">
            <h1>Enquiry List</h1>
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
                                <button className="btn btn-secondary btn-sm me-2" onClick={() => trackEnquiry(enquiry.id)}>
                                    Track
                                </button>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => trackEnquiry(enquiry.id)}>
                                    Update Status
                                </button>
                                <button className="btn btn-success btn-sm" onClick={() => downloadEnquiry(enquiry)}>
                                    Download
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnquiryList;
