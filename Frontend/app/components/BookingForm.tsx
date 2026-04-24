"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import "../styles/booking.css";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    serviceType: "",
    pickupAddress: "",
    dropoffAddress: "",
    pickupDate: "",
    pickupTime: "",
    passengers: "",
    bags: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    babySeat: "no",
    babySeatType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Attempt backend call softly (ignores failure if backend isn't up)
      try {
        await fetch("http://localhost:5000/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } catch (err) {
        console.warn("Backend unavailable, proceeding to WhatsApp anyway.");
      }

      setSubmittedData(formData);
      setIsSuccess(true);

      const message = `*New Booking Request*
*Personal Details*
Name: ${formData.customerName}
Email: ${formData.customerEmail}
Phone: ${formData.customerPhone}

*Trip Details*
Service: ${formData.serviceType}
Pickup: ${formData.pickupAddress}
Dropoff: ${formData.dropoffAddress}
Date: ${formData.pickupDate}
Time: ${formData.pickupTime}
Passengers: ${formData.passengers}
Bags: ${formData.bags}
Baby Seat: ${formData.babySeat === "yes" ? formData.babySeatType : "No"}`;

      const whatsappUrl = `https://wa.me/61423699909?text=${encodeURIComponent(message)}`;

      // Delay to let the user see the success animation layout.
      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 1500);

    } catch (error) {
      console.error("Booking error:", error);
      setErrorMsg("Failed to process booking. Please try again or call us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-page" id="booking-page">
      <div className="booking-container">
        <h1 className="booking-title" id="booking-title">
          Book Now <span className="heading-highlight">SquareConnect Sydney</span>
        </h1>

        <div className="booking-form-card" id="booking-form-card">
          {errorMsg && <div className="p-4 mb-4 text-red-800 bg-red-100 rounded-lg">{errorMsg}</div>}

          {isSuccess ? (
            <div className="success-animation-container flex flex-col items-center justify-center p-8 text-center animate-fade-in">
              <CheckCircle size={80} color="#22c55e" className="animate-bounce" style={{ animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' }} />
              <h2 style={{ fontSize: '24px', fontWeight: 800, marginTop: '20px', color: 'var(--foreground)' }}>Booking Successfully Submitted!</h2>
              <p style={{ fontSize: '16px', color: 'var(--gray-600)', marginTop: '10px' }}>Redirecting to WhatsApp to confirm your ride...</p>
              
              <div className="mt-8 text-left p-6 w-full" style={{ marginTop: '30px', padding: '24px', background: 'var(--gray-50)', borderRadius: '16px', textAlign: 'left', width: '100%', border: '1px solid var(--card-border)' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary)', marginBottom: '16px' }}>Your Booking Details</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
                    <div><span style={{ color: 'var(--gray-500)' }}>Name:</span> <br/><strong style={{ color: 'var(--foreground)' }}>{submittedData?.customerName}</strong></div>
                    <div><span style={{ color: 'var(--gray-500)' }}>Service:</span> <br/><strong style={{ color: 'var(--foreground)' }}>{submittedData?.serviceType}</strong></div>
                    <div><span style={{ color: 'var(--gray-500)' }}>Pickup:</span> <br/><strong style={{ color: 'var(--foreground)' }}>{submittedData?.pickupAddress}</strong></div>
                    <div><span style={{ color: 'var(--gray-500)' }}>Dropoff:</span> <br/><strong style={{ color: 'var(--foreground)' }}>{submittedData?.dropoffAddress}</strong></div>
                    <div><span style={{ color: 'var(--gray-500)' }}>Date/Time:</span> <br/><strong style={{ color: 'var(--foreground)' }}>{submittedData?.pickupDate} at {submittedData?.pickupTime}</strong></div>
                    <div><span style={{ color: 'var(--gray-500)' }}>Passengers:</span> <br/><strong style={{ color: 'var(--foreground)' }}>{submittedData?.passengers}</strong></div>
                  </div>
              </div>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmit} method="POST" id="booking-form">
              {/* Customer Details section */}
              <h3 style={{fontSize:'18px', fontWeight:600, color:'var(--foreground)', marginBottom:'16px'}}>Personal Details</h3>
            
            <div className="form-field-group">
              <label className="form-label" htmlFor="customerName">Full Name <span>*</span></label>
              <input type="text" name="customerName" id="customerName" className="form-input" placeholder="John Doe" value={formData.customerName} onChange={handleChange} required />
            </div>
            
            <div className="form-grid-2">
              <div className="form-field-group">
                <label className="form-label" htmlFor="customerEmail">Email <span>*</span></label>
                <input type="email" name="customerEmail" id="customerEmail" className="form-input" placeholder="john@example.com" value={formData.customerEmail} onChange={handleChange} required />
              </div>
              <div className="form-field-group">
                <label className="form-label" htmlFor="customerPhone">Phone Number <span>*</span></label>
                <input type="tel" name="customerPhone" id="customerPhone" className="form-input" placeholder="+61 XXX XXX XXX" value={formData.customerPhone} onChange={handleChange} required />
              </div>
            </div>

            <h3 style={{fontSize:'18px', fontWeight:600, color:'var(--foreground)', marginBottom:'16px', marginTop:'24px'}}>Trip Details</h3>

            {/* Service Type */}
            <div className="form-field-group">
              <label className="form-label" htmlFor="serviceType">
                Service Type <span>*</span>
              </label>
              <select
                name="serviceType"
                id="serviceType"
                className="form-select"
                value={formData.serviceType}
                onChange={handleChange}
                required
              >
                <option value="">Select Service Type</option>
                <option value="airport-transfer">Airport Transfer</option>
                <option value="day-tours">Day Tours</option>
                <option value="hotel-tourist">Hotel &amp; Tourist</option>
                <option value="hospital-transfer">Hospital Transfer</option>
                <option value="cruise-transfer">Cruise Transfer</option>
              </select>
            </div>

            {/* Pickup Address */}
            <div className="form-field-group">
              <label className="form-label" htmlFor="pickupAddress">
                Pick up Address <span>*</span>
              </label>
              <input
                type="text"
                name="pickupAddress"
                id="pickupAddress"
                className="form-input"
                placeholder="Pickup Address Eg. 202 Elizabeth Street"
                value={formData.pickupAddress}
                onChange={handleChange}
                required
              />
            </div>

            {/* Drop off Address */}
            <div className="form-field-group">
              <label className="form-label" htmlFor="dropoffAddress">
                Dropp off Address <span>*</span>
              </label>
              <input
                type="text"
                name="dropoffAddress"
                id="dropoffAddress"
                className="form-input"
                placeholder="Destination Address Eg. 100 John Street"
                value={formData.dropoffAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-grid-2">
              {/* Pickup Date */}
              <div className="form-field-group">
                <label className="form-label" htmlFor="pickupDate">
                  Pickup Date <span>*</span>
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  id="pickupDate"
                  className="form-input"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Pickup Time */}
              <div className="form-field-group">
                <label className="form-label" htmlFor="pickupTime">
                  Pickup Time <span>*</span>
                </label>
                <input
                  type="time"
                  name="pickupTime"
                  id="pickupTime"
                  className="form-input"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              {/* Passengers */}
              <div className="form-field-group">
                <label className="form-label" htmlFor="passengers">
                  Passengers <span>*</span>
                </label>
                <select
                  name="passengers"
                  id="passengers"
                  className="form-select"
                  value={formData.passengers}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Passengers</option>
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4+">4+ Passengers</option>
                </select>
              </div>

              {/* No of Bags */}
              <div className="form-field-group">
                <label className="form-label" htmlFor="bags">
                  No of Bags <span>*</span>
                </label>
                <select
                  name="bags"
                  id="bags"
                  className="form-select"
                  value={formData.bags}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select No of Bags</option>
                  <option value="0">0 Bags</option>
                  <option value="1">1 Bag</option>
                  <option value="2">2 Bags</option>
                  <option value="3+">3+ Bags</option>
                </select>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Baby Seat */}
              <div className="form-field-group">
                <label className="form-label" htmlFor="babySeat">
                  Need a Baby Seat? <span>*</span>
                </label>
                <select
                  name="babySeat"
                  id="babySeat"
                  className="form-select"
                  value={formData.babySeat}
                  onChange={handleChange}
                  required
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              {/* Baby Seat Type (conditionally required) */}
              {formData.babySeat === 'yes' && (
                <div className="form-field-group">
                  <label className="form-label" htmlFor="babySeatType">
                    Baby Seat Type <span>*</span>
                  </label>
                  <select
                    name="babySeatType"
                    id="babySeatType"
                    className="form-select"
                    value={formData.babySeatType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Seat Type</option>
                    <option value="infant">Infant Carrier (0-6 months)</option>
                    <option value="rear-facing">Rear Facing (6-12 months)</option>
                    <option value="forward-facing">Forward Facing (1-4 years)</option>
                    <option value="booster">Booster Seat (4-7 years)</option>
                  </select>
                </div>
              )}
            </div>

            <button type="submit" className="booking-submit-btn" id="booking-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Book Now"}
            </button>
            </form>
          )}
        </div>

        {/* INFO SECTION */}
        <div className="booking-info-section">
          <div className="booking-intro-text animate-on-scroll">
            <p>
              Looking for a safe and reliable baby seat taxi Sydney? You are in the right place. 
              SquareConnect makes it simple to book your next ride for airport transfers, hospital trips, school runs, or family travel anywhere in Sydney. 
              We provide clean vehicles, child friendly drivers, and fixed fares so you always know what you are paying before you travel.
            </p>
            <p>
              Use the booking form above to share your trip details. Our team will review your request 
              and confirm your booking by SMS or email within minutes. You can relax knowing your ride is ready when you are.
            </p>
          </div>

          <div className="why-choose-booking animate-on-scroll">
            <h2 className="why-choose-title">
              Why Choose <span className="heading-highlight">SquareConnect</span>
            </h2>
            <ul className="why-choose-list">
              <li>
                <strong>Safe baby seat taxis:</strong> Every SquareConnect vehicle includes a baby or child seat that meets Australian safety standards. Choose from rear facing, forward facing, or booster seats depending on your child&apos;s age.
              </li>
              <li>
                <strong>Trusted Sydney drivers:</strong> Our local drivers are trained, licensed, and experienced in handling family transfers. They make sure your trip is smooth, safe, and comfortable from pickup to drop off.
              </li>
              <li>
                <strong>24/7 availability:</strong> We operate day and night for all transfers across Sydney. Whether it is an early morning flight or a late night hospital pickup, we are always available.
              </li>
              <li>
                <strong>Clean and spacious vehicles:</strong> Choose from sedans, SUVs, or vans depending on your group size. Each vehicle is cleaned, sanitised, and checked before every trip.
              </li>
              <li>
                <strong>Instant confirmation:</strong> Once you submit your booking form, you will receive a confirmation message with your fare, driver details, and pickup time.
              </li>
            </ul>
          </div>

          <div className="how-to-book-section animate-on-scroll">
            <h2 className="info-section-title">How to <span className="heading-highlight">Book</span></h2>
            <ol className="how-to-book-list">
              <li>Enter your pickup and drop off locations in the form.</li>
              <li>Add your date, time, and number of passengers.</li>
              <li>Choose the type of baby seat if needed.</li>
              <li>Include special notes such as flight number, luggage details, or extra stops.</li>
              <li>Submit the form and wait for confirmation.</li>
            </ol>
            <p className="call-note">
              You can also call our 24/7 team on <strong>0423 699 909</strong> for direct bookings or quick questions.
            </p>
          </div>

          <div className="fares-info-section animate-on-scroll">
            <h2 className="info-section-title">Fixed <span className="heading-highlight">Fares</span> and Easy Payments</h2>
            <p>
              We provide fixed fares for all Sydney airport transfers and local trips. No hidden charges and all tolls are included. You can pay securely online or directly to the driver. Card payments include a small fee, while cash payments are accepted without any extra cost.
            </p>
          </div>

          <div className="comfort-confidence-section animate-on-scroll">
            <h2 className="info-section-title">Travel with <span className="heading-highlight">Comfort</span> and Confidence</h2>
            <p>
              From Sydney Airport transfers with baby seats to hospital or hotel pickups, SquareConnect is your trusted choice for safe family travel. Our focus is on reliability, comfort, and care for every passenger.
            </p>
            <p>
              Fill out the booking form now to reserve your trip. Our friendly team will confirm your booking quickly so you can travel with peace of mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
