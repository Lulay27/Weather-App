import React, { useState, useEffect } from 'react';
import SidePanelData from './SidePanelData';
import styles from './componentStyles.module.css';
import uniqid from 'uniqid';
import WeatherDisplay from './WeatherDisplay';
import SidePanelHistory from './SidePanelHistory';
import axios from 'axios';

// firebase imports

import { db } from '../firebase-config.js';
import { collection, addDoc } from 'firebase/firestore';

export default function MainPage() {
  const [cityData, setCityData] = useState({});
  const [input, setInput] = useState('');
  const [inputFromSubmit, setInputFromSubmit] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cityArr, setCityArr] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputFromSubmit(input);
  };

  const addToCityArr = (newCity) => {
    setCityArr([...cityArr, newCity]);
  };

  const handleInvalidInput = (e) => {
    e.preventDefault();
    setErrorMsg('Enter a valid city name');
  };

  const testerFunc = (targetId) => {
    const tester = cityArr.find((city) => city.id == targetId);

    const constBlah = { ...tester, id: uniqid() };

    setCityArr([...cityArr, constBlah]);
  };

  useEffect(() => {
    if (input !== '') {
      // testing firebase do i even put it here lol
      // const colRef = collection(db, 'cities');

      (async () => {
        try {
          const coordCall = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=8371ba1206036d8bad7d681b9fced4bd`
          );
          const cityCall = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${coordCall.data[0].lat}&lon=${coordCall.data[0].lon}&appid=8371ba1206036d8bad7d681b9fced4bd`
          );

          // firebase adding docs
          // const addingInputToDB = await addDoc(colRef, {
          //   name: input,
          // });

          cityCall.data.cityTitle = input;
          cityCall.data.id = uniqid();
          setCityData(cityCall.data);
          setIsSubmitting(true);
          addToCityArr(cityCall.data);
          setErrorMsg('');
        } catch (err) {
          console.log(err);
          setErrorMsg('Enter a valid city name');
        }
      })();
    }
  }, [inputFromSubmit]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.sidePanel}>
          <form onSubmit={input !== '' ? handleSubmit : handleInvalidInput}>
            <div className={styles.inputContainer}>
              <input
                className={styles.formInput}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Enter a City"
              ></input>
              <div className={styles.errorMsg}>{errorMsg}</div>
            </div>
          </form>
          <SidePanelData isSubmitting={isSubmitting} cityArr={cityArr} />
          <SidePanelHistory
            isSubmitting={isSubmitting}
            cityArr={cityArr}
            testerFunc={testerFunc}
          />
        </div>
        <div className={styles.weatherData}>
          <WeatherDisplay
            input={input} // added city name here for firestorage
            isSubmitting={isSubmitting}
            cityArr={cityArr}
          />
        </div>
      </div>
    </>
  );
}
