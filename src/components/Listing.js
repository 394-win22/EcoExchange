import { React, useState, useEffect } from 'react';
import { TradeButton, Popup } from "./Popup"
import { useUser, useCollection } from "../utilities/data";
import { userToItem } from "../utilities/location";
import { findImageUrl, useUserState } from '../utilities/firebase';
import NavigationBar from './NavigationBar';
import recycle from "../images/recycle.png";
import c from "./categories";

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
const getItemUser = item => item.uid;
/*const getCourseNumber = course => (
    course.id.slice(1, 4)
);*/

const Listing = ({ listing, userLocation, setListing}) => {
    const [imageUrl, setImageUrl] = useState("");
    useEffect(() => {
        findImageUrl(listing.imageURL)
            .then((url) => setImageUrl(url))
            .catch((err) => console.log(err));
    }, [listing.imageURL]);
    const [user, loading, error] = useUser("users", listing.uid);
    return (
        <div className="card bg-light m-1">
            <img className="card-img-top" src={imageUrl} 
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src=recycle;
                }} alt={listing.title}/>
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
    const [user] = useUserState();
    const [catListings, setCatListings] = useState([]);
    useEffect(() => {
        if (user) {
            setCatListings(Object.values(listings).filter(item => category === getItemCat(item) 
            && user?.uid !== getItemUser(item)));
        }
    }, [user, category]);
    return (
        <>
            <CatSelector category={category} setCategory={setCategory} />
            <div className="listing-list">
                {catListings.map(listing => <Listing key={listing.id} listing={listing} userLocation={userLocation} setListing={setListing} />)}
            </div>
        </>
    );
};

const ListingsContainer = ({location}) => {
    const [listing, setListing] = useState(0);
    const [listings, loading, error] = useCollection('listings');
    if (loading) return <div>Loading</div>
    if (error) return <div>Error</div>


     // needs https

    return (
        <div className="container">
            <Banner title="EcoExchange" />
            <NavigationBar />
            <ListingList listings={listings} userLocation={location} setListing={setListing}/>
            <Popup listing={listing} setListing={setListing}></Popup>
        </div>)
};

export default ListingsContainer;