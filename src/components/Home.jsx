import React, { useState } from "react";
import { Box, Button, Drawer, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const [selectedCard, setSelectedCard] = useState(-1);
  const navigate = useNavigate();
  const {
    allRoutes,
    actions: { setSelectedRoute }
  } = props;

  const clickCard = (index) => {
    if (selectedCard !== index) {
      setSelectedCard(index);
    } else {
      setSelectedRoute(selectedCard);
      navigate("/map");
    }
  };

  return (
    <Box style={{ margin: "0 16px", textAlign: "center" }}>
      {allRoutes.map((route, index) => (
        <Box key={index} style={{ padding: "16px" }}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>
              {index + 1} &nbsp; {route.name}
            </Typography>
            {/* <Typography onClick={() => {}}>Edit route</Typography> */}
            <Typography onClick={() => clickCard(index)}>
              {selectedCard === index ? "View in map" : "View stops"}
            </Typography>
          </Box>
          <Box style={{ textAlign: "left", marginTop: "8px" }}>
            {selectedCard === index &&
              route.stops.map((stop, index2) => (
                <Typography style={{ display: "inline" }} key={index2}>
                  {stop.name} -&gt; &nbsp;
                </Typography>
              ))}
          </Box>
        </Box>
      ))}
      {allRoutes.length === 0 && (
        <Typography>No routes in collection</Typography>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  allRoutes: state.routeList
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    setSelectedRoute: (index) => dispatch({ type: "SET_ROUTE", payload: index })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
