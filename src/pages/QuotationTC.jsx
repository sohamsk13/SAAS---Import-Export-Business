import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const QuotationTC = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: "TC-2025/2",
      content: [
        "1. All above offered prices are based on FOB (Any port in INDIA)",
        "2. Payment terms: Advance",
        "3. Packing - Export standard Packing",
        "4. Delivery time: 20 to 25 days",
        "5. Price validity: 15 days",
        "6. Third party inspection Charges applicable extra",
        "7. Free sample can be provided on request. Freight charges will be paid by Buyer (PayPal)",
      ],
      active: true,
    },
    {
      id: 2,
      title: "TC-2025/1",
      content: [
        "1. All above offered prices are based on CNF-CIF (Port of Destination)",
        "2. Payment terms: Telegraph Transfer",
        "3. Packing - Export standard Packing",
        "4. Delivery time: 20 to 25 days",
        "5. Price validity: 15 days",
        "6. Third party inspection Charges applicable extra",
        "7. Free sample can be provided on request. Freight charges will be paid by Buyer (PayPal)",
      ],
      active: true,
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [editId, setEditId] = useState(null);

  const saveTemplate = () => {
    if (editId !== null) {
      setTemplates(
        templates.map((template) =>
          template.id === editId
            ? { ...template, title: newTitle, content: newContent.split("\n"), active: isActive }
            : template
        )
      );
      setEditId(null);
    } else {
      setTemplates([
        ...templates,
        { id: templates.length + 1, title: newTitle, content: newContent.split("\n"), active: isActive },
      ]);
    }
    setNewTitle("");
    setNewContent("");
    setIsActive(true);
  };

  const editTemplate = (template) => {
    setEditId(template.id);
    setNewTitle(template.title);
    setNewContent(template.content.join("\n"));
    setIsActive(template.active);
  };

  const deleteTemplate = (id) => {
    setTemplates(templates.filter((template) => template.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1>Quotation Terms and Conditions Templates</h1>
      <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addTermsModal">
        {editId ? "Edit Template" : "Add New Template"}
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td>{template.id}</td>
              <td>{template.title}</td>
              <td>
                <ul>
                  {template.content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </td>
              <td>{template.active ? "Yes" : "No"}</td>
              <td>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => editTemplate(template)}
                  data-bs-toggle="modal"
                  data-bs-target="#addTermsModal"
                >
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteTemplate(template.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="modal fade" id="addTermsModal" tabIndex="-1" aria-labelledby="addTermsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTermsModalLabel">{editId ? "Edit Terms and Conditions Template" : "Add New Terms and Conditions Template"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="termsTitle" className="form-label">Terms Title</label>
                  <input type="text" className="form-control" id="termsTitle" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="termsContent" className="form-label">Terms Content</label>
                  <textarea className="form-control" id="termsContent" rows="5" value={newContent} onChange={(e) => setNewContent(e.target.value)} required></textarea>
                </div>
                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                  <label className="form-check-label" htmlFor="isActive">Active</label>
                </div>
                <button type="button" className="btn btn-primary" onClick={saveTemplate} data-bs-dismiss="modal">{editId ? "Update Template" : "Save Template"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationTC;
