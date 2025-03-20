import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ActionForm = () => {
  // Initial data states
  const [enquiries] = useState([
    { id: 5, name: "Li Wei", details: "Product Catalog Request", date: "2025-01-16" },
    { id: 6, name: "Aisha Ibrahim", details: "Quotation Request for Organic Jaggery", date: "2025-01-15" },
    { id: 7, name: "Michael Brown", details: "Export Terms for Turmeric", date: "2025-01-14" },
    { id: 8, name: "Emma Wilson", details: "Packaging Details for Banana Shipment", date: "2025-01-13" },
    { id: 9, name: "Omar Ali", details: "Logistics Inquiry for Jaggery Export", date: "2025-01-12" },
    { id: 10, name: "Sophia Laurent", details: "Quality Standards for Turmeric", date: "2025-01-11" },
  ]);

  const [actions, setActions] = useState([
    { id: 1, enquiryId: 5, description: "Prepare quotation for Jaggery export", scheduledDate: "2025-01-15", status: "Completed" },
    { id: 2, enquiryId: 5, description: "Contact shipping company for rates", scheduledDate: "2025-01-16", status: "Completed" },
    { id: 3, enquiryId: 6, description: "Confirm payment terms with the client", scheduledDate: "2025-01-17", status: "Pending" },
    { id: 4, enquiryId: 7, description: "Schedule inspection for Turmeric shipment", scheduledDate: "2025-01-18", status: "In Progress" },
  ]);

  const [selectedEnquiryId, setSelectedEnquiryId] = useState(null);
  const [newAction, setNewAction] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [filteredActions, setFilteredActions] = useState([]);

  // Function to open the add action modal
  const openActionForm = (enquiryId) => {
    setSelectedEnquiryId(enquiryId);
    setNewAction("");
    setScheduledDate("");
    setShowAddModal(true);
  };

  // Function to view actions for an enquiry
  const viewActions = (enquiryId) => {
    const actionsForEnquiry = actions.filter((action) => action.enquiryId === enquiryId);
    setFilteredActions(actionsForEnquiry);
    setShowViewModal(true);
  };

  // Function to handle adding a new action
  const handleAddAction = () => {
    if (newAction.trim() === "" || scheduledDate.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }
    const newEntry = {
      id: actions.length + 1,
      enquiryId: selectedEnquiryId,
      description: newAction,
      scheduledDate,
      status: "Pending",
    };
    setActions([...actions, newEntry]);
    setShowAddModal(false);
  };

  return (
    <div className="container mt-5">
      <h1>Enquiry Management</h1>
      <table className="table table-striped">
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
                <button className="btn btn-primary btn-sm" onClick={() => openActionForm(enquiry.id)}>
                  Add Action
                </button>
                <button className="btn btn-info btn-sm ms-2" onClick={() => viewActions(enquiry.id)}>
                  View Actions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Action Modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Action for Enquiry #{selectedEnquiryId}</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                <label>Action Description:</label>
                <input type="text" className="form-control" value={newAction} onChange={(e) => setNewAction(e.target.value)} />
                <label className="mt-2">Scheduled Date:</label>
                <input type="date" className="form-control" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={handleAddAction}>Save Action</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Actions Modal */}
      {showViewModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Actions for Enquiry #{filteredActions[0]?.enquiryId}</h5>
                <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
              </div>
              <div className="modal-body">
                {filteredActions.length > 0 ? (
                  <ul className="list-group">
                    {filteredActions.map((action) => (
                      <li key={action.id} className="list-group-item">
                        <strong>{action.description}</strong><br />
                        <span>Scheduled: {action.scheduledDate}</span><br />
                        <span>Status: {action.status}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No actions found for this enquiry.</p>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionForm;
