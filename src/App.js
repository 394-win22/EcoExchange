import React from 'react';
import './App.css';
import ListingsContainer from './components/Listing';
import ListingUpload from './components/ListingUpload';
import Profile from './components/Profile';
import {Route, Routes, Link} from 'react-router-dom';
import {NavigationBar} from './components/NavigationBar';

const App = () => (
    <div className="App">
        <Routes>
            <Route exact path="/" element={<ListingsContainer/>} />
            <Route exact path="/profile" element={<Profile/>} />
            <Route exact path="/add-listing" element={<ListingUpload/>} />
        </Routes>
    </div>
)

export default App;
