import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { getWorldwideData } from "./api/api";
import Cards from "./components/Cards/Cards";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import Chart from "./components/Chart/Chart";

function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const fetchWorldWideData = async () => {
      const data = await getWorldwideData(country);
      setData(data);
    };

    fetchWorldWideData();
  }, [country]);

  return (
    <div className="app">
      <Header />
      <Cards data={data} />
      <CountryPicker selectedCountry={country} changeCountry={setCountry} />
      <Chart country={country} />
    </div>
  );
}

export default App;
