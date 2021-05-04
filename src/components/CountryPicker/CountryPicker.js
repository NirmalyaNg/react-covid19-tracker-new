import React, { useEffect, useState } from "react";
import classes from "./CountryPicker.module.css";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { getAllCountries } from "../../api/api";

const CountryPicker = ({ selectedCountry, changeCountry }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getAllCountries();
      setCountries(data);
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    changeCountry(e.target.value);
  };

  return (
    <FormControl className={classes.countryPicker}>
      <Select value={selectedCountry} onChange={handleChange}>
        <MenuItem value="worldwide">WorldWide</MenuItem>
        {countries.map((country) => (
          <MenuItem value={country} key={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountryPicker;
