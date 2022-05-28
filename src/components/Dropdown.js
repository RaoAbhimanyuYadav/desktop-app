import React, { useEffect, useState } from "react";
import "./dropdown.css";
const Dropdown = ({ data, state, s, setState, c, setCity }) => {
  const handleStateClick = (e) => {
    // e.target.classList.add("class", "show");
    e.target.nextSibling.style.display = "block";
  };
  const handleStateChange = (e) => {
    setState(e.target.id);
    setCity("City");
    e.target.parentElement.style.display = "none";
  };
  const [cityData, setCityData] = useState([]);

  const citySelector = () => {
    if (s === "State") {
      setCityData([]);
    } else {
      let arr = [];
      data?.forEach((obj) => {
        if (obj.state === s) {
          arr.push(obj.city);
        }
      });
      setCityData(arr);
    }
  };
  useEffect(() => {
    citySelector();
  }, [s]);

  const handleCityClick = (e) => {
    e.target.nextSibling.style.display = "block";
  };

  const handleCityChange = (e) => {
    setCity(e.target.id);
    e.target.parentElement.style.display = "none";
  };

  return (
    <div className="dropdown_content">
      <p>Filters</p>
      <hr />
      <div className="dropdownOptions state">
        <div className="option" onClick={handleStateClick}>
          {s}
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.09409 9.18994L0.816466 0.0488263L11.3717 0.0488253L6.09409 9.18994Z" fill="#A5A5A5" />
          </svg>
        </div>
        <div className="dropdownList_content" onClick={handleStateChange}>
          <div className="dropdownList" id="State">
            State
          </div>
          {state?.map((sname) => {
            return (
              <div className="dropdownList" id={sname}>
                {sname}
              </div>
            );
          })}
        </div>
      </div>

      <div className="dropdownOptions city">
        <div className="option" onClick={handleCityClick}>
          {c}
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.09409 9.18994L0.816466 0.0488263L11.3717 0.0488253L6.09409 9.18994Z" fill="#A5A5A5" />
          </svg>
        </div>
        <div className="dropdownList_content" onClick={handleCityChange}>
          <div className="dropdownList" id="City">
            City
          </div>
          {cityData?.map((cname) => {
            return (
              <div className="dropdownList" id={cname}>
                {cname}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
