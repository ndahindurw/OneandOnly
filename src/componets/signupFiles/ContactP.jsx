import React from 'react';
import './ContactPage.scss';
import Navbar from '../navigationBar/navbar';

const ContactP = () => {
  console.log("hereeeeeee am i  Lord  speak you servant  is hearing ")
  return (
    <div>
      <Navbar/>
      <div className="contact-container">
      <h1>Contact Us</h1>
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default ContactP;
