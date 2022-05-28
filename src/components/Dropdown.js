import React from "react";
import "./dropdown.css";
const Dropdown = ({ state }) => {
  const handleStateClick = (e) => {};
  return (
    <div className="dropdown_content">
      <p>Filters</p>
      <hr />
      <div className="dropdownOptions state">
        <div className="option" onClick={handleStateClick}>
          State
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.09409 9.18994L0.816466 0.0488263L11.3717 0.0488253L6.09409 9.18994Z" fill="#A5A5A5" />
          </svg>
        </div>
        {/* <div className="dropdownList_content hide">
          {state?.map((sname) => {
            return (
              <div className="dropdownList" id={sname}>
                {sname}
              </div>
            );
          })}
        </div> */}
      </div>

      <div className="dropdownOptions city">
        <div className="option">
          City
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.09409 9.18994L0.816466 0.0488263L11.3717 0.0488253L6.09409 9.18994Z" fill="#A5A5A5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
