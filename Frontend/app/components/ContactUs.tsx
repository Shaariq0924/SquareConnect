"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import "../styles/contact.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMsg("Thank you! We'll get back to you shortly.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMsg("Failed to connect to server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page" id="contact-page">
      {/* Hero Banner */}
      <section className="contact-hero" id="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Contact <span className="heading-highlight">SquareConnect</span></h1>
          <p className="contact-hero-subtitle">
            Get in touch with the right team for faster assistance
          </p>
        </div>
      </section>

      {/* Contact Body */}
      <section className="contact-body" id="contact-body">
        <div className="contact-body-container">
          {/* Left - Contact Info */}
          <div className="contact-info" id="contact-info">
            <h2 className="contact-info-title"><span className="heading-highlight">Contact</span> Us</h2>

            <div className="contact-info-cards">
              <div className="contact-card" id="contact-card-phone">
                <div className="contact-card-icon">
                  <Phone size={22} />
                </div>
                <div className="contact-card-details">
                  <h3>Phone</h3>
                  <a href="tel:+619666660834">+61 423699909</a>
                </div>
              </div>

              <div className="contact-card" id="contact-card-email">
                <div className="contact-card-icon">
                  <Mail size={22} />
                </div>
                <div className="contact-card-details">
                  <h3>Email</h3>
                  <a href="mailto:info@squareconnect.com.au">
                    info@squareconnect.com.au
                  </a>
                </div>
              </div>

              <div className="contact-card" id="contact-card-location">
                <div className="contact-card-icon">
                  <MapPin size={22} />
                </div>
                <div className="contact-card-details">
                  <h3>Location</h3>
                  <p>Sydney, Australia</p>
                </div>
              </div>

              <div className="contact-card" id="contact-card-hours">
                <div className="contact-card-icon">
                  <Clock size={22} />
                </div>
                <div className="contact-card-details">
                  <h3>Working Hours</h3>
                  <p>24/7 Available</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper" id="contact-form-wrapper">
            <h2 className="contact-form-title">Get In <span className="heading-highlight">Touch</span></h2>
            {successMsg && <div className="p-4 mb-4 text-green-800 bg-green-100 rounded-lg">{successMsg}</div>}
            {errorMsg && <div className="p-4 mb-4 text-red-800 bg-red-100 rounded-lg">{errorMsg}</div>}
            <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    id="input-first-name"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    id="input-last-name"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="input-email"
                    placeholder="Enter Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    id="input-phone"
                    placeholder="Enter Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <select
                  name="subject"
                  id="input-subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Subject
                  </option>
                  <option value="airport-transfer">Airport Transfer</option>
                  <option value="day-tours">Day Tours</option>
                  <option value="hotel-tourist">Hotel &amp; Tourist</option>
                  <option value="hospital-transfer">Hospital Transfer</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  id="input-message"
                  placeholder="Write your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="form-submit-btn" id="btn-submit-contact" disabled={isSubmitting}>
                <Send size={18} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
