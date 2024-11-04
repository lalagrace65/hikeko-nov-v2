const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();

//imported routes
const registerRoute = require('./routes/registerRoute'); 
const loginRoute = require('./routes/loginRoute'); 
const logoutRoute = require('./routes/logoutRoute'); 
const profileRoute = require('./routes/profileRoute'); 
const travel_agencyRoute = require('./routes/travel_agencyRoute'); 
const user_dashboardRoute = require('./routes/user_dashboardRoute');
const packageRoute = require('./routes/packageRoute');
const featuresRoute = require('./routes/featureRoute');
const  signUpRoute = require('./routes/TravelAgency/signUp');
const trailsRoute = require('./routes/trailsRoute');
const bookingListRoute = require('./routes/bookingListRoute');
const uploadRoute = require('./routes/uploadRoute');
const customerPackagesRoute = require('./routes/Customer/packages');
const bookingRoute = require('./routes/Customer/joinerDetails'); //public view
const joinerBookingsRoute = require('./routes/Customer/userBookings');


const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: ['https://hikeko-nov-v2-client.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connect to MongoDB
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        app.listen(4000, () => console.log("Server is running on http://localhost:4000"));
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};


app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

// Use the routes
app.use(loginRoute); // For login
app.use(logoutRoute); // For logout
app.use(registerRoute); // For user registration
app.use(profileRoute); // For profile
app.use(travel_agencyRoute); // For travel agency account
app.use('/api/admin', travel_agencyRoute);
app.use(user_dashboardRoute); // For user account
app.use(packageRoute); // For package routing
app.use('/api', featuresRoute); // Prefix with '/api'
app.use('/api',signUpRoute);
app.use('/api', trailsRoute);
app.use( bookingListRoute );
app.use(uploadRoute);
app.use('/api', customerPackagesRoute);
app.use('/api', bookingRoute);
app.use('/api', joinerBookingsRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

startServer();