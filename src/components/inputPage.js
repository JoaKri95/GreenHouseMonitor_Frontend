import React, { useContext, useState } from "react";
import { DataContext } from "../context/sharedData";
import { Redirect } from "wouter";
import GreenHouseService from "../services/GreenHouseService";

const InputPage = () => {
  const { setSharedData } = useContext(DataContext);
  const [inputValue, setInputValue] = useState("");
  const [redirectToRealTimeData, setRedirectToRealTimeData] = useState(false);

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = async () => {
    if (isNaN(inputValue)) {
      alert("Please insert a number");
      return;
    }

    const greenHouseData = await GreenHouseService.getAllGreenHouseDataById(
      inputValue
    );

    const matchingObject = greenHouseData.find(
      (data) => data.greenHouseId === parseInt(inputValue)
    );

    if (matchingObject) {
      console.log("Hey!");
      setSharedData(inputValue);
      console.log("Stored to shared data", inputValue);
      setRedirectToRealTimeData(true);
    } else {
      alert("Invalid ID. Please enter a valid greenhouse ID.");
    }
  };

  if (redirectToRealTimeData) {
    return <Redirect to="/realTimeData" />;
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="d-flex flex-column align-items-center w-50">
        <h2 className="mb-3">
          Please enter a greenhouse ID to start monitoring
        </h2>
        <div className="w-100">
          <input
            type="text"
            value={inputValue}
            onChange={handleInput}
            className="form-control mb-3"
          />
        </div>
        <button onClick={handleSave} className="btn btn-primary w-100">
          Save
        </button>
      </div>
    </div>
  );
};

export default InputPage;
