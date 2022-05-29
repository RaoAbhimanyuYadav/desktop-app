import React from "react";
import Dropdown from "./Dropdown";
import "./filter.css";

const Filter = ({ setIsNearestRide, setIsUpcomingRide, setIsPastRide, upcomingData, pastData, setIsCitySelected, setIsStateSelected, selectedState, setSelectedState, selectedCity, setSelectedCity, states, cities }) => {
  const changeActiveClass = (e) => {
    Array.from(e.target.parentElement.children).forEach((e) => {
      e.setAttribute("class", "");
    });
    e.target.setAttribute("class", "active");
  };

  const handleNearestClick = (e) => {
    changeActiveClass(e);
    setIsNearestRide(true);
    setIsUpcomingRide(false);
    setIsPastRide(false);
  };

  const handleUpcomingClick = (e) => {
    changeActiveClass(e);
    setIsNearestRide(false);
    setIsUpcomingRide(true);
    setIsPastRide(false);
  };
  const handlePastClick = (e) => {
    changeActiveClass(e);
    setIsNearestRide(false);
    setIsUpcomingRide(false);
    setIsPastRide(true);
  };

  return (
    <section>
      <div className="filter">
        <div className="filter_rides">
          <div className="active" onClick={handleNearestClick}>
            Nearest rides
          </div>
          <div onClick={handleUpcomingClick}> Upcoming rides ({upcomingData.length})</div>
          <div onClick={handlePastClick}>Past rides ({pastData.length})</div>
        </div>
        <div className="filter_location dropdown">
          <div className="trigger">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M-6.10352e-05 12.0001H5.99994V10.0001H-6.10352e-05V12.0001ZM-6.10352e-05 9.15527e-05V2.00009H17.9999V9.15527e-05H-6.10352e-05ZM-6.10352e-05 7.00009H11.9999V5.00009H-6.10352e-05V7.00009Z" fill="white" fillOpacity="0.8" />
            </svg>
            <span>Filters</span>
          </div>
          <Dropdown setIsCitySelected={setIsCitySelected} setIsStateSelected={setIsStateSelected} selectedState={selectedState} setSelectedState={setSelectedState} selectedCity={selectedCity} setSelectedCity={setSelectedCity} states={states} cities={cities} />
        </div>
      </div>
    </section>
  );
};

export default Filter;
