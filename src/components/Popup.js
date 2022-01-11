import { React} from 'react';
import '../App.css';

//Reference: https://getbootstrap.com/docs/5.1/components/modal/
export const Popup = ({listing}) => {
    return(
        <div className="Modal">
            <div className="Modal-body">
                <div>
                    <p>{listing.description}</p>
                    <button type="button" class="btn-close" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>);
};

export const TradeButton = ({ listing }) => (
    <a href="#" className="btn btn-primary" onClick={() => Popup(listing)}>
            Offer Trade
      </a>
);