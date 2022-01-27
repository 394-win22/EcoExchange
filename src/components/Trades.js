import React, {useState, useEffect, useCallback} from "react";
import NavigationBar from './NavigationBar';
import { getTrades, useUser } from "../utilities/data";
import { useUserState } from "../utilities/firebase";

const Trade = ({trade, type /*incoming false, outgoing true*/}) => {
    const [reqListing, loading1, error1] = useUser("listings", trade.requesterListingID);
    const [posListing, loading2, error2] = useUser("listings", trade.posterListingID);
    
    if (loading1 || loading2) return <div>Loading...</div>;
    if (error1 || error2) return <div>Error</div>;
    if (type) {
        return <h6>You offerred your {reqListing.name} for {posListing.name}</h6>;
    } else {
        return <h6>Someone offered {reqListing.name} for your {posListing.name}</h6>;
    }
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
    }, [user]);
    return (
        <div className="container">
            <NavigationBar />
            <div>
                <h4>Incoming Trades</h4>
                {incoming.map(item => <Trade trade={item} type={false} />)}
            </div>
            <div>
                <h4>Outoging Trades</h4>
                <div class="container horizontal-scrollable">
                <div class="row">
                    {outgoing.map(item => <Trade trade={item} type={true} />)}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Trades;