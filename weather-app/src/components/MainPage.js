import React, { useState, useEffect } from 'react';
import SidePanelData from './SidePanelData';
import styles from './componentStyles.module.css';
import uniqid from 'uniqid';
import WeatherDisplay from './WeatherDisplay';
import SidePanelHistory from './SidePanelHistory';
import axios from 'axios';

// firebase imports
import { db } from '../firebase-config';
import { collection, addDoc, setDoc, doc, updateDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase-config.js';

export default function MainPage() {
  const [cityData, setCityData] = useState({});
  const [input, setInput] = useState('');
  const [inputFromSubmit, setInputFromSubmit] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cityArr, setCityArr] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputFromSubmit(input);
  };

  // const addToCityArr = (newCity) => {
  //   setCityArr([...cityArr, newCity], () => {
  //     if (isLoggedIn) {
  //       // i think create new data in single line so email->city

  //       setDoc(doc(db, 'USERS', email), {
  //         myCity: cityArr.map((cityData) => {
  //           return cityData.cityTitle;
  //         }),
  //       });
  //       console.log('logged in trying to input city into database');
  //     }
  //   });
  // };

  const handleInvalidInput = (e) => {
    e.preventDefault();
    setErrorMsg('Enter a valid city name');
  };

  const addRecentCity = (targetId) => {
    // what thus do again lol ohh this for when user clicks on recent cities and adds that clicked to the cityArr
    const tester = cityArr.find((city) => city.id == targetId);

    const constBlah = { ...tester, id: uniqid() };

    setCityArr([...cityArr, constBlah]);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        setEmail(result.user.email);
        setIsLoggedIn(true);

        // setDoc(doc(db, 'USERS', result.user.email)); going to intilize in one setdoc

        // set isLoggedIn to true in future have signout set that to false
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const testerCallBackForFirebase = () => {
    if (isLoggedIn) {
      // i think create new data in single line so email->city

      setDoc(doc(db, 'USERS', email), {
        myCity: cityArr.map((cityData) => {
          return cityData.cityTitle;
        }),
      });
      console.log('logged in trying to input city into database');
    }
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
          setCityArr([...cityArr, cityCall.data]);
          // testerCallBackForFirebase();
          setErrorMsg('');
        } catch (err) {
          console.log(err);
          setErrorMsg('Enter a valid city name');
        }
      })();
    }
  }, [inputFromSubmit]);

  useEffect(() => {
    testerCallBackForFirebase();
  }, [cityArr]);

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
            addRecentCity={addRecentCity}
          />
        </div>
        <div className={styles.weatherData}>
          <WeatherDisplay
            isSubmitting={isSubmitting}
            cityArr={cityArr}
            cityData={cityData}
          />

          <h1>{isLoggedIn ? `Welcome ${email}` : ''}</h1>
          <button onClick={signInWithGoogle}>SIGN UP BOY</button>

          <button>SIGN OUT G</button>
        </div>
      </div>
    </>
  );
}
