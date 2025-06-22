const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  numberOfGuests: { type: Number, default: 1 },
  
  roomType: {
  type: String,
  enum: ['single', 'double', 'suite', 'family', 'studio']
},
  stayType: { type: String, enum: ['short', 'long'], required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);
