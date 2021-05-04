import axios from "axios";

export const getWorldwideData = async (country) => {
  try {
    let data1;

    // For worldwide data
    if (country === "worldwide") {
      const { data } = await axios.get(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=1"
      );
      data1 = { ...data };
    } else {
      // For country specific data
      const { data } = await axios.get(
        `https://disease.sh/v3/covid-19/historical/${country}?lastdays=1`
      );

      data1 = { ...data.timeline };
    }

    const modifiedData = {
      confirmed: Object.values(data1.cases)[0],
      deaths: Object.values(data1.deaths)[0],
      recovered: Object.values(data1.recovered)[0],
      date: new Date(Object.keys(data1.cases)[0]).toDateString(),
    };

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCountries = async () => {
  try {
    const { data } = await axios.get(
      "https://disease.sh/v3/covid-19/countries"
    );
    const countries = data.map((item) => item.country);
    return countries;
  } catch (error) {
    console.log(error);
  }
};

export const getDailyData = async (country) => {
  let data1;
  if (country === "worldwide") {
    let { data } = await axios.get(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
    );
    data1 = { ...data };
  } else {
    let { data } = await axios.get(
      `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`
    );
    data1 = { ...data.timeline };
  }

  const cases = [];
  const recovered = [];
  const deaths = [];
  const casesExact = [];
  const deathsExact = [];
  const recoveredExact = [];

  // Daily Data Cumulative
  for (let item in data1.cases) {
    cases.push({
      date: item,
      value: data1.cases[item],
    });
    deaths.push({
      date: item,
      value: data1.deaths[item],
    });
    recovered.push({
      date: item,
      value: data1.recovered[item],
    });
  }

  // Daily data(Not cummulative)
  let lastDate = null;
  for (let item in data1.cases) {
    if (lastDate) {
      casesExact.push({
        date: item,
        value: Math.abs(data1.cases[item] - data1.cases[lastDate]),
      });

      deathsExact.push({
        date: item,
        value: Math.abs(data1.deaths[item] - data1.deaths[lastDate]),
      });

      recoveredExact.push({
        date: item,
        value: Math.abs(data1.recovered[item] - data1.recovered[lastDate]),
      });
    }
    lastDate = item;
  }

  const modifiedData = {
    cases,
    deaths,
    recovered,
    casesExact,
    recoveredExact,
    deathsExact,
  };

  return modifiedData;
};
