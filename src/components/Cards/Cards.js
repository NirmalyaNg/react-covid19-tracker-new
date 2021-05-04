import React from "react";
import classes from "./Cards.module.css";
import InfoCard from "../InfoCard/InfoCard";

const Cards = ({ data }) => {
  return (
    <div className={classes.cards}>
      <InfoCard
        title="Infected"
        desc="Number of Active Cases of COVID-19"
        value={data.confirmed}
        date={data.date}
      />
      <InfoCard
        title="Recovered"
        desc="Number of Recoveries from COVID-19"
        value={data.recovered}
        date={data.date}
      />
      <InfoCard
        title="Deaths"
        desc="Number of deaths from COVID-19"
        value={data.deaths}
        date={data.date}
      />
    </div>
  );
};

export default Cards;
