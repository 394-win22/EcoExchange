import React, { useEffect, useState } from "react";
import "./App.css";
import { useCollection } from "./utilities/data";
import { findImageUrl } from "./utilities/firebase";
import ListingUpload from "./components/ListingUpload"

const Banner = ({ title }) => <h1>{title}</h1>;

const Listing = ({ listing }) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    findImageUrl(listing.imageURL)
      .then((url) => setImageUrl(url))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="card bg-light m-1">
      <img className="card-img-top" src={imageUrl} alt={listing.title} />
      <div className="card-body">
        <h4 className="card-title">{listing.name}</h4>
        <p className="card-text">{listing.description}</p>
        <a href="#" className="btn btn-primary">
          Offer Trade
        </a>
      </div>
      <div className="card-footer text-muted">X.x miles away</div>
    </div>
  );
};

const ListingList = ({ listings }) => (
  <div className="listing-list">
    {Object.values(listings).map((listing) => (
      <Listing key={listing.id} listing={listing} />
    ))}
  </div>
);

const App = () => {
  const [listings, loading, error] = useCollection("listings");
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  return (
    <div className="container">
      <Banner title={"EcoExchange"} />
      <ListingList listings={listings} />
      <ListingUpload />
    </div>
  );
};

export default App;
