import React, {useState} from "react";
import { uploadFile } from "../utilities/firebase";
import TextField from '@mui/material/TextField';
import NavigationBar from "./NavigationBar";

const Banner = ({ title }) => (
  <h1>{title}</h1>
);

const ListingUpload = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('')
    const onSubmit = () => {
        
    }

    return (
      <div className="container">
          <Banner title="Add Listing" />
          <NavigationBar/>
          <TextField required label="Name" onChange={(e) => setName(e)} />
          <TextField required  multiline label="Description" onChange={(e) => setDescription(e)} rows={5}/>
          <TextField required label="Category" onChange={(e) => setCategory(e)} />
        <input
          type="file"
          id="myFile"
          name="filename"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={() => onSubmit()}>submit</button>
      </div>
    );
  };

export default ListingUpload;