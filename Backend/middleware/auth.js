const adminAuth = (req, res, next) => {
  const providedPassword = req.headers['x-admin-password'];
  
  // You can set this in your .env file as ADMIN_PASSWORD=your_secure_password
  const actualPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (!providedPassword || providedPassword !== actualPassword) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Invalid Admin Password' });
  }

  next();
};

module.exports = adminAuth;
