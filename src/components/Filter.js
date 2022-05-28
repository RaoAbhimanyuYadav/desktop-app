import React, { useEffect, useState } from "react";
import { LOCAL_DATA, RIDE_API } from "../const";
import Dropdown from "./Dropdown";
import "./filter.css";
import Ride from "./Ride";
import useFetch from "./useFetch";
const Filter = () => {
  const myStation = 60;
  // const { data } = useFetch(RIDE_API);
  const data = LOCAL_DATA;

  const [filteredData, setFilteredData] = useState(data);
  const [upcomingData, setUpcomingData] = useState([]);
  const [pastData, setPastData] = useState([]);
  const [stateData, setStateData] = useState(null);
  const [state, setState] = useState("State");
  const [city, setCity] = useState("City");
  const [activeRide, setActiveRide] = useState({ n: true, u: false, p: false });

  useEffect(() => {
    setStateData(() => {
      let stateList = data?.map((obj) => obj.state);
      stateList = [...new Set(stateList)];
      return stateList;
    });
    handleNearestRide(data);
    countUpcomingRides(data);
    countPastRides(data); // eslint-disable-next-line
  }, [data]);

  const handleNearestRide = (d) => {
    let nearestRide = [];
    d?.forEach((obj) => {
      const dist = distanceCalculator(obj.station_path);
      const date = new Date(obj.date);
      const currDate = new Date();
      if (dist >= 0) {
        if (!(date.toLocaleDateString() > currDate.toLocaleDateString()) && !(date.toLocaleDateString() < currDate.toLocaleDateString()) && date.getTime() > currDate.getTime()) {
          nearestRide.push({ ...obj, distance: dist });
        }
      }
    });
    setFilteredData(nearestRide);
  };

  const handleNearestClick = (e) => {
    changeActiveClass(e);
    handleNearestRide(data);
    setActiveRide({ n: true, u: false, p: false });
  };

  const changeActiveClass = (e) => {
    Array.from(e.target.parentElement.children).forEach((e) => {
      e.setAttribute("class", "");
    });
    e.target.setAttribute("class", "active");
  };

  const distanceCalculator = (e) => {
    const arr = e?.filter((s) => s >= myStation);
    return arr[0] - myStation;
  };

  const countUpcomingRides = (d) => {
    const arr = [];
    d?.forEach((obj) => {
      const dist = distanceCalculator(obj.station_path);
      const date = new Date(obj.date);
      const currDate = new Date();
      if (date.toLocaleDateString() > currDate.toLocaleDateString()) {
        arr.push({ ...obj, distance: dist });
      }
      setUpcomingData(arr);
    });
  };

  const handleUpcomingRides = (e) => {
    changeActiveClass(e);
    setFilteredData(upcomingData);
    setActiveRide({ n: false, u: true, p: false });
  };

  const countPastRides = (d) => {
    const arr = [];
    d?.forEach((obj) => {
      const dist = distanceCalculator(obj.station_path);
      const date = new Date(obj.date);
      const currDate = new Date();
      if (date < currDate) {
        arr.push({ ...obj, distance: dist });
      }
      setPastData(arr);
    });
  };

  const handlePastRides = (e) => {
    changeActiveClass(e);
    setFilteredData(pastData);
    setActiveRide({ n: false, u: false, p: true });
  };

  const stateFilter = () => {
    if (state === "State") {
      return data;
    } else {
      return data.filter((obj) => obj.state === state);
    }
  };

  useEffect(() => {
    let arr = stateFilter();
    handleNearestRide(arr);
    countUpcomingRides(arr);
    countPastRides(arr);

    if (activeRide.p) {
      setFilteredData(pastData);
    } else if (activeRide.u) {
      setFilteredData(upcomingData);
    } else {
      handleNearestRide(arr);
    }
  }, [state]);
  // useEffect(() => {
  //   handleNearestRide();
  //   countUpcomingRides();
  //   countPastRides();
  //   locationFilter();
  //   console.log(city, "c");
  // }, [city]);

  return (
    <section>
      <div className="filter">
        <div className="filter_rides">
          <div className="active" onClick={handleNearestClick}>
            Nearest rides
          </div>
          <div onClick={handleUpcomingRides}> Upcoming rides ({upcomingData.length})</div>
          <div onClick={handlePastRides}>Past rides ({pastData.length})</div>
        </div>
        <div className="filter_location dropdown">
          <div className="trigger">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M-6.10352e-05 12.0001H5.99994V10.0001H-6.10352e-05V12.0001ZM-6.10352e-05 9.15527e-05V2.00009H17.9999V9.15527e-05H-6.10352e-05ZM-6.10352e-05 7.00009H11.9999V5.00009H-6.10352e-05V7.00009Z" fill="white" fillOpacity="0.8" />
            </svg>
            <span>Filters</span>
          </div>
          <Dropdown data={data} state={stateData} s={state} setState={setState} c={city} setCity={setCity} />
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
