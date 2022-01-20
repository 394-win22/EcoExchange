import React, {useState} from "react";
import { dummyUserId, uploadFile, uploadListing } from "../utilities/firebase";
import TextField from '@mui/material/TextField';
import NavigationBar from "./NavigationBar";
import { GeoPoint, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Banner = ({ title }) => (
  <h1>{title}</h1>
);

const ListingUpload = ({location}) => {
    const [file, setFile] = useState(null);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    let navigate = useNavigate();
    const onSubmit = () => {
        uploadListing({name: itemName, description, category, 
          imageURL: file.name, date: Timestamp.fromMillis(Date.now()), uid: dummyUserId,
          location: new GeoPoint(location.coords.latitude, location.coords.longitude)});
        uploadFile(file);
        navigate("/", { replace: true });
    }

    return (
      <div className="container">
          <Banner title="Add Listing" />
          <NavigationBar/>
          <TextField required label="Name" onChange={(e) => setItemName(e.target.value)} />
          <TextField required  multiline label="Description" onChange={(e) => setDescription(e.target.value)} rows={5}/>
          <TextField required label="Category" onChange={(e) => setCategory(e.target.value)} />
        <input
          type="file"
          accept="image/*"
          id="myFile"
          name="filename"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={() => onSubmit()}>submit</button>
      </div>
    );
  };

export default ListingUpload;