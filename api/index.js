const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

//imported routes
const registerRoute = require('./routes/registerRoute'); 
const loginRoute = require('./routes/loginRoute'); 
const logoutRoute = require('./routes/logoutRoute'); 
const profileRoute = require('./routes/profileRoute'); 
const travel_agencyRoute = require('./routes/travel_agencyRoute'); 
const user_dashboardRoute = require('./routes/user_dashboardRoute');
const packageRoute = require('./routes/packageRoute');
const trailsRoute = require('./routes/trailsRoute');
const bookingListRoute = require('./routes/TravelAgency/bookingListRoute.js');
const uploadRoute = require('./routes/uploadRoute');
const customerPackagesRoute = require('./routes/Customer/packages');
const bookingRoute = require('./routes/Customer/joinerDetails'); //public view
const joinerBookingsRoute = require('./routes/Customer/userBookings');
const travelAgencySettingsRoute = require('./routes/TravelAgency/adminDetailsRoute.js');
const premiumPlanRoute = require('./routes/Subscription/PremiumPlan');
const basicPlanRoute = require('./routes/Subscription/BasicPlan');
const createForumPost = require('./routes/Forum/createPostForum');
const adminRegisterRoute = require('./routes/TravelAgency/adminRegisterRoute.js');
const bookAuthUserRoute = require('./routes/Customer/restrictBook');
const userProfileRoute = require('./routes/Customer/avatar');
const notificationRoute = require('./routes/Forum/notification');
const trackVisitRoute = require('./routes/trackVisitRoute');
const travelAgencyStaffCountRoute = require('./routes/TravelAgency/dashboardCounts/TravelAgencyDashboardRouter');
const monthlyBookingsRoute = require('./routes/TravelAgency/dashboardCounts/monthlyBookingsRoute.js')

const TravelAgencyRecentActivityRoute = require('./routes/TravelAgency/dashboardCounts/recentActivity');


const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET, { secure: process.env.NODE_ENV === 'production' }));
app.use(express.json());

// Add security headers with Helmet
app.use(
    helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                "default-src": ["'self'"],
                "script-src": ["'self'", "https://trusted-scripts.example.com"],
                "img-src": ["'self'", "data:"],
                "object-src": ["'none'"],
            },
        },
        frameguard: { action: 'sameorigin' }, // Sets X-Frame-Options: SAMEORIGIN
        referrerPolicy: { policy: 'no-referrer-when-downgrade' },
        crossOriginEmbedderPolicy: true,
    })
);
app.set('trust proxy', 1);


// CORS configuration
app.use(cors({
    credentials: true,
    origin: ['https://hikeko-nov-v2-client.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'Access-Control-Request-Method', 'Access-Control-Request-Headers']
}));

// Connect to MongoDB
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
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
app.use('/api', trailsRoute);
app.use( bookingListRoute );
app.use(uploadRoute);
app.use('/api', customerPackagesRoute);
app.use('/api', bookingRoute);
app.use('/api', joinerBookingsRoute);
app.use('/api',adminRegisterRoute);
app.use(travelAgencySettingsRoute);
app.use(premiumPlanRoute);
app.use(basicPlanRoute);
app.use('/api',createForumPost);
app.use('/api',bookAuthUserRoute);
app.use(userProfileRoute);
app.use('/api',notificationRoute);
app.use('/api',trackVisitRoute);
app.use('/api',travelAgencyStaffCountRoute);
app.use('/api',monthlyBookingsRoute);

app.use(TravelAgencyRecentActivityRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

startServer();