import React, { useEffect, useState } from "react";
import { RIDE_API } from "../const";
import Dropdown from "./Dropdown";
import "./filter.css";
import Ride from "./Ride";
import useFetch from "./useFetch";
const Filter = () => {
  const myStation = 84;
  const { data, isPending, error } = useFetch(RIDE_API);
  const stateList = data?.map((obj) => obj.state) || null;
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    handleNearestRide();
  }, [data]);

  const handleNearestRide = () => {
    let nearestRide = [];
    data?.forEach((obj) => {
      const arr = obj.station_path.filter((s) => s >= myStation);
      const dist = arr[0] - myStation;
      if (arr.length > 0) {
        nearestRide.push({ ...obj, distance: dist });
      }
    });
    setFilteredData(nearestRide);
  };

  const changeActiveClass = (e) => {
    Array.from(e.target.parentElement.children).forEach((e) => {
      e.setAttribute("class", "");
    });
    e.target.setAttribute("class", "active");
  };

  const handleUpcomingRides = (e) => {
    changeActiveClass(e);
    const arr = data.filter((obj) => {
      const date = new Date(obj.date);
      const currDate = new Date();
      return date > currDate;
    });
    setFilteredData(arr);
  };

  const handlePastRides = (e) => {
    changeActiveClass(e);
  };
  // console.log(data, isPending, error, filteredData);
  return (
    <section>
      <div className="filter">
        <div className="filter_rides">
          <div
            className="active"
            onClick={(e) => {
              changeActiveClass(e);
              handleNearestRide();
            }}
          >
            Nearest rides
          </div>
          <div onClick={handleUpcomingRides}> Upcoming rides (2)</div>
          <div onClick={handlePastRides}>Past rides (2)</div>
        </div>
        <div className="filter_location">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-6.10352e-05 12.0001H5.99994V10.0001H-6.10352e-05V12.0001ZM-6.10352e-05 9.15527e-05V2.00009H17.9999V9.15527e-05H-6.10352e-05ZM-6.10352e-05 7.00009H11.9999V5.00009H-6.10352e-05V7.00009Z" fill="white" fillOpacity="0.8" />
          </svg>
          <div>
            <span>Filters</span>
            <Dropdown state={stateList} />
          </div>
        </div>
      </div>
      {filteredData
        ?.sort((a, b) => a.distance - b.distance)
        .map((ride) => {
          return <Ride ride={ride} id={ride.id} />;
        })}
    </section>
  );
};

export default Filter;
