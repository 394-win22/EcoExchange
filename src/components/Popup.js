import { React } from 'react';
import { Dropdown } from './dropdown'
import '../App.css';

//Reference: https://getbootstrap.com/docs/5.1/components/modal/
export const Popup = ({ listing, setListing }) => {
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
                            

                            <div>My item</div>
                            <div>==></div>
                            <div>Other Item</div>
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

export const TradeButton = ({ listing, setListing}) => (
    <a href="#" className="btn btn-primary" onClick={() => setListing(listing) }>
            Offer Trade
    </a>
);