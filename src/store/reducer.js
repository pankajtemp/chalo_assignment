const DEFAULT_STATE = {
  routeList: [],
  stopList: [
    { id: 1, name: "Cooch Behar", lat: 26.33, lng: 89.41 },
    { id: 2, name: "Guwahati", lat: 26.14, lng: 91.56 },
    { id: 3, name: "Mumbai", lat: 19.08, lng: 72.74 },
    { id: 4, name: "Pune", lat: 18.52, lng: 73.86 }
  ],
  selectedRoute: {}
};

const reducer = (state = DEFAULT_STATE, action) => {
  const newState = { ...DEFAULT_STATE };
  switch (action.type) {
    case "SAVE_ROUTE":
      newState.routeList.push(action.payload);
      break;
    case "SAVE_STOP":
      newState.stopList.push(action.payload);
      break;
    case "SET_ROUTE":
      const { stopList, routeList } = newState;
      newState.selectedRoute = routeList[action.payload];
      const detailedStops = routeList[action.payload].stops.map((stop) => {
        let stopInDetail = { ...stop };
        stopList.forEach((stop2) => {
          if (stop2.id === stop.id) {
            stopInDetail.lat = stop2.lat;
            stopInDetail.lng = stop2.lng;
          }
        });
        return stopInDetail;
      });
      newState.selectedRoute.stops = detailedStops;
      break;
    default:
      break;
  }
  return newState;
};

export default reducer;
