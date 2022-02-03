import React, {useEffect, useState} from 'react';
import './App.css';
import ListingsContainer from './components/Listing';
import ListingUpload from './components/ListingUpload';
import Profile from './components/Profile';
import { Route, Routes } from 'react-router-dom';
import Trades from './components/Trades';
import { useUserState } from './utilities/firebase';
import { getItemByID } from './utilities/data';

const App = () => {
    const [location, setLocation] = useState();
    const [trueLocation, setTrueLocation] = useState(false);
    const [user] = useUserState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setLocation(pos);
            setTrueLocation(true);
        },
        async (error) => {
            console.log(error.message);
            if (user) {
                const userData = await getItemByID("users", user.uid);
                setLocation({coords: {latitude: userData.location._lat, 
                                    longitude: userData.location._long}});
            } else {
                setLocation(null);
            }
        });
    }, [user]);
    
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<ListingsContainer location={location} trueLocation = {trueLocation}/>} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/trades" element={<Trades />} />
                <Route exact path="/add-listing" element={<ListingUpload />} />
            </Routes>
        </div>
    )
}

export default App;
