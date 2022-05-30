import React, { useEffect, useState } from "react";
import "./ride.css";
import RideCard from "./RideCard";
const Ride = ({ upcomingData, pastData, nearestData, rideType }) => {
  let data = [];
  if (rideType.isNearestRide) {
    data = nearestData;
  }
  if (rideType.isUpcomingRide) {
    data = upcomingData;
  }
  if (rideType.isPastRide) {
    data = pastData;
  }
  console.log(data, nearestData, upcomingData, pastData, rideType.isNearestRide, rideType.isUpcomingRide, rideType.isPastRide);
  return (
    <>
      {data
        ?.sort((a, b) => a.distance - b.distance)
        .map((ride) => {
          return <RideCard ride={ride} />;
        })}
    </>
  );
};

export default Ride;
