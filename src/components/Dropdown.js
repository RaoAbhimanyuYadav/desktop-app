import "./dropdown.css";
const Dropdown = ({ obj }) => {
  let { setIsCitySelected, setIsStateSelected, selectedState, setSelectedState, selectedCity, setSelectedCity, states, cities } = obj;
  const handleStateClick = (e) => {
    e.target.nextSibling.style.display = "block";
  };
  const handleStateChange = (e) => {
    setSelectedState(e.target.id);
    setIsStateSelected(true);
    setIsCitySelected(false);
    setSelectedCity("City");
    e.target.parentElement.style.display = "none";
    if (e.target.id === "State") {
      setIsStateSelected(false);
    }
  };
  const handleCityClick = (e) => {
    e.target.nextSibling.style.display = "block";
  };
  const handleCityChange = (e) => {
    setIsCitySelected(true);
    setSelectedCity(e.target.id);
    e.target.parentElement.style.display = "none";
    if (e.target.id === "City") {
      setIsCitySelected(false);
    }
  };

  return (
    <div className="dropdown_content">
      <p>Filters</p>
      <hr />
      <div className="dropdownOptions state">
        <div className="option" onClick={handleStateClick}>
          {selectedState}
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.09409 9.18994L0.816466 0.0488263L11.3717 0.0488253L6.09409 9.18994Z" fill="#A5A5A5" />
          </svg>
        </div>
        <div className="dropdownList_content" onClick={handleStateChange}>
          <div className="dropdownList" id="State">
            State
          </div>
          {states?.sort().map((sname) => {
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
          {selectedCity}
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.09409 9.18994L0.816466 0.0488263L11.3717 0.0488253L6.09409 9.18994Z" fill="#A5A5A5" />
          </svg>
        </div>
        <div className="dropdownList_content" onClick={handleCityChange}>
          <div className="dropdownList" id="City">
            City
          </div>
          {cities?.sort().map((cname) => {
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
