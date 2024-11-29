const express = require("express");
const router = express.Router();
const User = require("../../../models/User"); 
const Booking = require("../../../models/Booking");
const Package = require("../../../models/Package");

const jwt = require('jsonwebtoken');
const { requireRole ,jwtSecret} = require('../../../middleware/auth');

router.get('/staff-count', requireRole(['admin']), async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) return res.status(403).json({ message: 'Unauthorized' });

      try {
          // Count active and suspended staff
          const activeStaffCount = await User.countDocuments({ role: 'staff', adminId: userData.id, suspended: false });
          const suspendedStaffCount = await User.countDocuments({ role: 'staff', adminId: userData.id, suspended: true });
          const totalStaff = activeStaffCount + suspendedStaffCount;

          res.json({ 
            totalStaff, 
            active: activeStaffCount, 
            suspended: suspendedStaffCount 
          });
      } catch (error) {
          res.status(500).json({ message: 'Error fetching staff count', error: error.message });
      }
  });
});

router.get('/booking-count', requireRole(['admin', 'staff']), async (req, res) => {
    try {
      const userId = req.userData.id; 
      let bookingCount;
  
      if (req.userData.role === 'admin') {
        // Admin can see the total count of all bookings for their travel agency
        bookingCount = await Booking.countDocuments({ travelAgency: userId });
      } else if (req.userData.role === 'staff') {
        // Staff can only see bookings associated with the admin who created them
        const admin = await User.findById(userId).select('adminId');
        const adminId = admin.adminId;
  
        // Fetch the count of bookings associated with the specific admin
        bookingCount = await Booking.countDocuments({ travelAgency: adminId });
      } else {
        return res.status(403).json({ message: 'Access denied' });
      }
      

      // Respond with the booking count
      res.status(200).json({ bookingCount });
    } catch (error) {
      console.error("Error fetching booking count:", error);
      res.status(500).json({ message: "Server error fetching booking count." });
    }
  });
  
  router.get('/package-count', requireRole(['admin', 'staff']), async (req, res) => {
    const userId = req.userData.id; 
    try {
        // Count the number of packages for this travel agency
        const packageCount = await Package.countDocuments({ travelAgency: userId });
        
        return res.status(200).json({ packageCount });
      } catch (error) {
        console.error("Error fetching package count:", error);
        return res.status(500).json({ error: "Error fetching package count" });
      }
  });

  router.get('/packages/archived', requireRole(['admin', 'staff']), async (req, res) => {
    try {
      const userId = req.userData.id;
  
      // Fetch the archived packages for the specific travel agency
      const archivedPackages = await Package.countDocuments({ 
        travelAgency: userId, 
        isArchived: true 
      });
  
      res.json({ archivedPackages });
    } catch (error) {
      console.error("Error fetching archived packages:", error);
      res.status(500).json({ message: 'Error fetching archived packages', error: error.message });
    }
  });
  
  router.get('/total-earnings', requireRole(['admin', 'staff']), async (req, res) => {
    const { token } = req.cookies;
  
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) return res.status(403).json({ message: 'Unauthorized' });
  
      try {
        // Fetch all packages that are 'ended' and belong to the travel agency
        const endedPackages = await Package.find({ 
          travelAgency: userData.id,
          status: 'ended' 
        });
  
        // Initialize total earnings variable
        let totalEarnings = 0;
  
        // Loop through each ended package
        for (const packageData of endedPackages) {
          // Fetch bookings for this package where the payment status is 'Completed'
          const bookings = await Booking.find({
            packageId: packageData._id,
            paymentStatus: 'Completed'
          });
  
          // Sum the earnings for the bookings
          const packageEarnings = bookings.reduce((acc, booking) => acc + booking.finalBookingAmount, 0);
          totalEarnings += packageEarnings;
        }
  
        // Return the total earnings
        res.status(200).json({ totalEarnings });
      } catch (error) {
        console.error("Error calculating total earnings:", error);
        res.status(500).json({ message: 'Error calculating total earnings', error: error.message });
      }
    });
  });
  



module.exports = router;