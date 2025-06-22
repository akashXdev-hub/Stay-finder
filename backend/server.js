const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require("./routes/userRoute");
const uploadRoutes = require('./routes/uploadRoutes');
const cors = require('cors');

dotenv.config(); //require to load variable

const app = express();
app.use(express.json());

app.use(cors());
app.use('/uploads', express.static('uploads')); // To serve uploaded files


//mongodb dtatbase connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch( err => console.log("connection error", err));

//routes 

app.use('/api/auth', userRoute);
app.use('/api/listings', require('./routes/listingRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/upload', uploadRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});