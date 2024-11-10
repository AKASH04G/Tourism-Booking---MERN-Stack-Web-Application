const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
 app.use(express.urlencoded({ extended: true })); 

const userRoutes = require('./routes/userRoutes');
const trainRoutes = require('./routes/train');
const trainBookingRoutes = require('./routes/TrainBooking');
const cityPackagesRoutes = require('./routes/cityPackages');
const PackageBooking=require('./routes/PackageBooking')
const busRoutes = require('./routes/bus');
const busbookingRoutes = require('./routes/BusBooking');
const hotelRoutes=require('./routes/hotel')
const hotelbooking=require('./routes/hotelbooking')

app.use('/api/buses', busRoutes);
app.use('/api/bookings', busbookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/train-bookings', trainBookingRoutes);
app.use('/api/cities', cityPackagesRoutes);
app.use('/api/packageBookings', PackageBooking);
app.use('/api/hotels', hotelRoutes);
app.use('/api/hotelbooking', hotelbooking);

mongoose.connect(process.env.DB_URI ,
     { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server running on port 5000')))
    .catch(err => console.error(err));
