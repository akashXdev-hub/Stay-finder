const express = require('express');
const router = express.Router();
const controller = require('../controllers/listingsController');

router.get('/', controller.getAllListings);
router.get('/:id', controller.getListingById);
router.post('/', controller.createListing); // Admin route to create a listing
router.get('/area/:area', controller.getListingsByArea);
router.put('/update/:id', controller.updateListing);
router.delete('/:id', controller.deleteListing);
module.exports = router;
