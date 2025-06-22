const Listing = require('../models/Listing');

exports.getAllListings = async (req, res) => {
  try {
    const { area, stayType, checkIn, checkOut, guests } = req.query;

    const query = {
      available: true,
    };

    if (area) query.area = new RegExp(`^${area}$`, 'i');
    if (stayType) query.stayType = stayType;
    if (guests) query.maxGuests = { $gte: parseInt(guests) };

    let listings = await Listing.find(query);

    // filter by availability date range (optional)
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      listings = listings.filter(listing => {
        return !listing.unavailableDates?.some(date => {
          const d = new Date(date);
          return d >= start && d <= end;
        });
      });
    }

    res.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ message: 'Server error fetching listings' });
  }
};


exports.getListingsByArea = async (req, res) => {
  try {
    const area = req.params.area;
    
    const listings = await Listing.find({ area: new RegExp(`^${area}$`, 'i'), available: true });
    res.json(listings);
  } catch (error) {
    console.error('Error fetching listings by area:', error);
    res.status(500).json({ message: 'Server error fetching listings by area' });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({ message: 'Server error fetching listing' });
  }
};

exports.createListing = async (req, res) => {
  try {
    const newListing = new Listing(req.body);
    const saved = await newListing.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ message: 'Server error creating listing' });
  }
};

//update existing listing
exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedListing = await Listing.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    if (!updatedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json(updatedListing);
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({ message: 'Server error updating listing' });
  }
};

// delete existing listing
exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ message: 'Server error deleting listing' });
  }
};
