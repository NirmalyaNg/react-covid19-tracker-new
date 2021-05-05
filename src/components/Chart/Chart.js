import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import classes from "./Chart.module.css";
import { getDailyData } from "../../api/api";
import { Radio } from "@material-ui/core";

const Chart = ({ country }) => {
  const [dailyData, setDailyData] = useState(null);
  const [chartType, setChartType] = useState("cummulative");

  useEffect(() => {
    const fetchDailyData = async () => {
      const data = await getDailyData(country);
      setDailyData(data);
    };

    fetchDailyData();
  }, [country]);

  const handleRadioChange = (e) => {
    setChartType(e.target.value);
  };

  let data;
  if (dailyData?.cases.length) {
    data = {
      labels: dailyData?.cases.map((item) => item.date),
      datasets: [
        {
          label: "Infected",
          data:
            chartType === "cummulative"
              ? dailyData?.cases.map((item) => item.value)
              : dailyData?.casesExact.map((item) => item.value),
          fill: true,
          //backgroundColor: "rgba(0,0,255,0.5)",
          borderColor: "rgba(0,0,255,1)",
        },
        {
          label: "Recovered",
          data:
            chartType === "cummulative"
              ? dailyData?.recovered.map((item) => item.value)
              : dailyData?.recoveredExact.map((item) => item.value),
          fill: true,
          borderColor: "rgba(0,255,0,1)",
          //backgroundColor: "rgba(0,255,0,0.5)",
        },
        {
          label: "Deaths",
          data:
            chartType === "cummulative"
              ? dailyData?.deaths.map((item) => item.value)
              : dailyData?.deathsExact.map((item) => item.value),
          fill: true,
          borderColor: "rgba(255,0,0,1)",
          //backgroundColor: "rgba(255,0,0,0.5)",
        },
      ],
    };
  }

  return (
    <div className={classes.chart}>
      <div className={classes.chart__datatype}>
        <Radio
          checked={chartType === "cummulative"}
          value="cummulative"
          name="chart-type"
          onChange={handleRadioChange}
        />
        Cummulative
        <Radio
          checked={chartType === "exact"}
          value="exact"
          name="chart-type"
          onChange={handleRadioChange}
        />
        Exact
      </div>

      <Line data={data} />
    </div>
  );
};

export default Chart;
