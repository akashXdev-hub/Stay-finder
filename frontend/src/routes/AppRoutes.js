import {  Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ListingDetails from '../pages/ListingDetails/ListingDetails';
import AreaListings from '../pages/AreaListing/AreaListings';


const AppRoutes = () => (
 
    <Routes>
      <Route path="/" element={<Home />} />
          <Route path="/listings/:id" element={<ListingDetails />} />
         <Route path="/area" element={<AreaListings />} />
      
    </Routes>
  
);

export default AppRoutes;
