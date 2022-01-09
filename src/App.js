import React from 'react';
import './App.css';
import { useCollection } from "./utilities/data";

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
            "description": "Lightweigh forest green jacket, lightly used",
            "category": "Clothing",
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
            "category": "Food",
            "date": "1/1/2021",
        },

    }
};

const categories = { Food: 'Food', Clothes: 'Clothes', Recreation: 'Recreation', 
                     Electronics: 'Electronics', Other: 'Other' };


const Banner = ({ title }) => (
    <h1>{title}</h1>
);



/*const getCourseTerm = course => (
    terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
    course.id.slice(1, 4)
);*/

const Listing = ({ listing }) => (
  <div className="card m-1 p-2">
    <img class="card-img-top" src={listing.imageURL} alt={listing.title} />
    <div className="card-body">
      <h4 className="card-title">{listing.name}</h4>
      <p className="card-text">{listing.description}</p>
      <a href="#" class="btn btn-primary">
        Offer Trade
      </a>
    </div>
  </div>
);

const ListingList = ({ listings }) => (
    <div className="listing-list">
        {Object.values(listings).map(listing => <Listing listing={listing} />)}
    </div>
);

const App = () => {
    const [listings, loading, error] = useCollection('listings');
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error</div>;
    return (
    <div className="container">
        <Banner title={items.title} />
        <ListingList listings={listings} />
    </div>)
};

export default App;