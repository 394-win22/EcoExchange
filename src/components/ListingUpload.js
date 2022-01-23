import React, { useState } from "react";
import { useUserState, uploadFile, uploadListing } from "../utilities/firebase";
import NavigationBar from "./NavigationBar";
import { GeoPoint, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import categories from "./categories";

const Banner = ({ title }) => <h1>{title}</h1>;

const ListingUpload = ({ location }) => {
  const [file, setFile] = useState(null);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [user] = useUserState();

  let navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    if(user) {
      uploadListing({
        name: itemName,
        description,
        category,
        imageURL: file.name,
        date: Timestamp.fromMillis(Date.now()),
        uid: user.uid,
        location: new GeoPoint(
          location.coords.latitude,
          location.coords.longitude
        ),
      });
      uploadFile(file);
      navigate("/", { replace: true });
    } else {
      alert('Please login before uploading a listing');
    }
  };

  return (
    <div className="container">
      <Banner title="Add Listing" />
      <NavigationBar />

      <form className="form my-3">
        <div className="form-group my-3">
          <label for="Name Input">Name</label>
          <input
            className="form-control"
            placeholder="Name"
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className="form-group my-3">
          <label for="Category Select">Category</label>
          <select
            className="form-control"
            id="Category Select"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category}> {category} </option>
            ))}
          </select>
        </div>
        <div className="form-group my-3">
          <label for="Description Input">Description</label>
          <textarea
            className="form-control"
            placeholder="Describe your item here"
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          ></textarea>
        </div>
        <div className="form-group my-3">
          <label for="myFile">Upload Image</label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="myFile"
            name="filename"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="form-group my-3">
          <button className="btn btn-success" onClick={(e) => onSubmit(e)}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListingUpload;
