import React, { useState } from "react";
import { useUserState, uploadFile, uploadListing } from "../utilities/firebase";
import NavigationBar from "./NavigationBar";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
//import categories from "./categories";
import uploadCategories from "./uploadCategories";
import recycle from "../images/recycle.png";

const ListingUpload = ({ }) => {
  const [file, setFile] = useState(null);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Select...");
  const [user] = useUserState();

  let navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    if(user) {
      uploadListing({
        name: itemName,
        description,
        category,
        imageURL: user.uid + "/" + file.name,
        date: Timestamp.fromMillis(Date.now()),
        uid: user.uid,
      });
      uploadFile(file, user.uid);
      navigate("/", { replace: true });
    } else {
      alert('Please login before uploading a listing');
    }
  };

  return (
    <div className="container">
      <NavigationBar />

      <form className="form my-3" onSubmit={e => e.preventDefault()}>
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
            {uploadCategories.map((category) => (
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
                  <img
                      className="card-img-top"
                      style={{ maxWidth: "20em", maxHeight: "20em", objectFit: "contain" }}
                      onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = recycle;
                          console.log(file)
                      }}
                      src={file == null ? recycle : URL.createObjectURL(file)}
                      alt={itemName}
                  />
        </div>
              <div className="form-group my-3">
                  
                  
                  <button className = "btn btn-primary me-2"><label for="upload-by-media">Upload Image</label></button>
                  <button className = "btn btn-primary"><label for="upload-by-camera">Take picture</label></button>
                  
                  
          <br />
          <input
                      type="file"
                      accept="image/*"
                      id="upload-by-media"
                      style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
                      type="file"
                      accept="image/*"
                      id="upload-by-camera"
                      style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
            capture
          />
        </div>
        <div className="form-group my-3">
          <button disabled={category==="Select..." || itemName==="" || file==null} className="btn btn-success" onClick={(e) => onSubmit(e)}>
            Post!
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListingUpload;
