const express = require('express');
const router = express.Router();
const Booking = require('../../models/Booking');
const Package = require('../../models/Package');
const User = require('../../models/User');
const { requireRole } = require('../../middleware/auth');

// Route to retrieve booking list, accessible by both admin and staff
router.get('/booking-list', requireRole(['admin', 'staff']), async (req, res) => {
  try {
    const userId = req.userData.id; // Get the logged-in user's ID from the JWT token
    let bookings;

    // Check the user's role (admin or staff)
    if (req.userData.role === 'admin') {
      // If admin, fetch all bookings for the travel agency they belong to
      bookings = await Booking.find({ travelAgency: userId }).populate('userId', 'incrementingId firstName lastName customerBookingCount email address contactNo emergencyContactNo dateOfBirth');
    } else if (req.userData.role === 'staff') {
      // If staff, find the admin they are assigned to (adminId)
      const admin = await User.findById(userId).select('adminId');
      // Fetch all bookings related to the admin the staff member works for
      bookings = await Booking.find({ travelAgency: admin.adminId }).populate('userId', 'incrementingId firstName lastName customerBookingCount email address contactNo emergencyContactNo dateOfBirth');
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Group bookings by userId
    const groupedBookings = bookings.reduce((acc, booking) => {
      const { userId } = booking;
      const incrementingId = userId ? userId.incrementingId : 'N/A'; 
      const customerBookingCount = userId ? userId.customerBookingCount : 'N/A'; 
      const firstName = userId ? userId.firstName : 'N/A'; 
      const lastName = userId ? userId.lastName : 'N/A'; 
      const email = userId ? userId.email : 'N/A'; 
      const address = userId ? userId.address : 'N/A'; 
      const contactNo = userId ? userId.contactNo : 'N/A'; 
      const emergencyContactNo = userId ? userId.emergencyContactNo : 'N/A'; 
      const dateOfBirth = userId ? userId.dateOfBirth : 'N/A'; 

      if (!acc[userId._id]) {  
        acc[userId._id] = {
          incrementingId,
          customerBookingCount,
          firstName,
          lastName,
          email,
          address,
          contactNo,
          emergencyContactNo,
          dateOfBirth,
          transactions: [],
        };
      }

      // Add booking details to the transactions array
      acc[userId._id].transactions.push({
        referenceCode: booking.referenceCode,
        otherDetails: {
          joinerName: booking.joinerName,
          sex: booking.sex,
          homeAddress: booking.homeAddress,
          medicalCondition: booking.medicalCondition,
          conditionDetails: booking.conditionDetails,
        },
      });

      return acc;
    }, {});

    res.status(200).json(Object.values(groupedBookings));
  } catch (error) {
    console.error('Error fetching booking data:', error);
    res.status(500).json({ message: 'Server error fetching booking data.' });
  }
});


router.get('/booking-list/transactions', requireRole(['admin', 'staff']), async (req, res) => {
  try {
    const userId = req.userData.id; // Get logged-in user ID from decoded JWT token

    let bookings;
    
    if (req.userData.role === 'admin') {
      // Admin can see all bookings for their travel agency
      bookings = await Booking.find({ travelAgency: userId });
    } else if (req.userData.role === 'staff') {
      // Staff can only see bookings created by the admin who created them
      const admin = await User.findById(userId).select('adminId');
      const adminId = admin.adminId;

      // Fetch bookings associated with the specific admin
      bookings = await Booking.find({ travelAgency: adminId });
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Respond with the filtered bookings
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching booking data:", error);
    res.status(500).json({ message: "Server error fetching booking data." });
  }
});


router.get('/bookings/package/:packageId', async (req, res) => {
  try {
    const { packageId } = req.params;
    const bookings = await Booking.find({ packageId: packageId }).populate('userId');
    
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this package.' });
    }

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
