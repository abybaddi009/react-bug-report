import React from "react";
import { Backdrop, Box, Button, CircularProgress, Typography } from "@mui/material";
import { MapContainer, TileLayer, Popup } from 'react-leaflet';

import LocationMarker, { BarberMarker } from "../components/LocationMarker";
import { fetchUserLocationAsync, selectUserLocation } from "../redux/features/userLocation/UserLocationSlice";
import { useDispatch, useSelector } from "react-redux";
import ShopDetails from "../components/ShopDetails";

export default () => {
  const userLocation = useSelector(selectUserLocation);
  const { position, owners } = userLocation.data;
  const dispatch = useDispatch();

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "whitesmoke",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ShopDetails />
        <Backdrop
          sx={{ color: '#fff', zIndex: 1000 }}
          open={userLocation.status !== "success"}
        >
          {userLocation.status === "loading" && <CircularProgress color="inherit" />}
          {userLocation.status === "failed" && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="h6">
                Failed to fetch location.
              </Typography>
              <Button sx={{ mt: 2, mb: 2 }} variant="outlined" color="warning" onClick={() => dispatch(fetchUserLocationAsync())}>
                Retry
              </Button>
            </Box>
          )}
        </Backdrop>
        <MapContainer
          style={{ height: "80vh", width: "100%" }}
          center={[position.latitude, position.longitude]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
          {owners.map(owner => (
            <BarberMarker position={owner.position} onClick={e => console.log(owner.id)} key={owner.id}>
              <Popup>{owner.name}</Popup>
            </BarberMarker>
          ))}
        </MapContainer>
      </Box>
    </>
  );
};
