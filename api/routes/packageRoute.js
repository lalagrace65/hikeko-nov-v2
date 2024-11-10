const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const Package = require('../models/Package.js');
const User = require('../models/User');
const { jwtSecret } = require('../middleware/auth');
const { requireRole } = require('../middleware/auth');

const router = express.Router();

// POST route to create a new package with the selected date (accessible by admin and staff)
router.post('/packages', requireRole(['admin', 'staff']), (req, res) => {
    console.log(req.body); // Log the incoming request body
    const { token } = req.cookies;
    const { 
        packages,
        additionalPackages, 
        trailId, 
        price, 
        paymentOptions, 
        exclusions, 
        pickupLocation, 
        extraInfo,
        dpPolicy,
        coordinatorName, 
        checkIn, 
        checkOut, 
        maxGuests, 
        date, 
        dateCreated,
        packageImages
    } = req.body;

    // Check for required fields
    if (!date || !dateCreated) {
        return res.status(400).json({ message: 'Date and timestamp are required' });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) return res.status(403).json({ message: 'Unauthorized' });

        try {
            let travelAgencyId;

            // If user is staff, retrieve the admin ID from the staff document
            if (userData.role === 'staff') {
                const staffUser = await User.findById(userData.id);
                if (!staffUser) return res.status(404).json({ message: 'Staff user not found' });
                travelAgencyId = staffUser.adminId; // Assuming the staff document has an adminId field
            } else {
                travelAgencyId = userData.id; // Admin creating the package
            }

            // Create a new package document in the database
            const packageDoc = await Package.create({
                trailId,
                travelAgency: travelAgencyId,  // Associate package with the correct admin
                packages,
                additionalPackages,
                price,
                paymentOptions,
                exclusions, 
                pickupLocation,
                extraInfo,
                coordinatorName,
                checkIn,
                checkOut,
                maxGuests,
                dpPolicy,
                date: new Date(date), 
                dateCreated: new Date(dateCreated), // Save the timestamp
                packageImages
            });

            res.status(201).json(packageDoc);
        } catch (error) {
            console.error('Error creating package:', error);
            res.status(500).json({ message: 'Error creating package', error: error.message });
        }
    });
});

// GET route to retrieve packages, optionally including archived ones
router.get('/packages', async (req, res) => {
    const { token } = req.cookies;
    const { includeArchived } = req.query; 

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) return res.status(403).json({ message: 'Unauthorized' });

        try {
            let filter = {};
            
            if (includeArchived === 'true') {
                filter.isArchived = true;  // Retrieve only archived packages if specified
            } else {
                filter.isArchived = false; // Retrieve only non-archived packages by default
            }

            let packages;
            if (userData.role === 'admin') {
                filter.travelAgency = userData.id;
                packages = await Package.find(filter).populate('trailId', 'title');
            } else if (userData.role === 'staff') {
                const admin = await User.findById(userData.id).select('adminId');
                filter.travelAgency = admin.adminId;
                packages = await Package.find(filter).populate('trailId', 'title');
            } else {
                return res.status(403).json({ message: 'Access denied' });
            }

            res.json(packages);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching packages', error: error.message });
        }
    });
});

// GET route to retrieve a specific package by ID
router.get('/packages/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid package ID format' });
        }

        const packageDoc = await Package.findById(id);
        if (!packageDoc) return res.status(404).json({ message: 'Package not found' });

        res.json(packageDoc);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching package', error: error.message });
    }
});

// PUT route to update a package by ID (accessible by staff and admin)
router.put('/packages/:id', requireRole(['admin', 'staff']), async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
    const { 
        packages, 
        trailId, 
        price, 
        paymentOptions, 
        exclusions, 
        pickupLocation, 
        extraInfo, 
        coordinatorName, 
        checkIn, 
        checkOut, 
        maxGuests,
        dpPolicy, 
        date,  
        status,
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) return res.status(403).json({ message: 'Unauthorized' });

        try {
            const packageDoc = await Package.findById(id);
            if (!packageDoc) return res.status(404).json({ message: 'Package not found' });

            // Ensure only the admin who created the package or their staff can update it
            if (
                userData.role === 'admin' && packageDoc.travelAgency.toString() !== userData.id ||
                userData.role === 'staff' && packageDoc.travelAgency.toString() !== (await User.findById(userData.id)).adminId.toString()
            ) {
                return res.status(403).json({ message: 'You do not have permission to edit this package' });
            }

            // Update all fields if provided in the request body, otherwise retain existing values
            packageDoc.packages = packages || packageDoc.packages;
            packageDoc.trailId = trailId || packageDoc.trailId;
            packageDoc.price = price || packageDoc.price;
            packageDoc.paymentOptions = paymentOptions || packageDoc.paymentOptions;
            packageDoc.exclusions = exclusions || packageDoc.exclusions;
            packageDoc.pickupLocation = pickupLocation || packageDoc.pickupLocation;
            packageDoc.extraInfo = extraInfo || packageDoc.extraInfo;
            packageDoc.coordinatorName = coordinatorName || packageDoc.coordinatorName;
            packageDoc.checkIn = checkIn || packageDoc.checkIn;
            packageDoc.checkOut = checkOut || packageDoc.checkOut;
            packageDoc.maxGuests = maxGuests || packageDoc.maxGuests;
            packageDoc.dpPolicy = dpPolicy || packageDoc.dpPolicy;
            packageDoc.date = date || packageDoc.date;
            packageDoc.status = status || packageDoc.status;

            if (status === 'ongoing') {
                packageDoc.ongoingTimestamp = new Date();
            } else if (status === 'ended') {
                packageDoc.endedTimestamp = new Date();
            }

            await packageDoc.save();
            res.json(packageDoc);
        } catch (err) {
            res.status(500).json({ message: 'Error updating package', error: err.message });
        }
    });
});


// PUT route to archive a package by ID (only accessible by admin)
router.put('/packages/:id/archive', requireRole(['admin']), async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid package ID format' });
        }

        const packageDoc = await Package.findByIdAndUpdate(
            id,
            { 
                isArchived: true, 
                archivedTimestamp: new Date()  // Set archivedTimestamp to the current date and time
            },
            { new: true } // Return the updated document
        );

        if (!packageDoc) return res.status(404).json({ message: 'Package not found' });

        res.json({ message: 'Package archived successfully', package: packageDoc });
    } catch (err) {
        res.status(500).json({ message: 'Error archiving package', error: err.message });
    }
});

// DELETE route to remove a package by ID (only accessible by admin)
router.delete('/packages/:id', requireRole(['admin']), async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid package ID format' });
        }

        const packageDoc = await Package.findById(id);
        if (!packageDoc) return res.status(404).json({ message: 'Package not found' });

        await Package.findByIdAndDelete(id);
        res.json({ message: 'Package deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting package', error: err.message });
    }
});

module.exports = router;