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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

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
                  <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justify="center"
                      style={{ minHeight: '100vh' }}
                  >
                      <Grid item xs={3}>
                          <Card sx={{ maxWidth: 345, maxHeight: 1000 }}>
                              <CardMedia
                                  component="img"
                                  image={data.imageURL}
                                  alt="../images/recycle.png"
                              />
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      {data.name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      <strong> Biography: </strong>
                                      {data.bio}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      <strong> Looking For: </strong>
                                          {data.lookingFor}
                                  </Typography>
                                  <br/>
                                  <Button variant="contained" onClick={() => setOpen(true)}>Edit Profile</Button>
                              </CardContent>
                          </Card>
                               </Grid>
                      </Grid>
        </div>
      ) : (
        <SignInButton />
      )}
    </>
  );
};

export default Profile;
