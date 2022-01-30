import React, {useState, useEffect, useCallback} from "react";
import NavigationBar from './NavigationBar';
import { getTrades, useUser } from "../utilities/data";
import { useUserState, findImageUrl } from "../utilities/firebase";
import "../App.css";
import { ListingCard } from "./Popup";
import arrows from "../images/arrows.png";

const Trade = ({trade, type /*incoming false, outgoing true*/}) => {
    const [reqListing, loading1, error1] = useUser("listings", trade.requesterListingID);
    const [posListing, loading2, error2] = useUser("listings", trade.posterListingID);
    const [reqImageUrl, setReqImageUrl] = useState("");
    const [posImageUrl, setPosImageUrl] = useState("");

    useEffect(() => {
        if (reqListing) findImageUrl(reqListing.imageURL)
            .then((url) => setReqImageUrl(url))
            .catch((err) => console.log(err));
        if (posListing)  findImageUrl(posListing.imageURL)
            .then((url) => setPosImageUrl(url))
            .catch((err) => console.log(err));
    }, [reqListing, posListing]);
    
    if (loading1 || loading2) return <div>Loading...</div>;
    if (error1 || error2) return <div>Error</div>;

    return (
        <div className="scrollmenu-element">
            {type ? <h6>You offerred your {reqListing.name} for {posListing.name}</h6> : 
            <h6>Someone offered {reqListing.name} for your {posListing.name}</h6>}
            <div className="container">
                <div className = "row">
                    {ListingCard(reqListing, reqImageUrl)}
                    <div className="col-2 d-flex justify-content-center">
                        <img
                        className="swap-arrows"
                        style={{
                            maxWidth: "4rem",
                            maxHeight: "4rem",
                            margin: "9vh 0.5em",
                        }}
                        src={arrows}
                        />
                    </div>
                    {ListingCard(posListing, posImageUrl)}
                </div>
            </div>
        </div>);
}

const Trades = () => {
    const [outgoing, setOutgoing] = useState([]);
    const [incoming, setIncoming] = useState([]);
    const [user] = useUserState();

    const fetchTrades = useCallback(async () => {
        const outgoingTrades = await getTrades(user.uid, false);
        const incomingTrades = await getTrades(user.uid, true);
        setOutgoing(outgoingTrades);
        setIncoming(incomingTrades);
    }, [user]);

    useEffect(() => {
        if (user && user.uid) fetchTrades();
    }, [user, fetchTrades]);
    return (
        <div class="container">
            <NavigationBar />
            <div>
                <h4>Incoming Trades</h4>
                <div className="scrollmenu">
                {incoming.map(item => <Trade key={item.id} trade={item} type={false} />)}
                </div>
            </div>
            <div>
                <h4>Outoging Trades</h4>
                <div className="scrollmenu">
                    {outgoing.map(item => <Trade key={item.id} trade={item} type={true} />)}
                </div>
            </div>
            
       </div>
    )
}

export default Trades;