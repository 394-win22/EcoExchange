import React from "react";
import {Modal, Grid, Button} from "@mui/material";
import GoogleMaps from "./LocationSetterMUI.js";


const LocationSetter = ({location, setLocation, latLonData, setLatLonData, open, setOpen, style, onSubmit}) => {

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Grid container spacing={2} sx={style}>
              <Grid item xs={8}>
                <h4>Set your Location</h4>
              </Grid>
              <Grid item xs={8}>
                <GoogleMaps value = {location} setValue = {setLocation} latLonValue = {latLonData} setLatLonValue = {setLatLonData} />
              </Grid>
              <Grid item xs={8}>
                <Button onClick={() => {
                  onSubmit();
                  setOpen(false);
                }}>Submit Changes</Button>
              </Grid>
            </Grid>
        </Modal>
    )
}

export default LocationSetter