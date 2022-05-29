import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar";
import Ride from "./components/Ride";
import { RIDE_API, USER_API } from "./const";
// import { LOCAL_DATA } from "./const";

function App() {
  const [userInfo, setUserInfo] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [nearestData, setNearestData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
  const [pastData, setPastData] = useState([]);

  const [isNearestRide, setIsNearestRide] = useState(true);
  const [isUpcomingRide, setIsUpcomingRide] = useState(false);
  const [isPastRide, setIsPastRide] = useState(false);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [isStateSelected, setIsStateSelected] = useState(false);
  const [isCitySelected, setIsCitySelected] = useState(false);

  const [selectedState, setSelectedState] = useState("State");
  const [selectedCity, setSelectedCity] = useState("City");

  useEffect(() => {
    fetch(RIDE_API)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setRawData(data);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(USER_API)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // useEffect(() => {
  //   setRawData(LOCAL_DATA);
  //   fetch(USER_API)
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setUserInfo(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    setFilteredData(handleNearestRide());

    setNearestData(handleNearestRide());
    setUpcomingData(handleUpcomingRides());
    setPastData(handlePastRides());

    setStates(() => {
      let stateList = rawData?.map((obj) => obj.state);
      stateList = [...new Set(stateList)];
      return stateList;
    });

    setCities(() => {
      let cityList = rawData?.map((obj) => obj.city);
      cityList = [...new Set(cityList)];
      return cityList;
    }); // eslint-disable-next-line
  }, [rawData, userInfo]);

  const distanceCalculator = (e) => {
    const arr = e?.filter((s) => s >= userInfo.station_code);
    return arr[0] - userInfo.station_code;
  };

  const handleNearestRide = () => {
    let nearestRide = [];
    rawData?.forEach((obj) => {
      const dist = distanceCalculator(obj.station_path);
      const date = new Date(obj.date);
      const currDate = new Date();
      if (dist >= 0) {
        if (!(date.toLocaleDateString() > currDate.toLocaleDateString()) && !(date.toLocaleDateString() < currDate.toLocaleDateString()) && date.getTime() > currDate.getTime()) {
          nearestRide.push({ ...obj, distance: dist });
        }
      }
    });
    return nearestRide;
  };
  const handleUpcomingRides = () => {
    const arr = [];
    rawData?.forEach((obj) => {
      const dist = distanceCalculator(obj.station_path);
      const date = new Date(obj.date);
      const currDate = new Date();
      if (date.toLocaleDateString() > currDate.toLocaleDateString()) {
        arr.push({ ...obj, distance: dist });
      }
    });
    return arr;
  };

  const handlePastRides = () => {
    const arr = [];
    rawData?.forEach((obj) => {
      const dist = distanceCalculator(obj.station_path);
      const date = new Date(obj.date);
      const currDate = new Date();
      if (date < currDate) {
        arr.push({ ...obj, distance: dist });
      }
    });
    return arr;
  };

  useEffect(() => {
    if (isStateSelected && selectedState) {
      let d1 = handleNearestRide().filter((obj) => obj.state === selectedState);
      setNearestData(d1);
      let d2 = handleUpcomingRides().filter((obj) => obj.state === selectedState);
      setUpcomingData(d2);
      let d3 = handlePastRides().filter((obj) => obj.state === selectedState);
      setPastData(d3);
      if (isCitySelected && selectedCity) {
        setNearestData(d1.filter((obj) => obj.city === selectedCity));
        setUpcomingData(d2.filter((obj) => obj.city === selectedCity));
        setPastData(d3.filter((obj) => obj.city === selectedCity));
      }
    }

    if (isCitySelected && selectedCity && !isStateSelected) {
      setNearestData(handleNearestRide().filter((obj) => obj.city === selectedCity));
      setUpcomingData(handleUpcomingRides().filter((obj) => obj.city === selectedCity));
      setPastData(handlePastRides().filter((obj) => obj.city === selectedCity));
    } else if (!isStateSelected && !isCitySelected) {
      setNearestData(handleNearestRide());
      setUpcomingData(handleUpcomingRides());
      setPastData(handlePastRides());
    }
    if (isNearestRide) {
      setFilteredData(nearestData);
    } else if (isUpcomingRide) {
      setFilteredData(upcomingData);
    } else {
      setFilteredData(pastData);
    } // eslint-disable-next-line
  }, [isNearestRide, isUpcomingRide, isPastRide, isStateSelected, isCitySelected, selectedState, selectedCity]);

  useEffect(() => {
    if (selectedState === "State") {
      setCities(() => {
        let cityList = rawData?.map((obj) => obj.city);
        cityList = [...new Set(cityList)];
        return cityList;
      });
    } else {
      setCities(() => {
        let arr = rawData?.filter((obj) => obj.state === selectedState);
        let cityList = arr?.map((obj) => obj.city);
        cityList = [...new Set(cityList)];
        return cityList;
      });
    } // eslint-disable-next-line
  }, [isStateSelected, selectedState]);

  return (
    <div className="App">
      <Navbar userInfo={userInfo} />
      <Filter obj={{ setIsNearestRide, setIsUpcomingRide, setIsPastRide, upcomingData, pastData, setIsCitySelected, setIsStateSelected, selectedState, setSelectedState, selectedCity, setSelectedCity, states, cities }} />
      <Ride filteredData={filteredData} />
    </div>
  );
}

export default App;
