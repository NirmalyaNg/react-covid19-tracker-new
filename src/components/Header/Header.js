import React from "react";
import covid_image from "../../assets/covid.png";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <img src={covid_image} alt="" className={classes.header__image} />
    </div>
  );
};

export default Header;
