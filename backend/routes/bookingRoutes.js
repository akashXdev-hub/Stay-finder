const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookingsController');

router.post('/', controller.createBooking);
router.get('/', controller.getAllBookings);
router.get('/:id', controller.getBookingById);

module.exports = router;
