import { React, useState, useEffect } from 'react';
import { TradeButton, Popup } from "./Popup"
import { useCollection } from "../utilities/data";
import { userToItem } from "../utilities/location";
import { findImageUrl, useUserState } from '../utilities/firebase';
import NavigationBar from './NavigationBar';
import recycle from "../images/recycle.png";
import c from "./categories";
import Alert from 'react-bootstrap/Alert';
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar"
import { getItemByID } from '../utilities/data';
import { GeoPoint } from 'firebase/firestore';


//category buttons
const CatButton = ({ category, setCategory, checked }) => (
    <>
        <input type="radio" id={category} className="btn-check" autoComplete="off" checked={checked} onChange={() => setCategory(category)} />
        <label className={"btn btn-success mx-0 my-1 p-2"} htmlFor={category}>
            {category}
        </label>
    </>
);

const SortButton = ({ sort, setSort }) => (
    <div>
        <input className = "me-2" type="checkbox" id="sort" name="sort" value="sort" onChange={() => setSort(!sort)} />
        <label for="sort">Sort by location</label>
    </div>
 )



const CatSelector = ({ category, setCategory }) => (
    <div className="btn-group selector">
        {
            c.map(value => <CatButton key={value} category={value} setCategory={setCategory} checked={value === category} />)
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

const getItemCat = item => item.category;
//const getItemUser = item => item.uid;
/*const getCourseNumber = course => (
    course.id.slice(1, 4)
);*/

const Listing = ({ listing, userLocation, setListing, trueLocation}) => {
    const [currentUser] = useUserState();
    return (
      <div className="card bg-light m-1" style={{display: listing.isActive !== undefined && listing.isActive === false ? "none" : ""}}>
        <img
          className="card-img-top"
          src={listing.image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = recycle;
          }}
          alt={listing.title}
          style={{ maxHeight: "25vh", objectFit: "contain"}}
        />
        <div className="card-body">
          <h4 className="card-title">
            {listing.name}
            {currentUser && listing.uid === currentUser.uid ? " (Mine)" : ""}
          </h4>
          <p className="card-text">
            <b>Description:</b> {listing.description}
          </p>
          <p className="card-text">
            <b>Looking For:</b> {listing.lookingFor}
          </p>
          {currentUser && listing.uid !== currentUser.uid ? (
            <TradeButton listing={listing} setListing={setListing} />
          ) : null}
        </div>
        <div className="card-footer text-muted">
          {userToItem(
            userLocation,
            listing.location._lat,
            listing.location._long
          )}{" "}
          {trueLocation ? "miles away" : "from home"}
        </div>
      </div>
    );
};

const ListingList = ({ listings, userLocation, setListing, trueLocation }) => {
    const [query, setQuery] = useState(" ")
    const [category, setCategory] = useState('All');
    const [sortLocation, setSortLocation] = useState(false);
    const [user] = useUserState();
    const [catListings, setCatListings] = useState([]);

    useEffect(() => {
        let filteredListings = listings.filter(listing => listing.name.toLowerCase().includes(query.trim().toLowerCase()));
        if(category !== 'All') {
            filteredListings = filteredListings.filter(item => category === getItemCat(item))
        }
        if(user && sortLocation) {
            filteredListings.sort((a, b) => userToItem(userLocation, a.location?._lat, a.location?._long) - userToItem( userLocation, b.location?._lat, b.location?._long))  
        }
        setCatListings(filteredListings)
    }, [user, query,category, sortLocation, listings, userLocation]);

    return (
        <div>           
            <SearchBar setListings={setCatListings} listings={listings} query={query} setQuery={setQuery}/>
            <SortButton sort={sortLocation} setSort={setSortLocation} />
            <CatSelector category={category} setCategory={setCategory} />
            <div className="listing-list justify-content-center">
                {catListings.map(listing => <Listing trueLocation = {trueLocation} key={listing.id} listing={listing} userLocation={userLocation} setListing={setListing} />)}
            </div>
        </div>
    );
};

const ListingsContainer = ({location, trueLocation}) => {
    const [listing, setListing] = useState(0);
    const [listings, loading, error] = useCollection('listings');
    //const [has_location_access, setLocationAccess] = useState(false);
    const [user] = useUserState();
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {
        if (listings) {
            Promise.all(listings.map(async (item, ind) => {
                const user = await getItemByID("users", item.uid);
                const image = await findImageUrl(item.imageURL);
                listings[ind].location = user ? user.location : new GeoPoint(42.055, -87.675);
                listings[ind].lookingFor = user? user.lookingFor : null;
                listings[ind].image = image;
            })).then(() => setLoading2(false));
        }
    }, [listings]);

    if (loading || loading2) return <div>Loading</div>
    if (error) return <div>Error</div>

     // needs https
    if (!location) return (
        <div className="container">
            <Banner title="EcoExchange" />
            <Alert variant={'danger'}>
                { user ? <span>Access to your location data is not enabled! Many functionalities of EcoExchange rely on your location. If you're signed in, you can add it manually {<Alert.Link as={Link} to={"/profile"}>here</Alert.Link>}</span> : "Access to your location data is not enabled! Many functionalities of EcoExchange rely on your location."}    
            </Alert>
            <NavigationBar />
            <ListingList listings={listings} userLocation={location} setListing={setListing}/>
            <Popup listing={listing} setListing={setListing}></Popup>
        </div>)

    return (
        <div className="container">
            <NavigationBar />
            <ListingList trueLocation = {trueLocation} listings={listings} userLocation={location} setListing={setListing}/>
            {listing ? <Popup listing={listing} setListing={setListing}></Popup> : null}
        </div>)
};

export default ListingsContainer;