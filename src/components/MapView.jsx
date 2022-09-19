import React, { useState, useRef, useMemo, useEffect } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  DirectionsRenderer,
  Polyline
} from "@react-google-maps/api";
import { connect } from "react-redux";

const MapView = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCgrj21RlkT5_e0jdrNOw6GEFoH8z2UwJU",
    libraries: ["places", "directions"]
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [polyLineOptions, setPolyLineOptions] = useState(null);

  const center = useMemo(() => {
    const {
      selectedRoute: { stops = [] }
    } = props;
    let lat = 0;
    let lng = 0;
    setPolyLineOptions(null);
    stops.forEach((stop) => {
      lat += stop.lat;
      lng += stop.lng;
    });
    return { lat: lat / stops.length, lng: lng / stops.length };
  }, []);

  useEffect(() => {
    const {
      selectedRoute: { stops }
    } = props;
    const polyLineOptions = stops?.map((place) => ({
      lat: place.lat,
      lng: place.lng
    }));
    setPolyLineOptions(polyLineOptions);
  }, [map]);

  // const [directionResult, setDirections] = useState(null);

  // const getLatLong = (obj) => {
  //   return new google.maps.LatLng(obj.lat, obj.lng);
  // };

  // useEffect(() => {
  //   (async () => {
  //     const {
  //       selectedRoute: { stops: places }
  //     } = props;
  //     const destination = getLatLong(places.pop());
  //     const [origin, ...wayPoints] = places.map((place) => getLatLong(place));
  //     const directionsService = new google.maps.DirectionsService();

  //     try {
  //       const response = await directionsService.route({
  //         origin: origin,
  //         destination: destination,
  //         waypoints: wayPoints,
  //         travelMode: "DRIVING"
  //       });
  //       console.log("directions received", response);
  //       setDirections(response);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  // React.useEffect(() => {
  //   console.log(isLoaded, loadError, "look");
  // }, [isLoaded]);

  if (!isLoaded) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    const {
      selectedRoute: { stops }
    } = props;
    return (
      <GoogleMap
        zoom={6}
        center={center}
        mapContainerClassName="map-container"
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        {stops &&
          stops.map((stop, index) => (
            <Marker key={index} position={{ lat: stop.lat, lng: stop.lng }} />
          ))}
        {polyLineOptions && <Polyline path={polyLineOptions} geodesic={true} />}
        {/* {directionResult && <DirectionsRenderer directions={directionResult} />} */}
      </GoogleMap>
    );
  }
};

const mapStateToProps = (state) => ({
  selectedRoute: state.selectedRoute
});

const mapDispatchToProps = (dispatch) => ({
  actions: {}
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
