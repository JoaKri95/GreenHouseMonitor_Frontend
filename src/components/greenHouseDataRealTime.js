import { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/sharedData";
import Chart from "react-apexcharts";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function GreenHouseData() {
  const [greenHouseTemperature, setTemperature] = useState([0]);
  const [greenHouseHumidity, setHumidity] = useState([0]);
  const [greenHouseLight, setLight] = useState([0]);
  const [maxMeasurements, setMaxMeasurements] = useState(20);

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
    fetch(`http://localhost:3001/greenHouseData/${sharedData}`)
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
          if (tempSeriesArray.length > maxMeasurements) {
            tempSeriesArray.splice(0, 1);
          }
          moistSeriesArray.push(item.moist);
          if (moistSeriesArray.length > maxMeasurements) {
            moistSeriesArray.splice(0, 1);
          }
          lightSeriesArray.push(item.light);
          if (lightSeriesArray.length > maxMeasurements) {
            lightSeriesArray.splice(0, 1);
          }
        });

        setTemperature([...tempSeriesArray]);
        setHumidity([...moistSeriesArray]);
        setLight([...lightSeriesArray]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setChartDataTest();
  }, [greenHouseTemperature, greenHouseHumidity, greenHouseLight]);

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const options = {
    options: {
      chart: {
        height: 350,
        type: "area",
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
      xaxis: {
        text: "24 hour data",
      },
    },
  };

  return (
    <article id="article" className="row">
      <div className="col-md-6 mb-4">
        {chartData && chartData?.series && (
          <Chart
            options={options}
            series={chartData.series}
            type="area"
            height={350}
          />
        )}
      </div>
      <div className="col-md-6 mb-4">
        {chartData && chartData?.series && (
          <Chart
            options={options}
            series={chartData.seriesTwo}
            type="area"
            height={350}
          />
        )}
      </div>
      <div className="col-md-12">
        {chartData && chartData?.series && (
          <Chart
            options={options}
            series={chartData.seriesThree}
            type="area"
            height={350}
          />
        )}
      </div>
    </article>
  );
}

export default GreenHouseData;
