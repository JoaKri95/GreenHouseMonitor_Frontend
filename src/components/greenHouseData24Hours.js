import { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/sharedData";
import Chart from "react-apexcharts";
import React from "react";

function GreenHouseData24() {
  const [greenHouseTemperature, setTemperature] = useState([0]);
  const [greenHouseHumidity, setHumidity] = useState([0]);
  const [greenHouseLight, setLight] = useState([0]);

  const [chartData, setChartData] = useState({});

  const { sharedData } = useContext(DataContext);

  const setChartDataTest = () => {
    setChartData({
      series: [
        {
          name: "Temperature",
          data: greenHouseTemperature,
        },
      ],

      seriesTwo: [
        {
          name: "Humidity",
          data: greenHouseHumidity,
        },
      ],

      seriesThree: [
        {
          name: "Light",
          data: greenHouseLight,
        },
      ],
    });
  };

  const fetchData = () => {
    fetch(
      `http://localhost:3001/greenHouseData/24HourDataEndpoint/${sharedData}`
    )
      .then((response) => response.json())
      .then((data) => {
        let tempSeriesArray = [];
        let moistSeriesArray = [];
        let lightSeriesArray = [];

        const jsonData = data.map((item) => ({
          temp: item.temperature,
          moist: item.humidity,
          light: item.light,
        }));

        console.log(data);

        jsonData.forEach((item) => {
          tempSeriesArray.push(item.temp);
          moistSeriesArray.push(item.moist);
          lightSeriesArray.push(item.light);
        });

        setTemperature([...tempSeriesArray]);
        setHumidity([...moistSeriesArray]);
        setLight([...lightSeriesArray]);
      })
      .catch((error) => {
        console.log(error);
        alert(
          `An error occured, there may be no data to show from the last 24 hours: ${error}`
        );
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setChartDataTest();
  }, [greenHouseTemperature, greenHouseHumidity, greenHouseLight]);

  const options = {
    options: {
      chart: {
        height: 350,
        type: "line",
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      noData: {
        text: "Loading...",
      },
    },
  };

  return (
    <article id="article" className="row">
      <h1>24 Hour Data</h1>
      <div className="col-md-6 mb-4">
        <h2>Temperature</h2>
        {chartData && chartData?.series && (
          <Chart
            options={options}
            series={chartData.series}
            type="line"
            height={350}
          />
        )}
      </div>
      <div className="col-md-6 mb-4">
        <h2>Humidity</h2>
        {chartData && chartData?.series && (
          <Chart
            options={options}
            series={chartData.seriesTwo}
            type="line"
            height={350}
          />
        )}
      </div>
      <div className="col-md-12">
        <h2>Light</h2>
        {chartData && chartData?.series && (
          <Chart
            options={options}
            series={chartData.seriesThree}
            type="line"
            height={350}
          />
        )}
      </div>
    </article>
  );
}

export default GreenHouseData24;
