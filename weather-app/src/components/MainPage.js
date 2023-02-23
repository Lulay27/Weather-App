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

  // on form submit setInput to input from user
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputFromSubmit(input);
  };

  // error msg for invalid city names
  const handleInvalidInput = (e) => {
    e.preventDefault();
    setErrorMsg('Enter a valid city name');
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

  // activates when inputFromSubmit is set
  // first api call grabs coordinates from input state (coordCall)
  // second api call uses those coords to grab city weather data (cityCall)
  // adds to attributes to cityCall title and id then adds to cityArr
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
          {isSubmitting ? (
            <SidePanelHistory
              isSubmitting={isSubmitting}
              cityArr={cityArr}
              addRecentCity={addRecentCity}
            />
          ) : (
            ''
          )}
        </div>
        <div className={styles.weatherData}>
          {isSubmitting ? (
            <WeatherDisplay
              isSubmitting={isSubmitting}
              cityArr={cityArr}
              cityData={cityData}
            />
          ) : (
            ''
          )}

          {/* turn this into a component */}
          <h1>{isLoggedIn ? `Welcome ${email}` : ''}</h1>
          <button onClick={signInWithGoogle}>SIGN UP BOY</button>
          <button>SIGN OUT G</button>
        </div>
      </div>
    </>
  );
}
