import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/styles/user/AddNewContact.css";
import {  useNavigate } from "react-router-dom";
import AddNewContactModal from "./NewContactModal";

const AddNewContactPage: React.FC = () => {
  const navigate= useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contacts = [
    { name: "Me (You)", message: "Message yourself", img: "/path/to/avatar1.jpg" },
    { name: "Aatmarth B", message: "🍕💎", img: "/path/to/avatar2.jpg" },
    { name: "Abhijith Newmans", message: "", img: "/path/to/avatar3.jpg" },
    { name: "Abhishna Newmans", message: "𝒷𝑒𝓁𝓁𝑒 𝒶𝓂𝑒🤍", img: "/path/to/avatar4.jpg" },
    { name: "Achayans Auto Pickup Manoj", message: "", img: "/path/to/avatar5.jpg" },
    { name: "Adarsh", message: "Hey there! I am using WhatsApp.", img: "/path/to/avatar6.jpg" },
    { name: "Adarsh Roommate", message: "Software Engineer", img: "/path/to/avatar7.jpg" },
  ];


  const addNewUser=()=>{
    console.log('hello');
    
setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveContact = (contactData: { name: string; phoneNumber: string }) => {
    console.log("Contact saved:", contactData);
    closeModal(); 
  };

  return (
    <div className="AddNewContactPage-container">
      {/* Header */}
      <div className="AddNewContactPage-header d-flex align-items-center">
        <button className="btn btn-link AddNewContactPage-backButton" onClick={()=>navigate('/Home')}>
          ←
        </button>
        <h5 className="AddNewContactPage-title flex-grow-1">Select contact</h5>
        <button className="btn btn-link">
          🔍
        </button>
        <button className="btn btn-link">
          ⋮
        </button>
      </div>

      {/* Options */}
      <div className="AddNewContactPage-options">
        <div className="AddNewContactPage-option">
          <span className="AddNewContactPage-icon">👥</span> New group
        </div>
        <div className="AddNewContactPage-option" onClick={addNewUser}>
      
         <span  className="AddNewContactPage-icon">➕</span> New contact
        
        </div>
        <div className="AddNewContactPage-option">
          <span className="AddNewContactPage-icon">🌍</span> New community
        </div>
        <div className="AddNewContactPage-option">
          <span className="AddNewContactPage-icon">💬</span> Chat with AIs
        </div>
      </div>

      {/* Contacts List */}
      <h6 className="AddNewContactPage-subtitle">Contacts on WhatsApp</h6>
      <div className="AddNewContactPage-contacts">
        {contacts.map((contact, index) => (
          <div key={index} className="AddNewContactPage-contact d-flex align-items-center">
            <img src={contact.img} alt={contact.name} className="AddNewContactPage-avatar" />
            <div>
              <p className="AddNewContactPage-contactName">{contact.name}</p>
              <p className="AddNewContactPage-contactMessage">{contact.message}</p>
            </div>
          </div>
        ))}
      </div>

       {/* Modal (Rendered Separately) */}
       {isModalOpen && (
        <AddNewContactModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveContact}
        />
      )}
    </div>
  );
};

export default AddNewContactPage;
