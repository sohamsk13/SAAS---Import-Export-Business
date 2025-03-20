import { useState } from "react";
import { Tab, Nav, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TenantManagement = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);

  // Tenant Info with Predefined Values
  const [tenantInfo, setTenantInfo] = useState({
    tenantName: "ABC Corp",
    tenantCode: "ABC123",
    iecCode: "IEC987654",
    gstNumber: "GSTIN123456",
  });

  // Contacts & Banks
  const [contacts, setContacts] = useState([
    { id: 1, name: "John Doe", phone: "9876543210", email: "john@example.com" }
  ]);

  const [banks, setBanks] = useState([
    { id: 1, bankName: "HDFC Bank", accountNumber: "1234567890", ifscCode: "HDFC0001234" }
  ]);

  // New Contact & Bank State
  const [newContact, setNewContact] = useState({ name: "", phone: "", email: "" });
  const [newBank, setNewBank] = useState({ bankName: "", accountNumber: "", ifscCode: "" });

  // Handle Input Changes
  const handleTenantChange = (e) => {
    const { name, value } = e.target;
    setTenantInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewContactChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewBankChange = (e) => {
    const { name, value } = e.target;
    setNewBank((prev) => ({ ...prev, [name]: value }));
  };

  // Save Tenant Info
  const saveTenant = () => {
    alert("✅ Tenant info saved successfully!");
  };

  // Add New Contact
  const saveContact = () => {
    if (newContact.name && newContact.phone && newContact.email) {
      setContacts([...contacts, { ...newContact, id: Date.now() }]);
      setShowContactModal(false);
      setNewContact({ name: "", phone: "", email: "" });
    } else {
      alert("❌ Please fill in all contact details.");
    }
  };

  // Add New Bank
  const saveBank = () => {
    if (newBank.bankName && newBank.accountNumber && newBank.ifscCode) {
      setBanks([...banks, { ...newBank, id: Date.now() }]);
      setShowBankModal(false);
      setNewBank({ bankName: "", accountNumber: "", ifscCode: "" });
    } else {
      alert("❌ Please fill in all bank details.");
    }
  };

  // Delete Contact
  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  // Delete Bank
  const deleteBank = (id) => {
    setBanks(banks.filter((bank) => bank.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Tenant Management</h1>

      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="home">Tenant Info</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="contacts">Contacts</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="banks">Banks</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          {/* Tenant Info Tab */}
          <Tab.Pane eventKey="home">
            <Form className="p-3">
              {["tenantName", "tenantCode", "iecCode", "gstNumber"].map((field) => (
                <Form.Group key={field} className="mb-3">
                  <Form.Label>{field.replace(/([A-Z])/g, " $1").trim()}</Form.Label>
                  <Form.Control
                    name={field}
                    value={tenantInfo[field]}
                    onChange={handleTenantChange}
                  />
                </Form.Group>
              ))}
              <Button variant="primary" onClick={saveTenant}>
                Save Tenant
              </Button>
            </Form>
          </Tab.Pane>

          {/* Contacts Tab */}
          <Tab.Pane eventKey="contacts">
            <Button variant="primary" className="m-3" onClick={() => setShowContactModal(true)}>
              Add Contact
            </Button>
            <ul className="list-group">
              {contacts.map((contact) => (
                <li key={contact.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {contact.name} - {contact.phone} ({contact.email})
                  <Button variant="danger" size="sm" onClick={() => deleteContact(contact.id)}>
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </Tab.Pane>

          {/* Banks Tab */}
          <Tab.Pane eventKey="banks">
            <Button variant="primary" className="m-3" onClick={() => setShowBankModal(true)}>
              Add Bank
            </Button>
            <ul className="list-group">
              {banks.map((bank) => (
                <li key={bank.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {bank.bankName} - {bank.accountNumber} ({bank.ifscCode})
                  <Button variant="danger" size="sm" onClick={() => deleteBank(bank.id)}>
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      {/* Contact Modal */}
      <Modal show={showContactModal} onHide={() => setShowContactModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["name", "phone", "email"].map((field) => (
              <Form.Group key={field} className="mb-3">
                <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                <Form.Control
                  name={field}
                  value={newContact[field]}
                  onChange={handleNewContactChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowContactModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveContact}>
            Save Contact
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Bank Modal */}
      <Modal show={showBankModal} onHide={() => setShowBankModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Bank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["bankName", "accountNumber", "ifscCode"].map((field) => (
              <Form.Group key={field} className="mb-3">
                <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                <Form.Control
                  name={field}
                  value={newBank[field]}
                  onChange={handleNewBankChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBankModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveBank}>
            Save Bank
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TenantManagement;
