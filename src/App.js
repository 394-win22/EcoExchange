import React, {useState} from 'react';
import './App.css';
import ListingsContainer from './components/Listing';
import ListingUpload from './components/ListingUpload';
import Profile from './components/Profile';
import { Route, Routes } from 'react-router-dom';

const App = () => {
    const [location, setLocation] = useState();
    navigator.geolocation.getCurrentPosition((pos) => {
        setLocation(pos);
    },
        (error) => {
            console.log(error.message);
        });
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<ListingsContainer location={location}/>} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/add-listing" element={<ListingUpload location={location}/>} />
            </Routes>
        </div>
    )
}

export default App;
