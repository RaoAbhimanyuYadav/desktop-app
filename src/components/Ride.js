import React from "react";
import "./ride.css";
const Ride = () => {
  return (
    <div className="ride">
      <div className="ride_img" style={{ background: `url(https://picsum.photos/200)` }}></div>
      <div className="ride_details">
        <p>Ride Id : 002</p>
        <p>Origin Station : 20</p>
        <p>station_path : [20, 39, 40, 42, 54, 63, 72, 88, 98]</p>
        <p>Date: 15th Feb 2022 16 : 33</p>
        <p>Distance : 1</p>
      </div>
      <div className="ride_cityName location">City Name</div>
      <div className="ride_stateName location">State Name</div>
    </div>
  );
};

export default Ride;
