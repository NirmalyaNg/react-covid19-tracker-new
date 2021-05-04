import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import classes from "./InfoCard.module.css";
import CountUp from "react-countup";

const InfoCard = ({ title, desc, value, date }) => {
  let classname = `${classes.infoCard}`;
  if (title === "Infected") {
    classname += ` ${classes.infoCard__blue}`;
  } else if (title === "Deaths") {
    classname += ` ${classes.infoCard__red}`;
  } else {
    classname += ` ${classes.infoCard__green}`;
  }

  return (
    <Card className={classname}>
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <Typography variant="h5" component="h2">
          {value ? (
            <CountUp start={0} end={value} separator="," duration={2} />
          ) : (
            "Loading .."
          )}
        </Typography>
        <Typography color="textSecondary">{date}</Typography>
        <Typography variant="body2" component="p">
          {desc}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
