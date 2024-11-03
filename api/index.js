const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
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

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

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
app.use(signUpRoute);
app.use('/api', trailsRoute);
app.use( bookingListRoute );


// Start the server
app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});
