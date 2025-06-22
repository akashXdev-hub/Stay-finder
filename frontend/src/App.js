import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BecomeHostForm from './components/Host/BecomeHostForm'; 
import './App.css';

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Navbar />

      <Routes>
        {/* Your central route file */}
        <Route path="/*" element={<AppRoutes />} />
        
        {/* Add the route for become-a-host page */}
        <Route path="/become-a-host" element={<BecomeHostForm />} />
      </Routes>

      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
