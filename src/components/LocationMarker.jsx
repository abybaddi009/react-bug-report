import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Marker, Tooltip, useMap } from 'react-leaflet';

import L from "leaflet";

import PersonIcon from "../assets/icons/location_red.png";
import BarberIcon from "../assets/icons/barber-chair.png";

import { fetchUserLocationAsync, selectUserLocation } from '../redux/features/userLocation/UserLocationSlice';

const iconBarber = new L.Icon({
  iconUrl: BarberIcon,
  iconRetinaUrl: BarberIcon,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
});

const iconPerson = new L.Icon({
  iconUrl: PersonIcon,
  iconRetinaUrl: PersonIcon,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [25, 25],
});

export const BarberMarker = (props) => {
  return props.position === null ? null : (
    <Marker
      icon={iconBarber}
      eventHandlers={{ click: props.onClick }}
      {...props}
    >
      {props.children}
    </Marker>
  )
}

export default () => {
  const userLocation = useSelector(selectUserLocation);
  const [position, setPosition] = React.useState(null);
  const [bbox, setBbox] = React.useState([]);
  const dispatch = useDispatch();

  const map = useMap();

  React.useEffect(() => {
    if (Object.keys(userLocation.data?.position).length > 0 && userLocation.status === "success") {
      const crd = userLocation.data.position;
      setPosition([crd.latitude, crd.longitude]);
      map.flyTo([crd.latitude, crd.longitude], map.getZoom());
    }
    else if (userLocation.status === "idle") {
      dispatch(fetchUserLocationAsync());
    }
  }, [map, userLocation, dispatch]);

  // React.useEffect(() => {
  //   map.locate().on("locationfound", function (e) {
  //     setPosition(e.latlng);
  //     map.flyTo(e.latlng, map.getZoom());
  //     // const radius = e.accuracy;
  //     // const circle = L.circle(e.latlng, radius);
  //     // circle.addTo(map);
  //     setBbox(e.bounds.toBBoxString().split(","));
  //   });
  // }, [map]);

  return position === null ? null : (
    <Marker
      position={position}
      icon={iconPerson}
    >
      <Tooltip>
        You are here.
      </Tooltip>
    </Marker>
  );
}
