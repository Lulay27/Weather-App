import React from 'react';
import styles from './componentStyles.module.css';

export default function SidePanelData(props) {
  let latestCity;
  let tempz;
  let iconId;
  let iconURL;

  let time = new Date();

  if (props.cityArr.length > 0) {
    // latestCity = props.cityArr[props.cityArr.length - 1];

    // note can move tempz iconid icon url values into main page to avoid if statement
    // and declaring variables before hand looks poopy

    latestCity = props.cityData;

    tempz = Math.round(latestCity.main.temp) + '°';
    iconId = latestCity.weather[0].icon;
    iconURL = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
  }

  return (
    <>
      <div className={styles.titleDate}>
        <h1>Weather Application</h1>
        <h2>{time.toLocaleTimeString()}</h2>
      </div>

      {props.isSubmitting ? (
        <div className={styles.weatherDisplayContainer}>
          <li className={`${styles.temperature} ${styles.flexcenter}`}>
            {tempz}
          </li>
          <li className={`${styles.city} ${styles.flexcenter}`}>
            {latestCity.cityTitle}
          </li>
          <li className={` ${styles.forcast}`}>
            <img src={iconURL} width="80px" alt="forcast-img"></img>
            <div>{latestCity.desc}</div>
          </li>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
