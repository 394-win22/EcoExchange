import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { useUserState, uploadUser } from "../utilities/firebase";
import { useUser } from "../utilities/data";
import { SignInButton } from "./NavigationBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const Profile = () => {
  const [user] = useUserState();
  const [data, loading, error] = useUser("users", user?.uid);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(false);
  const [bio, setBio] = useState(false);
  const [lookingFor, setLookingFor] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data) {
      setName(data.name);
      setBio(data.bio);
      setLookingFor(data.lookingFor);
    }
  }, [data]);

  const onSubmit = () => {
    console.log(name, bio, lookingFor);
    uploadUser("testa", {
      bio: bio,
      lookingFor: lookingFor,
      name: name,
      imageURL: user.photoURL,
      location: user.location,
      email: user.email,
    });
    handleClose();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    padding: "1rem",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      {user && data ? (
        <div className="container">
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Grid container spacing={2} sx={style}>
              <Grid item xs={8}>
                <h1>Edit Profile</h1>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Name"
                  defaultValue={data.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Bio"
                  defaultValue={data.bio}
                  multiline
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Looking For"
                  defaultValue={data.lookingFor}
                  multiline
                  rows={4}
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                />
              </Grid>
              <Grid item xs={8}>
                <Button onClick={() => onSubmit()}>Submit Changes</Button>
              </Grid>
            </Grid>
          </Modal>
          <NavigationBar />
          <h1>{data.name}</h1>
          <img src={data.imageURL} alt="" />
          <p>{data.bio}</p>
          <p>{data.lookingFor}</p>
          <Button onClick={() => setOpen(true)}>Edit Profile</Button>
        </div>
      ) : (
        <SignInButton />
      )}
    </>
  );
};

export default Profile;
