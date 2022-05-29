import React, { useEffect, useState } from "react";
import "./ride.css";
const Ride = ({ filteredData }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(filteredData?.sort((a, b) => a.distance - b.distance));
  }, [filteredData]);
  return (
    <>
      {data.map((ride) => {
        return (
          <div className="ride">
            <div className="ride_info">
              <div className="ride_img" style={{ background: `url(${ride.map_url})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></div>
              <div className="ride_details">
                <p>Ride Id : {ride.id}</p>
                <p>Origin Station : {ride.origin_station_code}</p>
                <p>station_path : {JSON.stringify(ride.station_path)}</p>
                <p>Date: {ride.date}</p>
                <p>Distance : {ride.distance}</p>
              </div>
            </div>
            <div className="ride_location">
              <div className="ride_cityName location">{ride.city}</div>
              <div className="ride_stateName location">{ride.state}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Ride;
