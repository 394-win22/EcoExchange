import { React, useState } from 'react';
import './App.css';
import { useCollection } from "./utilities/data";
import { userToItem } from "./utilities/location";
import { ButtonRow } from '@thumbtack/thumbprint-react';

const categories = {
  Food: "Food",
  Clothes: "Clothes",
  Recreation: "Recreation",
  Electronics: "Electronics",
  Other: "Other",
};

const items = {
    "title": "EcoExchange",
    "items": {
        "clothes": {
            "ListingID": "C101",
            "name": "Jacket",
            "uid": "123", /* user id */
            "Latitude": "0",
            "Longitude": "0",
            "imageURL": "https://m.media-amazon.com/images/I/51ylk6F0rfL._AC_UY741_.jpg",
            "description": "Lightweight forest green jacket, lightly used",
            "category": categories.Clothes,
            "date": "1/19/2021",
        },
        "food": {
            "ListingID": "F101",
            "name": "Apple",
            "uid": "156",
            "Latitude": "1",
            "Longitude": "1",
            "imageURL": "https://i5.walmartimages.com/asr/7320e63a-de46-4a16-9b8c-526e15219a12_3.e557c1ad9973e1f76f512b34950243a3.jpeg",
            "description": "Red Apple, mint condition",
            "category": categories.Food,
            "date": "1/1/2021",
        },

    }
};


//category buttons
<ButtonRow justify="center">
    <Button>Food</Button>
    <Button>Clothes</Button>
    <Button>Recreation</Button>
    <Button>Electronics</Button>
    <Button>Other</Button>
</ButtonRow>

/*
<Button 
        border="none"
        color="pink"
        height = "200px"
        onClick={() => console.log("You clicked on the pink circle!")}
        radius = "50%"
        width = "200px"
      />
*/

//filtering the buttons 


function filterCategory(props) {
    
}

const selected =<filterCategory categ = "Food" />;

<button onClick={filterCategory(selected)}>
    Click me
</button>

const Banner = ({ title }) => (
    <h1>{title}</h1>
);



/*const getCourseTerm = course => (
    terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
    course.id.slice(1, 4)
);*/



const Popup = ({listing}) => {
    return(
    <div> </div>);
};

const TradeButton = ({ listing }) => (
    <a href="#" className="btn btn-primary" onClick={() => Popup(listing)}>
            Offer Trade
      </a>
);


const Listing = ({ listing, userLocation }) => (
  <div className="card bg-light m-1">
    <img className="card-img-top" src={listing.imageURL} alt={listing.title} />
    <div className="card-body">
      <h4 className="card-title">{listing.name}</h4>
      <p className="card-text">{listing.description}</p>
      <a href="#" className="btn btn-primary" onClick="ShowTrade">
        Offer Trade
      </a>
    </div>
    <div class="card-footer text-muted">{userToItem(userLocation, listing.Latitude, listing.Longitude)} miles away</div>
  </div>
);

const ListingList = ({ listings, userLocation }) => (
    <div className="listing-list">
        {Object.values(listings).map(listing => <Listing key={listing.id} listing={listing} userLocation={userLocation} />)}
    </div>
);

const App = () => {

    const [location, setLocation] = useState();

    const [listings, loading, error] = useCollection('listings');
    if (loading) return <div>Loading</div>
    if (error) return <div>Error</div>


    navigator.geolocation.getCurrentPosition((pos) => {
        [location, setLocation] = setLocation(pos);
    },
    (error) => {
        console.log(error.message);
    }); // needs https

    const printloc = (loc) => {
        console.log("lat: " + loc.coords.latitude);
        console.log("long: " + loc.coords.longitude);
    };

    printloc({ 
        coords: {
            accuracy: 40,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 42.05,
            longitude: -87.68,
            speed: null,
        },
        timestamp: Date.now(),
        }
    );

    return (
    <div className="container">
        <Banner title={items.title} />
        <ListingList listings={listings} userLocation={location} />
    </div>)
};

export default App;