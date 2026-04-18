const { db } = require('../config/firebase');

exports.submitContact = async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      read: false,
      createdAt: new Date()
    };
    
    // Fallback if Firebase isn't configured yet
    if (!db) {
       console.log("Mock contact created (Firestore not initialized):", contactData);
       return res.status(201).json({ success: true, contactId: 'mock-id-67890', message: "Mock contact message generated" });
    }
    
    const docRef = await db.collection('contacts').add(contactData);
    
    // Note: Email sending logic will be added here in Phase 3
    
    res.status(201).json({ success: true, contactId: docRef.id });
  } catch (error) {
    console.error("Error submitting contact:", error);
    res.status(500).json({ success: false, error: "Failed to submit contact message" });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    if (!db) {
      // Mock data when Firebase is missing
      return res.status(200).json({
        success: true,
        data: [
          {
            id: "mock-c-1",
            createdAt: new Date().toISOString(),
            name: "John Smith",
            email: "john@mock.com",
            phone: "+61 411 111 111",
            subject: "Business Inquiry",
            message: "I need a corporate fleet contract for 10 vehicles.",
            read: false
          }
        ]
      });
    }

    const snapshot = await db.collection('contacts').orderBy('createdAt', 'desc').get();
    const contacts = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate().toISOString() : data.createdAt) : null
      };
    });

    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error("❌ Error fetching contacts:", error);
    res.status(500).json({ success: false, error: "Failed to fetch contacts" });
  }
};
