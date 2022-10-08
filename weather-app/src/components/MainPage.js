import React, { useState, useEffect } from 'react';
import SidePanelData from './SidePanelData';
import styles from './componentStyles.module.css';
import uniqid from 'uniqid';
import WeatherDisplay from './WeatherDisplay';
import SidePanelHistory from './SidePanelHistory';
import axios from 'axios';

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

  useEffect(() => {
    if (input !== '') {
      (async () => {
        try {
          const coordCall = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=8371ba1206036d8bad7d681b9fced4bd`
          );
          const cityCall = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${coordCall.data[0].lat}&lon=${coordCall.data[0].lon}&appid=8371ba1206036d8bad7d681b9fced4bd`
          );
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

  // this.state = {
  //   cityArr: [],
  //   isSubmitting: false,
  //   errorMsg: '',
  //   city: {
  //     text: '',
  //     id: uniqid(),
  //     temp: '',
  //     feel: '',
  //     hum: '',
  //     desc: '',
  //     country: '',
  //     icon: '',
  //   },
  // };

  // handleInputChange = (e) => {
  //   this.setState({
  //     city: {
  //       text: e.target.value,
  //       id: uniqid(),
  //     },
  //   });
  // };

  // handleError = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     city: {
  //       text: 'poop',
  //     },
  //     errorMsg: 'Enter a valid city name',
  //   });
  //   console.log('hello i am inside error ');
  // };

  // handleHistory = (city) => {
  //   this.setState({
  //     city: {
  //       text: city.text,
  //       id: uniqid(),
  //     },
  //     cityArr: this.state.cityArr.concat([city]),
  //   });
  // };

  // finishSubmit = () => {
  //   this.setState({
  //     cityArr: this.state.cityArr.concat([this.state.city]),
  //     city: {
  //       text: '',
  //       id: uniqid(),
  //     },
  //     isSubmitting: 'true',
  //   });
  // };

  // handleHistoryClick = (id) => {
  //   // grab city (with id) clicked in history and concat to array
  //   // have array display idk 10 cities in history?
  //   // display from top down newest to oldest?
  // };

  // handleSubmit = async (e) => {
  //   try {
  //     e.preventDefault();

  //     const cordsRes = await (
  //       await fetch(
  //         `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.city.text}&appid=8371ba1206036d8bad7d681b9fced4bd`,
  //         { mode: 'cors' }
  //       )
  //     ).json();

  //     const weatherRes = await (
  //       await fetch(
  //         `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${cordsRes[0].lat}&lon=${cordsRes[0].lon}&appid=8371ba1206036d8bad7d681b9fced4bd`,
  //         { mode: 'cors' }
  //       )
  //     ).json();

  //     this.setState(
  //       {
  //         errorMsg: '',
  //         city: {
  //           text: this.state.city.text,
  //           id: uniqid(),
  //           temp: weatherRes.main.temp,
  //           feel: weatherRes.main.feels_like,
  //           hum: weatherRes.main.humidity,
  //           desc: weatherRes.weather[0].description,
  //           country: cordsRes[0].country,
  //           icon: weatherRes.weather[0].icon,
  //         },
  //       },
  //       this.finishSubmit
  //     );

  //     // console.log('city weather data:', weatherRes);
  //   } catch (err) {
  //     console.log(err);
  //     alert('Enter a valid city Name');
  //   }
  // };

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
            // handleHistory={this.handleHistory}
          />
        </div>
        <div className={styles.weatherData}>
          <WeatherDisplay isSubmitting={isSubmitting} cityArr={cityArr} />
        </div>
      </div>
    </>
  );
}
