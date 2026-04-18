const { db } = require('../config/firebase');

exports.createBooking = async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      status: 'pending',
      createdAt: new Date()
    };
    
    // Detailed Terminal Logging requested by user
    console.log("\n==========================================");
    console.log("✅ NEW BOOKING RECORD RECEIVED AT BACKEND");
    console.log("==========================================");
    console.log(`👤 Customer : ${bookingData.customerName || 'N/A'}`);
    console.log(`📞 Phone    : ${bookingData.customerPhone || 'N/A'}`);
    console.log(`✉️ Email    : ${bookingData.customerEmail || 'N/A'}`);
    console.log(`🚕 Service  : ${bookingData.serviceType || 'N/A'}`);
    console.log(`📍 Route    : ${bookingData.pickupAddress} ➔ ${bookingData.dropoffAddress}`);
    console.log(`📅 Date/Time: ${bookingData.pickupDate} at ${bookingData.pickupTime}`);
    console.log(`👥 Details  : ${bookingData.passengers} Passengers, ${bookingData.bags} Bags`);
    if (bookingData.babySeat === 'yes') {
      console.log(`👶 Baby Seat: Yes (${bookingData.babySeatType})`);
    } else {
      console.log(`👶 Baby Seat: No`);
    }
    console.log("==========================================\n");

    // If Firebase is not fully setup yet, mock the response so frontend can proceed
    if (!db) {
       console.log("⚠️  Mock booking created (Firestore not initialized)");
       return res.status(201).json({ success: true, bookingId: 'mock-id-12345', message: "Mock booking generated" });
    }

    const docRef = await db.collection('bookings').add(bookingData);
    
    console.log(`✅ Successfully saved to Firestore! Document ID: ${docRef.id}\n`);
    
    // Note: Email sending logic will be added here in Phase 3
    
    res.status(201).json({ success: true, bookingId: docRef.id });
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    res.status(500).json({ success: false, error: "Failed to create booking" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    if (!db) {
      // Mock data when Firebase is missing
      return res.status(200).json({
        success: true,
        data: [
          {
            id: "mock-1",
            createdAt: new Date().toISOString(),
            customerName: "Jane Doe",
            customerEmail: "jane@example.com",
            customerPhone: "+61 400 000 000",
            serviceType: "airport-transfer",
            pickupAddress: "123 Mock St, Sydney",
            dropoffAddress: "Sydney Domestic Airport",
            pickupDate: "2026-05-01",
            pickupTime: "08:00",
            passengers: "2",
            bags: "2",
            babySeat: "no",
            status: "pending"
          }
        ]
      });
    }

    const snapshot = await db.collection('bookings').orderBy('createdAt', 'desc').get();
    const bookings = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate().toISOString() : data.createdAt) : null
      };
    });

    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({ success: false, error: "Failed to fetch bookings" });
  }
};
