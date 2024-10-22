import React, { useState } from 'react';
import './App.css';
import image from "./assets/image.jpg";

function App() {
  // Initialize state to store the contacts
  const [contacts, setContacts] = useState([
    {
      id: 1,
      firstName: "Jack",
      lastName: "John",
      email: "jackjohn@gmail.com",
      phone: "0712345678",
      disabled: false,
    },
  ]);

  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  // Add new contact
  const addContact = (e) => {
    e.preventDefault();
    const contact = { ...newContact, id: Date.now(), disabled: false };
    setContacts([...contacts, contact]);
    setNewContact({ firstName: "", lastName: "", email: "", phone: "" }); // Reset form
  };

  // Delete contact
  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  // Disable contact
  const disableContact = (id) => {
    setContacts(
      contacts.map(contact =>
        contact.id === id ? { ...contact, disabled: !contact.disabled } : contact
      )
    );
  };

  // Update contact (For simplicity, we'll use the same form for adding and updating)
  const [isEditing, setIsEditing] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  const startEditing = (contact) => {
    setIsEditing(true);
    setCurrentContact(contact);
    setNewContact(contact);
  };

  const updateContact = (e) => {
    e.preventDefault();
    setContacts(
      contacts.map(contact =>
        contact.id === currentContact.id ? { ...newContact } : contact
      )
    );
    setIsEditing(false);
    setNewContact({ firstName: "", lastName: "", email: "", phone: "" });
  };

  return (
    <>
      <div className='contact-details'>
        <h2>{isEditing ? "Update Contact" : "Add Contact"}</h2>
        <form onSubmit={isEditing ? updateContact : addContact}>
          <input
            type="text"
            placeholder="Enter your first name"
            name="firstName"
            value={newContact.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Enter your last name"
            name="lastName"
            value={newContact.lastName}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            placeholder="Enter your email address"
            name="email"
            value={newContact.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            placeholder="Enter your phone number"
            name="phone"
            value={newContact.phone}
            onChange={handleInputChange}
            required
          />
          <input type="submit" value={isEditing ? "Update Contact" : "Add Contact"} />
        </form>
      </div>

      <h1 className='heading'>Contacts</h1>

      {contacts.map(contact => (
        <div className='contact-card' key={contact.id}>
          <div className='details'>
            <img
              src={image}
              alt="contact logo"
              style={{ width: '70px', height: '70px', boxShadow: '10px 4px 20px rgba(0, 0, 0, 0.3)' }}
            />
            <div>
              <h3 style={{ textDecoration: contact.disabled ? 'line-through' : 'none' }}>
                {contact.firstName} {contact.lastName}
              </h3>
              <h3>{contact.email}</h3>
              <h3>{contact.phone}</h3>
            </div>
          </div>

          <div className='button'>
            <button onClick={() => startEditing(contact)}>Update</button>
            <button onClick={() => deleteContact(contact.id)}>Delete</button>
            <button onClick={() => disableContact(contact.id)}>
              {contact.disabled ? "Enable" : "Disable"}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;



