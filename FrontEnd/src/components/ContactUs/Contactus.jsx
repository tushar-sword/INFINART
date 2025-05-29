import React from "react";
import "./ContactUs.css";
import { MdMessage } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ContactUs = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const message = e.target[2].value;

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    
    // Reset the form
    e.target.reset();
  }
  return (
    <div className="contact-container">
      <h1>CONTACT US</h1>
      <p className="contact-subtitle">
        "Let’s connect—reach out anytime via the contact form, phone, or email!"
       </p>
      <div className="contact-actions">
        <button className="chat-btn"><MdMessage /> VIA SUPPORT CHAT</button>
        
        <button className="call-btn"><FaPhoneAlt /> VIA CALL</button>
      
        <button className="email-btn"><MdEmail /> VIA EMAIL FORM</button>
      </div>
   
    < form onSubmit={(e) => handleSubmit(e)}>
      <div className="contact-info">
        <div className="info-item">
        <h3>24/7 Service</h3>
          <p>We are here to help you anytime, anywhere.</p>
        </div>
        <div className="info-item">
          
          <h3>Call Us</h3>
          <p>+1 234 567 890</p>
        </div>
        <div className="info-item">
        
          <h3>Email Us</h3>
          <p>Infinart@gmail.com</p>
          </div>
     </div>
      </form>
     
    <div className="contact-form-section">
      <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name</label>
    
          <input type="text" placeholder="Enter your name" required />

          <label>E-Mail</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Text</label>
        <textarea rows="6" placeholder="Enter your message" required ></textarea>
    
          <button type="submit" className="submit-btn">SUBMIT</button>
        </form>

       

        <div className="contact-image">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy223LVB9d_SUkmgscJtHPhBPrT_00gHyzA2Y3FQ1j4rLeOnth2GgccjuJeqeejx9QPLw&usqp=CAU" alt="24/7 Service" />
        </div>
      </div>
    </div>
  );
  
};

export default ContactUs;