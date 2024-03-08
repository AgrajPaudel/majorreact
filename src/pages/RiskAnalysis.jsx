import React, { useState, useEffect, useRef } from "react";
import TestNavbar from "../component/TestNavBar";
import data from "../output.json" ;// Importing JSON data

export default function RiskAnalysis() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const prevSelectedType = useRef("");

  useEffect(() => {
    if (selectedType !== "" && selectedType !== prevSelectedType.current) {
      const names = data[selectedType] ? Object.keys(data[selectedType]) : [];
      setFilteredNames(names);
      setSelectedName("");
      setSelectedDistrict("");
      setDisplayData([]);
      prevSelectedType.current = selectedType;
    }
  }, [selectedType]);


 
  useEffect(() => {
    if (selectedType && selectedName) {
      const districts = data[selectedType] && data[selectedType][selectedName]
        ? Object.keys(data[selectedType][selectedName])
        : [];
      setFilteredDistricts(districts);
      setSelectedDistrict("");
      setDisplayData([]);
    }
  }, [selectedType, selectedName]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleDisplayData = () => {
    const entries = data[selectedType][selectedName][selectedDistrict];
    setDisplayData(entries);
  };

  const openGoogleMapsSearch = (parentBank, branchName) => {
    const searchQuery = `${parentBank} ${branchName}`;
    const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      searchQuery
    )}`;
    window.open(googleMapsURL, "_blank");
  };

  return (
    <div>
       
      <h1>This is the RiskAnalysis</h1>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">Select Type</option>
        {Object.keys(data).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {selectedType && (
        <select value={selectedName} onChange={handleNameChange}>
          <option value="">Select Name</option>
          {filteredNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      )}
      {selectedType && selectedName && (
        <select value={selectedDistrict} onChange={handleDistrictChange}>
          <option value="">Select District</option>
          {filteredDistricts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      )}
      {selectedDistrict && (
        <button onClick={handleDisplayData}>Display Data</button>
      )}
      {displayData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Address</th>
              <th>District</th>
              <th>Branch Name</th>
              <th>Open Date</th>
              <th>Google Maps Search</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.code}</td>
                <td>{entry.address}</td>
                <td>{entry.district}</td>
                <td>{entry.branch_name}</td>
                <td>{entry.open_date}</td>
                <td>
                  <button
                    onClick={() =>
                      openGoogleMapsSearch(selectedName, entry.branch_name)
                    }
                  >
                    See in Map
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
