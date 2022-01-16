import { React } from 'react';
import { Dropdown } from './dropdown'
import '../App.css';

//Reference: https://getbootstrap.com/docs/5.1/components/modal/
export const Popup = ({ listing, setListing, imageUrl }) => {
    const style = {
        display: (listing!==0)? "block":"none"
    };
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
                                <img className="card-img-top" src={imageUrl} alt={listing.title} />
                                <div className="card-body">
                                    <h4 className="card-title">{listing.name}</h4>
                                </div>
                                <div className="card-footer text-muted">{userToItem(userLocation, listing.location._lat, listing.location._long)} miles away</div>
                            </div>

                            <div>==></div>
                            <div className="card bg-light m-1">
                                <img className="card-img-top" src={imageUrl} alt={listing.title} />
                                <div className="card-body">
                                    <h4 className="card-title">{listing.name}</h4>
                                </div>
                                <div className="card-footer text-muted">{userToItem(userLocation, listing.location._lat, listing.location._long)} miles away</div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setListing(0)}>Close</button>
                        <button type="button" className="btn btn-primary">Trade</button>
                        <Dropdown></Dropdown>
                    </div>
                </div>
            </div>
        </div>)
};

export const TradeButton = ({ listing, setListing, imageUrl, setImgUrl }) => (
    <a href="#" className="btn btn-primary" onClick={() => setListing(listing)}>
            Offer Trade
    </a>
);