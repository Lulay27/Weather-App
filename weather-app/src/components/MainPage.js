import React, { useState, useEffect } from 'react';
import SidePanelData from './SidePanelData';
import styles from './componentStyles.module.css';
import uniqid from 'uniqid';
import WeatherDisplay from './WeatherDisplay';
import SidePanelHistory from './SidePanelHistory';
import axios from 'axios';

// firebase imports
import { db } from '../firebase-config';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
} from 'firebase/auth';
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
  const [time, setTime] = useState('');

  // on form submit setInput to input from user
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputFromSubmit(input);
    setInput('');
  };

  // error msg for invalid city names
  const handleInvalidInput = (e) => {
    e.preventDefault();
    setErrorMsg('Enter a valid city name');
  };

  const isClearing = () => {
    setCityArr([]);
    setCityData({});
    setInputFromSubmit('');
    setInput('');
    setIsSubmitting(false);
  };

  // on clicking on city in history tab
  // finds clicked city in cityArr
  // clones city, but new id: and setCityArr with new clone
  const addRecentCity = (targetId) => {
    const cityClone = cityArr.find((city) => city.id === targetId);

    const newIdCityClone = { ...cityClone, id: uniqid() };

    setCityArr([...cityArr, newIdCityClone]);
  };

  // logged in with google auth
  // checks if past data from account exists set array to that data
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    signInWithPopup(auth, provider)
      .then((result) => {
        setEmail(result.user.email);
        setIsLoggedIn(true);
        setIsSubmitting(false);

        const docRef = doc(db, 'USERS', result.user.email);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setCityArr(docSnap.data().myCity);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // signs user out
  // clears all states also for a refresh effect
  const signOutWithGoogle = () => {
    if (isLoggedIn) {
      signOut(auth)
        .then(() => {
          console.log('signed out done');
          setCityData({});
          setInput('');
          setInputFromSubmit('');
          setIsSubmitting(false);
          setErrorMsg('');
          setIsLoggedIn(false);
          setCityArr([]);
          setEmail('');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // every second grabbing the time and setting the time state
  setInterval(() => {
    const current = new Date();
    const hours = current.getHours().toString().padStart(2, '0');
    const minutes = current.getMinutes().toString().padStart(2, '0');
    const seconds = current.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    setTime(timeString);
  }, 1000);

  // activates when inputFromSubmit is set
  // first api call grabs coordinates from input state (coordCall)
  // second api call uses those coords to grab city weather data (cityCall)
  // adds to attributes to cityCall title and id then adds to cityArr
  useEffect(() => {
    console.log('useEffect 1');
    if (inputFromSubmit !== '') {
      (async () => {
        try {
          const coordCall = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${inputFromSubmit}&appid=8371ba1206036d8bad7d681b9fced4bd`
          );
          const cityCall = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${coordCall.data[0].lat}&lon=${coordCall.data[0].lon}&appid=8371ba1206036d8bad7d681b9fced4bd`
          );
          cityCall.data.cityTitle = inputFromSubmit;
          cityCall.data.id = uniqid();
          setCityData(cityCall.data);
          setIsSubmitting(true);
          setCityArr([...cityArr, cityCall.data]);
          setErrorMsg('');
        } catch (err) {
          console.log(err);
          setErrorMsg('Enter a valid city name');
        }
      })();
    }
  }, [inputFromSubmit]);

  // activates when cityArr is set
  // if user is logged in, set the firebase db to the cityArr
  useEffect(() => {
    if (isLoggedIn) {
      setDoc(doc(db, 'USERS', email), {
        myCity: cityArr,
      });
    }
  }, [cityArr]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.sidePanel}>
          {/* turn this form into a component? */}
          <form onSubmit={input !== '' ? handleSubmit : handleInvalidInput}>
            <div className={styles.inputContainer}>
              <input
                className={styles.formInput}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Enter a City"
                value={input}
              ></input>
              <div className={styles.errorMsg}>{errorMsg}</div>
            </div>
          </form>
          {/* end of form */}

          {isSubmitting ? (
            <SidePanelData isSubmitting={isSubmitting} cityArr={cityArr} />
          ) : (
            ''
          )}
          {isLoggedIn ? (
            <SidePanelHistory
              cityArr={cityArr}
              addRecentCity={addRecentCity}
              isClearing={isClearing}
            />
          ) : (
            ''
          )}
        </div>
        <div className={styles.weatherData}>
          {/* turn this into a component? */}
          <h1>Weather Application</h1>
          <h1>{time}</h1>
          <h1>{isLoggedIn ? `Welcome ${email}` : ''}</h1>
          <button className={styles.authBtn} onClick={signInWithGoogle}>
            Sign in with Google
          </button>
          <button className={styles.authBtn} onClick={signOutWithGoogle}>
            Sign out
          </button>
          {isSubmitting ? (
            <WeatherDisplay cityArr={cityArr} cityData={cityData} />
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}
