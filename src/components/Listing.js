import { React, useState, useEffect } from 'react';
import { TradeButton, Popup } from "./Popup"
import { useUser, useCollection } from "../utilities/data";
import { userToItem } from "../utilities/location";
import { findImageUrl } from '../utilities/firebase';
import NavigationBar from './NavigationBar';



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
        "recreation": {
            "ListingID": "R101",
            "name": "Baseball Bat",
            "uid": "302",
            "Latitude": "40",
            "Longitude": "60",
            "imageURL": "https://m.media-amazon.com/images/I/31Xc5u3XuDL._AC_.jpg",
            "description": "Black wooden baseball bat for youth players",
            "category": categories.Recreation,
            "date": "1/10/2021",
        }
    }
};


//category buttons
const CatButton = ({ category, setCategory, checked }) => (
    <>
        <input type="radio" id={category} className="btn-check" autoComplete="off" checked={checked} onChange={() => setCategory(category)} />
        <label className="btn btn-success m-1 p-2" htmlFor={category}>
            {category}
        </label>
    </>
);

const CatSelector = ({ category, setCategory }) => (
    <div className="btn-group">
        {
            Object.values(categories).map(value => <CatButton key={value} category={value} setCategory={setCategory} checked={value === category} />)
        }
    </div>
);

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

/*
function filterCategory(props) {
    {items.items.filter(item => item.category == props.categ).map(filteredCateg => (
        <li>
          {filteredCateg.name}
        </li>
      ))}
}

const selected =<filterCategory categ = "Food" />;

<button onClick={filterCategory(selected)}>
    Click me
</button>
*/

const Banner = ({ title }) => (
    <h1>{title}</h1>
);

const getItemCat = item => (
    categories[item.category]
);

/*const getCourseNumber = course => (
    course.id.slice(1, 4)
);*/





const Listing = ({ listing, userLocation, setListing }) => {
    const [imageUrl, setImageUrl] = useState("");
    useEffect(() => {
        findImageUrl(listing.imageURL)
            .then((url) => setImageUrl(url))
            .catch((err) => console.log(err));
    }, [listing.imageURL]);
    const [user, loading, error] = useUser("users", listing.uid);
    if (error) console.log(error);
    return (
        <div className="card bg-light m-1">
            <img className="card-img-top" src={imageUrl} alt={listing.title} />
            <div className="card-body">
                <h4 className="card-title">{listing.name}</h4>
                <p className="card-text"><b>Description:</b> {listing.description}</p>
                {loading || error ? null : <p className="card-text"><b>Looking For:</b> {user.lookingFor}</p>}
                <TradeButton listing={listing} setListing={setListing}/>
            </div>
            <div className="card-footer text-muted">{userToItem(userLocation, listing.location._lat, listing.location._long)} miles away</div>
        </div>
    );
};

const ListingList = ({ listings, userLocation, setListing }) => {
    const [category, setCategory] = useState('Food');
    const catListings = Object.values(listings).filter(item => category === getItemCat(item));
    return (
        <>
            <CatSelector category={category} setCategory={setCategory} />
            <div className="listing-list">
                {catListings.map(listing => <Listing key={listing.id} listing={listing} userLocation={userLocation} setListing={setListing}/>)}
            </div>
        </>
    );
};

const ListingsContainer = () => {

    const [location, setLocation] = useState();
    const [listing, setListing] = useState(0);
    const [listings, loading, error] = useCollection('listings');
    if (loading) return <div>Loading</div>
    if (error) return <div>Error</div>


    navigator.geolocation.getCurrentPosition((pos) => {
        setLocation(pos);
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
            <NavigationBar />
            <ListingList listings={listings} userLocation={location} setListing={setListing} />
            <Popup listing={listing} setListing={setListing}></Popup>
        </div>)
};

export default ListingsContainer;