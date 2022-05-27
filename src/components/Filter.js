import React from "react";
import "./filter.css";
import Ride from "./Ride";
const Filter = () => {
  return (
    <section>
      <div className="filter">
        <div className="filter_rides">
          <div className="active">Nearest rides</div>
          <div> Upcoming rides (2)</div>
          <div>Past rides (2)</div>
        </div>
        <div className="filter_location">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-6.10352e-05 12.0001H5.99994V10.0001H-6.10352e-05V12.0001ZM-6.10352e-05 9.15527e-05V2.00009H17.9999V9.15527e-05H-6.10352e-05ZM-6.10352e-05 7.00009H11.9999V5.00009H-6.10352e-05V7.00009Z" fill="white" fill-opacity="0.8" />
          </svg>
          <p>Filters</p>
        </div>
      </div>
      <Ride />
      <Ride />
      <Ride />
    </section>
  );
};

export default Filter;
