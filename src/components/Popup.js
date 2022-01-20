import { React, useState, useEffect } from 'react';
import { findImageUrl } from '../utilities/firebase';
import { Dropdown } from './dropdown'
import '../App.css';
import arrows from '../images/arrows.png';
import recycle from '../images/recycle.png';

//Reference: https://getbootstrap.com/docs/5.1/components/modal/
export const Popup = ({ listing, setListing }) => {
    const style = {
        display: (listing!==0)? "block":"none"
    };
    const [imageUrl_target, setImageUrl_target] = useState("");
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
    return (
        <div className="modal" tabIndex="-1" style={style}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">{(listing !== 0)? listing.name : "none"}</div>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setListing(0)}></button>
                    </div>
                    <div className="modal-body">
                        <p>{(listing !== 0) ? listing.description : "none"}</p>

                        <div className="popup-item">
                            <div className="card bg-light m-1">
                                <img className="card-img-top" style={{maxWidth: "200px",maxHeight: "200px"}} src={imageUrl_select} 
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src=recycle;
                                  }} alt={listing.title}/>
                                <div className="card-body" style={{maxWidth: "200px",maxHeight: "200px"}}>
                                    <h4 className="card-title">{selected.name}</h4>
                                </div>
                            </div>
                            <div>
                                <img className="swap-arrows" style={{maxWidth: "100px",maxHeight: "100px",marginTop: "100px"}} src={arrows}/>
                            </div>

                            <div className="card bg-light m-1">
                                <img className="card-img-top" style={{maxWidth: "200px",maxHeight: "200px"}}src={imageUrl_target} 
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src=recycle;
                                  }} alt={listing.title}/>
                                <div className="card-body" style={{maxWidth: "200px",maxHeight: "200px"}}>
                                    <h4 className="card-title">{listing.name}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Dropdown setSelected={setSelected}></Dropdown>
                        <button type="button" className="btn btn-secondary" onClick={() => setListing(0)}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => {
                            setListing(0);
                            setTimeout(() => alert("Trade Sent"), 0);
                        }}>Offer Trade</button>
                    </div>
                </div>
            </div>
        </div>)
};

export const TradeButton = ({ listing, setListing}) => (
    <a href="#" className="btn btn-primary" onClick={() => setListing(listing) }>
            Offer Trade
    </a>
);