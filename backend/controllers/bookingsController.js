const Booking = require('../models/Booking');
const Listing = require('../models/Listing');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { listing, guestName, guestEmail, checkInDate, checkOutDate, stayType } = req.body;

    // Validate required fields
    if (!listing || !guestName || !guestEmail || !checkInDate || !checkOutDate || !stayType) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingListing = await Listing.findById(listing);
    if (!existingListing) {
      return res.status(404).json({ message: `Listing with ID ${listing} not found.` });
    }

    if (!existingListing.available) {
      return res.status(400).json({ message: `Listing with ID ${listing} is currently unavailable.` });
    }

    // Create and save booking
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();

    // Add unavailable dates to listing
    const unavailable = [];
    let current = new Date(checkInDate);
    const end = new Date(checkOutDate);

    while (current <= end) {
      unavailable.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    existingListing.unavailableDates = [...(existingListing.unavailableDates || []), ...unavailable];
    await existingListing.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal server error while creating booking.' });
  }
};

// Get all bookings with populated listing details
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('listing');
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ message: 'Internal server error while retrieving bookings.' });
  }
};

// Get a booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('listing');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error retrieving booking:', error);
    res.status(500).json({ message: 'Internal server error while retrieving booking.' });
  }
};
