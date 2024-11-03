const Booking = require ('../models/Booking');


const createBooking = async (req, res) => {
    const bookingData = req.body; // Assuming booking data comes from the request body
    const booking = new Booking(bookingData);

    try {
        await booking.save();
        return res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating booking', error });
    }
};

module.exports = { createBooking };
