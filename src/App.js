import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Routes, BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Box } from "@material-ui/core";

import "./styles.css";
import reducer from "./store/reducer";
import RouteForm from "./components/RouteForm";
import MapView from "./components/MapView";
import Home from "./components/Home";

const store = createStore(reducer);

export default function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/add-route" exact element={<RouteForm />} />
            <Route path="/map" exact element={<MapView />} />
          </Routes>
        </div>
      </Provider>
    </Router>
  );
}

const Nav = () => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#444",
        marginBottom: "24px",
        padding: "0 16px",
        color: "#fff"
      }}
    >
      <h3> React App</h3>
      <Link to="/" className="Link">
        View Routes
      </Link>
      <Link to="/add-route" className="Link">
        Add Routes
      </Link>
    </Box>
  );
};
