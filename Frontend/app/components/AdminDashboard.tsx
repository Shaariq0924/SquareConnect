"use client";

import { useState, useEffect } from "react";
import { Users, CalendarCheck, MessageSquare, AlertCircle } from "lucide-react";
import "../styles/admin.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const fetchData = async (pwd: string) => {
    setIsLoading(true);
    setError("");
    try {
      const headers = { 'x-admin-password': pwd };
      const [bookingsRes, contactsRes] = await Promise.all([
        fetch("http://localhost:5000/api/bookings", { headers }),
        fetch("http://localhost:5000/api/contact", { headers })
      ]);

      if (bookingsRes.status === 401 || contactsRes.status === 401) {
        setIsAuthenticated(false);
        setAuthError("Invalid Admin Password.");
        setIsLoading(false);
        return;
      }

      const bookingsData = await bookingsRes.json();
      const contactsData = await contactsRes.json();

      if (bookingsData.success) setBookings(bookingsData.data);
      if (contactsData.success) setContacts(contactsData.data);
      
      setIsAuthenticated(true);
      setAuthError("");
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
      setError("Failed to connect to the backend server. Make sure localhost:5000 is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;
    fetchData(passwordInput);
  };

  useEffect(() => {
    // If we were already authenticated, we could re-fetch data 
    // but initially we just wait for login.
  }, []);

  const totalBookings = bookings.length;
  const unreadContacts = contacts.filter((c) => c.read === false).length;

  if (!isAuthenticated) {
    return (
      <div className="admin-layout flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 text-center">
          <AlertCircle size={48} className="mx-auto text-primary mb-6" color="#7c3aed" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h2>
          <p className="text-gray-500 mb-8">Please enter your master password to view sensitive customer data.</p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
            {authError && <p className="text-red-500 text-sm font-medium text-left">{authError}</p>}
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition shadow-lg mt-2 disabled:bg-gray-400"
            >
              {isLoading ? "Verifying..." : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <div className="admin-container">
        
        <header className="admin-header">
          <h1 className="admin-title">Server Administration</h1>
          <button onClick={() => fetchData(passwordInput)} className="px-5 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition">
            Refresh Data
          </button>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center gap-3">
            <AlertCircle size={20} />
            <p className="font-medium">{error}</p>
          </div>
        )}

        <div className="admin-metrics">
          <div className="metric-card">
            <div className="metric-icon-wrapper purple">
              <CalendarCheck size={28} />
            </div>
            <div className="metric-info">
              <h3>Total Bookings</h3>
              <div className="metric-value">{totalBookings}</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon-wrapper blue">
              <Users size={28} />
            </div>
            <div className="metric-info">
              <h3>Passenger Load</h3>
              <div className="metric-value">
                {bookings.reduce((acc, curr) => {
                  let p = curr.passengers || "0";
                  if (p.includes("+")) p = p.replace("+", "");
                  return acc + parseInt(p || "0");
                }, 0)}
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon-wrapper green">
              <MessageSquare size={28} />
            </div>
            <div className="metric-info">
              <h3>Unread Inquiries</h3>
              <div className="metric-value">{unreadContacts}</div>
            </div>
          </div>
        </div>

        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Booking Requests
          </button>
          <button 
            className={`admin-tab ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            Contact Inquiries
          </button>
        </div>

        <div className="admin-table-container">
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : activeTab === "bookings" ? (
            bookings.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Customer Info</th>
                    <th>Service Type</th>
                    <th>Pickup Date & Time</th>
                    <th>Route Details</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id || b._id}>
                      <td>
                        <strong>{b.customerName}</strong><br/>
                        <span className="text-gray-500 text-sm">{b.customerPhone}</span>
                      </td>
                      <td>
                        <span className="capitalize">{b.serviceType?.replace('-', ' ')}</span><br/>
                        <span className="text-gray-500 text-sm">{b.passengers} pax | {b.bags} bags</span>
                      </td>
                      <td>
                        <strong>{b.pickupDate}</strong><br/>
                        <span className="text-gray-500 text-sm">{b.pickupTime}</span>
                      </td>
                      <td>
                        <div className="max-w-xs truncate" title={b.pickupAddress}>From: {b.pickupAddress}</div>
                        <div className="max-w-xs truncate text-gray-500" title={b.dropoffAddress}>To: {b.dropoffAddress}</div>
                      </td>
                      <td>
                        <span className={`status-badge ${b.status || 'pending'}`}>
                          {b.status || 'pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <CalendarCheck size={48} className="text-gray-300" />
                <p>No bookings available.</p>
              </div>
            )
          ) : (
            contacts.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Sender Info</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id || c._id}>
                      <td>
                        <strong>{c.name}</strong><br/>
                        <span className="text-gray-500 text-sm">{c.email}</span>
                      </td>
                      <td><strong>{c.subject}</strong></td>
                      <td>
                        <div className="max-w-sm truncate text-sm" title={c.message}>
                          {c.message}
                        </div>
                      </td>
                      <td className="text-sm">
                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td>
                        <span className={`status-badge ${c.read ? 'read' : 'unread'}`}>
                          {c.read ? 'Read' : 'Unread'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <MessageSquare size={48} className="text-gray-300" />
                <p>No contact inquiries available.</p>
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
}
