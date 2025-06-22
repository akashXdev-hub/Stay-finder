const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  area: { type: String, required: true },
  stayType: { type: String, enum: ['short', 'long'], required: true },
  roomType: { type: String, enum: ['single', 'double', 'suite', 'family', 'studio'], required: true },
  pricePerNight: { type: Number, required: true },
  pricePerMonth: { type: Number },
  available: { type: Boolean, default: true },
  maxGuests: { type: Number, default: 1 },
  unavailableDates: {
  type: [Date],
  default: [],
},
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

listingSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Listing', listingSchema);
