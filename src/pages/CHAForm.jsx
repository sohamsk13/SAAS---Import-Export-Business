import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CHAForm = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  
  const [chaData, setChaData] = useState({
    chaName: 'Mr. Shantanu Divekar',
    chaCompanyName: 'Swarex Shipping & Aviation Pvt Ltd',
    chaLicenseNumber: 'I304038',
    gstNumber: '27ASUPP1534E2ZH',
    address: 'New Airport Rd, Pune International Airport Area, Lohegaon, Pune, Maharashtra 411032',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'INDIA',
    zipCode: '411454',
    phone: '9787867776',
    email: 'shantanu@swarex.com',
    isActiveCHA: true
  });

  const [contacts, setContacts] = useState([
    {
      name: 'John Doe',
      role: 'Manager',
      phone: '0123456789',
      email: 'johndoe@example.com'
    },
    {
      name: 'Jane Smith',
      role: 'Assistant',
      phone: '0987654321',
      email: 'janesmith@example.com'
    }
  ]);

  const [currentContact, setCurrentContact] = useState({
    name: '',
    role: '',
    phone: '',
    email: ''
  });

  const handleChaChange = (e) => {
    const { name, value, type, checked } = e.target;
    setChaData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setCurrentContact(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveCHA = () => {
    console.log('Saving CHA:', chaData);
    // Add API call here
  };

  const handleContactAction = (index = null) => {
    if (index !== null) {
      setCurrentContact(contacts[index]);
      setEditIndex(index);
    } else {
      setCurrentContact({ name: '', role: '', phone: '', email: '' });
      setEditIndex(null);
    }
    setShowContactModal(true);
  };

  const saveContact = () => {
    setContacts(prev => {
      if (editIndex !== null) {
        return prev.map((contact, i) => i === editIndex ? currentContact : contact);
      }
      return [...prev, currentContact];
    });
    setShowContactModal(false);
  };

  const deleteContact = (index) => {
    setContacts(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">CHA Management</h1>

      {/* CHA Form */}
      <Form className="mb-3" id="chaForm">
        {[
          { id: 'chaName', label: 'CHA Name', required: true },
          { id: 'chaCompanyName', label: 'Company Name' },
          { id: 'chaLicenseNumber', label: 'License Number', required: true },
          { id: 'gstNumber', label: 'GST Number' },
          { id: 'address', label: 'Address' },
          { id: 'city', label: 'City' },
          { id: 'state', label: 'State' },
          { id: 'country', label: 'Country' },
          { id: 'zipCode', label: 'Zip Code' },
          { id: 'phone', label: 'Phone' },
          { id: 'email', label: 'Email', type: 'email' }
        ].map((field) => (
          <Form.Group key={field.id} className="mb-3">
            <Form.Label htmlFor={field.id}>{field.label}</Form.Label>
            <Form.Control
              type={field.type || 'text'}
              id={field.id}
              name={field.id}
              value={chaData[field.id]}
              onChange={handleChaChange}
              required={field.required}
            />
          </Form.Group>
        ))}

        <Form.Check
          type="checkbox"
          id="isActiveCHA"
          label="Active"
          checked={chaData.isActiveCHA}
          onChange={handleChaChange}
          className="mb-3"
        />

        <Button variant="primary" onClick={saveCHA}>
          Save CHA
        </Button>
      </Form>

      {/* Contacts Management */}
      <h2>Contacts</h2>
      <Button 
        variant="primary" 
        className="mb-3" 
        onClick={() => handleContactAction()}
      >
        Add Contact
      </Button>

      <table className="table">
        <thead>
          <tr>
            <th>Contact Name</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.role}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
              <td>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleContactAction(index)}
                >
                  Edit
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => deleteContact(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Contact Modal */}
      <Modal 
        show={showContactModal} 
        onHide={() => {
          setShowContactModal(false);
          setCurrentContact({ name: '', role: '', phone: '', email: '' });
          setEditIndex(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editIndex !== null ? 'Edit' : 'Add'} Contact
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {[
              { id: 'name', label: 'Contact Name', required: true },
              { id: 'role', label: 'Role' },
              { id: 'phone', label: 'Phone' },
              { id: 'email', label: 'Email', type: 'email' }
            ].map((field) => (
              <Form.Group key={field.id} className="mb-3">
                <Form.Label htmlFor={field.id}>{field.label}</Form.Label>
                <Form.Control
                  type={field.type || 'text'}
                  id={field.id}
                  name={field.id}
                  value={currentContact[field.id]}
                  onChange={handleContactChange}
                  required={field.required}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => {
              setShowContactModal(false);
              setCurrentContact({ name: '', role: '', phone: '', email: '' });
              setEditIndex(null);
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={saveContact}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CHAForm;