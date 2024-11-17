const express = require('express');
const router = express.Router();
const Booking = require('../../models/Booking');
const { requireRole } = require('../../middleware/auth');

router.get('/booking-list', requireRole(['admin']), async (req, res) => {
  try {
    const adminId = req.userData.id; // Get admin ID from decoded JWT token

    // Fetch all bookings for the admin, populating the userId field with firstName
    const bookings = await Booking.find({ travelAgency: adminId }).populate('userId', 'incrementingId firstName lastName email address contactNo emergencyContactNo dateOfBirth');

    // Group bookings by userId
    const groupedBookings = bookings.reduce((acc, booking) => {
      // Access firstName from the populated userId object
      const { userId } = booking;
      const incrementingId = userId ? userId.incrementingId : 'N/A'; 
      const firstName = userId ? userId.firstName : 'N/A'; 
      const lastName = userId ? userId.lastName : 'N/A'; 
      const email = userId ? userId.email : 'N/A'; 
      const address = userId ? userId.address : 'N/A'; 
      const contactNo = userId ? userId.contactNo : 'N/A'; 
      const emergencyContactNo = userId ? userId.emergencyContactNo : 'N/A'; 
      const dateOfBirth = userId ? userId.dateOfBirth : 'N/A'; 

      if (!acc[userId._id]) {  // Use userId._id to group the bookings
        acc[userId._id] = {
          incrementingId,
          firstName,
          lastName,
          email,
          address,
          contactNo,
          emergencyContactNo,
          dateOfBirth,
          transactions: [], // Initialize transaction history
        };
      }

      // Add the current booking's reference code to transactions
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

    // Convert the grouped data object back to an array
    res.status(200).json(Object.values(groupedBookings));
  } catch (error) {
    console.error('Error fetching booking data:', error);
    res.status(500).json({ message: 'Server error fetching booking data.' });
  }
});


router.get('/booking-list/transactions', requireRole(['admin']), async (req, res) => {
  try {
    const adminId = req.userData.id; // Get admin ID from decoded JWT token
    
    // Find bookings that match the logged-in admin's ID in the travelAgency field
    const bookings = await Booking.find({ travelAgency: adminId });
    
    // Respond with the filtered bookings
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching booking data:", error);
    res.status(500).json({ message: "Server error fetching booking data." });
  }
});

module.exports = router;
