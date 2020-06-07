import React, { useState, useEffect} from 'react';
import { Cards, Header, DatePicker, Chart, Chips } from "./components";
import { fetchPropertyData } from './api/';

import styles from './App.module.css';

function App() {
  const [dates, setDates] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      const { data } = await fetchPropertyData();

      setDates(data);
    }

    fetchAPI();
  }, [])

  const handleDateChange = (date) => {
    setCurrentDate(date);
    setCurrentLocation("");
  }

  const handleLocationChange = (location) => {
    if(location===currentLocation){
      setCurrentLocation("");
    } else {
      setCurrentLocation(location);
    }
  }
  
  return (
    <div className={styles.container}>
      <Header />
      <Cards data={dates} currentDate={currentDate}/>
      <DatePicker handleDateChange={handleDateChange}/>
      <Chart data={dates} currentDate={currentDate} currentLocation={currentLocation}/>
      <Chips data={dates} currentLocation={currentLocation} handleLocationChange={handleLocationChange}/>
    </div>
  );
}

export default App;
