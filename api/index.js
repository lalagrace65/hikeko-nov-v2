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
const uploadRoute = require('./routes/uploadRoute');
const customerPackagesRoute = require('./routes/Customer/packages');
const bookingRoute = require('./routes/Customer/joinerDetails'); //public view
const joinerBookingsRoute = require('./routes/Customer/userBookings');


const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'https://hikeko.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URL);

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


const startServer = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        app.listen(4000, () =>
            console.log("Server is running on http://localhost:4000"),
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();