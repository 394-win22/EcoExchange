import React, { useState, useEffect } from "react";
import { findImageUrl, uploadTrade, uploadMessage } from "../utilities/firebase";
import { Dropdown } from "./dropdown";
import "../App.css";
import arrows from "../images/arrows.png";
import recycle from "../images/recycle.png";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const ListingCard = (listing, imageUrl_target) => 
  <div className="col-5 row d-flex justify-content-center align-items-center">
    <div className="col card bg-light align-items-center">
      <img
        className="card-img-top"
        style={{ maxHeight: "23vh", objectFit: "contain" }}
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
        <h6 className="text-center my-0" style={{overflowX: "wrap",overflowY: "wrap"}}>{listing.name}</h6>
      </div>
    </div>
  </div>

//Reference: https://getbootstrap.com/docs/5.1/components/modal/
export const Popup = ({ listing, setListing }) => {
  const style = {
    display: listing !== 0 ? "block" : "none",
    // maxWidth: '75%',
    // maxHeight: '100vh',
  };
  const navigate = useNavigate();
  //const [imageUrl_target, setImageUrl_target] = useState("");
  const [message, setMessage] = useState("");
  // useEffect(() => {
  //   findImageUrl(listing.imageURL)
  //     .then((url) => setImageUrl_target(url))
  //     .catch((err) => console.log(err));
  // }, [listing.imageURL]);
  const [selected, setSelected] = useState("");
  const [imageUrl_select, setImageUrl_select] = useState("");
  useEffect(() => {
    findImageUrl(selected.imageURL)
      .then((url) => setImageUrl_select(url))
      .catch((err) => console.log(err));
  }, [selected.imageURL]);

  const offerTrade = async () => {
    setListing(0);
    const tradeID = await uploadTrade({
        requesterID: selected.uid,
        posterID: listing.uid,
        requesterListingID: selected.id,
        posterListingID: listing.id,
        date: Timestamp.fromMillis(Date.now()),
        status: "PENDING"
    })
    if (!tradeID) {
      alert("Error Occurred");
      return
    }
    uploadMessage({
      tradeID,
      message,
      uid: selected.uid,
      date: Timestamp.fromMillis(Date.now())
    })
    alert("Trade Sent");
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
                <div className="row justify-content-center align-items-center">
                  {ListingCard(selected, imageUrl_select)}
                  <div className="col-2 d-flex justify-content-center">
                    <img
                      className="swap-arrows"
                      style={{
                        width: "100%",
                        // maxWidth: "4em",
                        // maxHeight: "10vw",
                      }}
                      src={arrows}
                      alt="Trade"
                    />
                  </div>
                  {ListingCard(listing, listing.image)}
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
                  rows={4}
                ></textarea>
              </div>
              <div className="col-md-3 d-flex justify-content-center align-items-center my-2">
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
                      className="btn btn-success col-7 offset-1"
                      onClick={() => offerTrade()}
                      disabled={!selected}
                    >
                      Offer Trade
                    </button>
                  </div>
                  <div className="row">
                    <button
                      type="button"
                      className="btn btn-primary offset-0 col-12"
                      onClick={() => navigate("/add-listing")}
                      // style={{ fontSize: 12 }}
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
