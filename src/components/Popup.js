import { React, useState, useEffect } from "react";
import { findImageUrl, uploadTrade } from "../utilities/firebase";
import { Dropdown } from "./dropdown";
import "../App.css";
import arrows from "../images/arrows.png";
import recycle from "../images/recycle.png";
import { Timestamp } from "firebase/firestore";
import { maxHeight } from "@mui/system";
import { useNavigate } from "react-router-dom";

const ListingCard = (listing, imageUrl_target) => 
  <div className="col-4 row align-items-center">
    <div className="col card bg-light  align-items-center">
      <img
        className="card-img-top"
        style={{ maxHeight: "30vh", objectFit: "contain" }}
        src={imageUrl_target}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = recycle;
        }}
        alt={listing.title}
      />
      <div
        className="card-body"
      >
        <h6 className="card-title text-center">{listing.name}</h6>
      </div>
    </div>
  </div>

//Reference: https://getbootstrap.com/docs/5.1/components/modal/
export const Popup = ({ listing, setListing }) => {
  const style = {
    display: listing !== 0 ? "block" : "none",
    // maxWidth: '75%',
    // maxHeight: '90%',
  };
  const navigate = useNavigate();
  const [imageUrl_target, setImageUrl_target] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    findImageUrl(listing.imageURL)
      .then((url) => setImageUrl_target(url))
      .catch((err) => console.log(err));
  }, [listing.imageURL]);
  const [selected, setSelected] = useState("");
  const [imageUrl_select, setImageUrl_select] = useState("");
  useEffect(() => {
    findImageUrl(selected.imageURL)
      .then((url) => setImageUrl_select(url))
      .catch((err) => console.log(err));
  }, [selected.imageURL]);

  const offerTrade = () => {
    setListing(0);
    if (uploadTrade({
        listing1: selected.id,
        listing2: listing.id,
        message: message,
        date: Timestamp.fromMillis(Date.now()),
        status: "PENDING"
    })) alert("Trade Sent");
    else alert("Error Occurred");

  };
  return (
    <div className="modal" tabIndex="-1" style={style}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {listing !== 0 ? listing.name : "none"}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setListing(0)}
            ></button>
          </div>
          <div className="modal-body justify-content-center">
            <p class="">
              <strong>Item Description:</strong>{" "}
              {listing !== 0 ? listing.description : "none"}
            </p>

            <div className="popup-item">
              <div className="container">
                <div className="row justify-content-center">
                  {ListingCard(selected, imageUrl_select)}
                  <div className="col-2 d-flex justify-content-center">
                    <img
                      className="swap-arrows"
                      style={{
                        maxWidth: "12vh",
                        maxHeight: "12vh",
                        margin: "9vh 0.5em",
                      }}
                      src={arrows}
                    />
                  </div>
                  {ListingCard(listing, imageUrl_target)}
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row m-2">
              <div className="form-group col-md-5">
                <label for="Message Input">Message</label>
                <textarea
                  className="form-control"
                  placeholder="Add any optional message you want the recipient to receive (contact info, trade detail, etc.)"
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                ></textarea>
              </div>
              <div className="col-md-3 d-flex justify-content-center align-items-center">
                <Dropdown setSelected={setSelected}></Dropdown>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <div className="container">
                  <div className="row mb-1">
                    <button
                      type="button"
                      className="btn btn-secondary col-4"
                      onClick={() => {
                        setListing(0);
                        setSelected("");
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary col-7 offset-1"
                      onClick={() => offerTrade()}
                      disabled={!selected}
                    >
                      Offer Trade
                    </button>
                  </div>
                  <div className="row">
                    <button
                      type="button"
                      className="btn btn-success offset-0 col-12 py-0"
                      onClick={() => navigate("/add-listing")}
                      style={{ fontSize: 10 }}
                    >
                      Upload Item to Inventory
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TradeButton = ({ listing, setListing }) => (
  <a href="#" className="btn btn-primary" onClick={() => {
      setListing(listing);
  }}>
    Offer Trade
  </a>
);
