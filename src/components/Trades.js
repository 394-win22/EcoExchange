import React, { useState, useEffect, useCallback } from "react";
import NavigationBar from './NavigationBar';
import { getTrades, useUser, getMessages } from "../utilities/data";
import { useUserState, findImageUrl, uploadMessage, changeTradeStatus, deleteTrade } from "../utilities/firebase";
import "../App.css";
import { ListingCard } from "./Popup";
import arrows from "../images/arrows.png";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Timestamp } from "firebase/firestore";

const colors = {
    PENDING: "warning",
    ACCEPTED: "success",
    DECLINED: "danger"
}

const Trade = ({ trade, type /*incoming false, outgoing true*/ }) => {
    const [reqListing, loading1, error1] = useUser("listings", trade.requesterListingID);
    const [posListing, loading2, error2] = useUser("listings", trade.posterListingID);
    const [reqImageUrl, setReqImageUrl] = useState("");
    const [posImageUrl, setPosImageUrl] = useState("");
    const [messages, setMessages] = useState([]);
    const otherUserId = type ? trade.posterID : trade.requesterID;
    const myUserId = type ? trade.requesterID : trade.posterID;
    const [otherUser, loading3, error3] = useUser("users", otherUserId);
    const [msg, setMsg] = useState("");
    const [currStatus, setCurrStatus] = useState(trade.status);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        if (reqListing) findImageUrl(reqListing.imageURL)
            .then((url) => setReqImageUrl(url))
            .catch((err) => console.log(err));
        if (posListing) findImageUrl(posListing.imageURL)
            .then((url) => setPosImageUrl(url))
            .catch((err) => console.log(err));
        getMessages(trade.id)
            .then((msgs) => setMessages(msgs))
            .catch((err) => console.log(err));
    }, [reqListing, posListing, trade.id]);

    const sendMessage = (e) => {
        e.preventDefault();
        const newMsg = {
            tradeID: trade.id,
            message: msg,
            uid: myUserId,
            date: Timestamp.fromMillis(Date.now())
        }
        setMessages([...messages, newMsg]);
        uploadMessage(newMsg);
        setMsg("");
    }

    const tradeStatus = async (status) => {
        setCurrStatus(status);
        if(status === "ACCEPTED") {
            
        }
        await changeTradeStatus(trade.id, status);
    }

    const tradeDeleteSubmit = async () => {
        deleteTrade(trade.id);
        setIsDeleted(true);
    }

    if (loading1 || loading2 || loading3) return <div>Loading...</div>;
    if (error1 || error2 || error3) return <div>Error</div>;

    return (
        <Accordion sx={isDeleted ? {display: "none"} : {}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <div className={`me-4 text-${colors[currStatus]}`}>
                    {currStatus}
                </div>
                <Typography>
                    {type ? <>You offered your {reqListing.name} for {otherUser.name}'s {posListing.name}</> :
                        <>{otherUser.name} offered {reqListing.name} for your {posListing.name}</>}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className="container">
                    <div className="row mb-2">
                        {ListingCard(reqListing, reqImageUrl)}
                        <div className="col-2 d-flex justify-content-center">
                            <img
                                className="swap-arrows"
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "4rem",
                                    margin: "8vh 0.3em",
                                }}
                                src={arrows}
                                alt="Trade"
                            />
                        </div>
                        {ListingCard(posListing, posImageUrl)}
                    </div>
                    {messages.map(msg => <div key={msg.id}>{msg.uid === otherUserId ? otherUser.name : "You"}: {msg.message}</div>)}
                    <div className="row my-2">
                        <div className="col-md-9">
                            <textarea className="form-control" value={msg} onChange={(e) => setMsg(e.target.value)}>
                            </textarea>
                        </div>
                        <div className="col-md-3">
                            <button className="btn-success btn" onClick={e => sendMessage(e)} disabled={msg==""}>
                                Send
                            </button>
                        </div>
                    </div>
                    {type || (currStatus !== "PENDING") ? null :
                        <div>
                            <button className="btn btn-success me-2" onClick={() => tradeStatus("ACCEPTED")}>
                                Accept
                        </button>
                            <button className="btn btn-danger" onClick={() => tradeStatus("DECLINED")}>
                                Decline
                        </button>
                        </div>}
                    {(currStatus === "DECLINED") && (
                        <div>
                            <button className="btn btn-danger me-2" onClick={() => tradeDeleteSubmit()}>
                                Delete Trade
                            </button>
                        </div>)}
                </div>
            </AccordionDetails>
        </Accordion>
    );
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
        <div className="container">
            <NavigationBar />
            <div className="row">
                <div className="col-md-6 p-1">
                    <h4>Incoming Trades</h4>
                    <div className="card">
                        {incoming.map(item => <Trade key={item.id} trade={item} type={false} />)}
                    </div>
                </div>
                <div className="col-md-6 p-1">
                    <h4>Outgoing Trades</h4>
                    <div className="card">
                        {outgoing.map(item => <Trade key={item.id} trade={item} type={true} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trades;