import "./App.css";
import Header from "./shared/header";
import InputPageHeader from "./shared/inputPageHeader";
import { Route, Router, Switch, useLocation } from "wouter";
import GreenHouseData from "./components/greenHouseDataRealTime";
import GreenHouseData24 from "./components/greenHouseData24Hours";
import InputPage from "./components/inputPage";
import React from "react";

function App() {
  //Im hiding the header when the user inputs a greenHouseId to not be able to go to the other pages.

  const [location] = useLocation();

  const isInputPage = location === "/";

  return (
    <div className="App">
      {!isInputPage && <Header />}
      {isInputPage && <InputPageHeader />}
      <Router>
        <Switch>
          <Route exact path="/" component={InputPage} />

          <Route path="/realTimeData" component={GreenHouseData} />
          <Route path="/dataFromLast24Hours" component={GreenHouseData24} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
