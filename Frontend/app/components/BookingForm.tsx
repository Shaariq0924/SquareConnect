"use client";

import { useState } from "react";
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
      // Used window.location.href instead of window.open to bypass strict mobile popup blockers.
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
          Book Now SquareConnect Sydney
        </h1>

        <div className="booking-form-card" id="booking-form-card">
          {errorMsg && <div className="p-4 mb-4 text-red-800 bg-red-100 rounded-lg">{errorMsg}</div>}

          {isSuccess ? (
            <div className="success-animation-container flex flex-col items-center justify-center p-8 text-center animate-fade-in">
              <CheckCircle size={80} color="#22c55e" className="animate-bounce" style={{ animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' }} />
              <h2 className="text-2xl font-bold mt-4 text-gray-800" style={{ fontSize: '24px', fontWeight: 800, marginTop: '20px' }}>Booking Successfully Submitted!</h2>
              <p className="text-gray-600 mt-2" style={{ fontSize: '16px', color: '#666', marginTop: '10px' }}>Redirecting to WhatsApp to confirm your ride...</p>
              
              <div className="mt-8 text-left bg-gray-50 p-6 w-full border border-gray-200" style={{ marginTop: '30px', padding: '24px', background: '#f9fafb', borderRadius: '16px', textAlign: 'left', width: '100%' }}>
                  <h3 className="font-bold text-lg mb-4" style={{ fontSize: '18px', fontWeight: 700, color: '#7c3aed', marginBottom: '16px' }}>Your Booking Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
                    <div><span style={{ color: '#888' }}>Name:</span> <br/><strong style={{ color: '#222' }}>{submittedData?.customerName}</strong></div>
                    <div><span style={{ color: '#888' }}>Service:</span> <br/><strong style={{ color: '#222' }}>{submittedData?.serviceType}</strong></div>
                    <div><span style={{ color: '#888' }}>Pickup:</span> <br/><strong style={{ color: '#222' }}>{submittedData?.pickupAddress}</strong></div>
                    <div><span style={{ color: '#888' }}>Dropoff:</span> <br/><strong style={{ color: '#222' }}>{submittedData?.dropoffAddress}</strong></div>
                    <div><span style={{ color: '#888' }}>Date/Time:</span> <br/><strong style={{ color: '#222' }}>{submittedData?.pickupDate} at {submittedData?.pickupTime}</strong></div>
                    <div><span style={{ color: '#888' }}>Passengers:</span> <br/><strong style={{ color: '#222' }}>{submittedData?.passengers}</strong></div>
                  </div>
              </div>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmit} method="POST" id="booking-form">
              {/* Customer Details section */}
              <h3 style={{fontSize:'18px', fontWeight:600, color:'#333', marginBottom:'16px'}}>Personal Details</h3>
            
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

            <h3 style={{fontSize:'18px', fontWeight:600, color:'#333', marginBottom:'16px', marginTop:'24px'}}>Trip Details</h3>

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
      </div>
    </div>
  );
}
