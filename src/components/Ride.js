import React from "react";
import "./ride.css";
const Ride = ({ ride }) => {
  const { map_url, id, origin_station_code, station_path, date, state, city } = ride;

  return (
    <div className="ride">
      <div className="ride_info">
        <div className="ride_img" style={{ background: `url(${map_url})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></div>
        <div className="ride_details">
          <p>Ride Id : {id}</p>
          <p>Origin Station : {origin_station_code}</p>
          <p>station_path : {JSON.stringify(station_path)}</p>
          <p>Date: {date}</p>
          <p>Distance : 1</p>
        </div>
      </div>
      <div className="ride_location">
        <div className="ride_cityName location">{city}</div>
        <div className="ride_stateName location">{state}</div>
      </div>
    </div>
  );
};

export default Ride;
