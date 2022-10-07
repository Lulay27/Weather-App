import React from 'react';
import styles from './componentStyles.module.css';

export default function WeatherDisplay(props) {
  const latestCity = props.cityArr[props.cityArr.length - 1];
  return (
    <>
      {props.isSubmitting ? (
        <div className={styles.sidePanelContainer}>
          <h2>Weather Statistics</h2>
          <li>Feels like: {latestCity.main.feels_like}</li>
          <li>Humidty: {latestCity.main.humidity}</li>
          <li>Forcast: {latestCity.weather[0].description}</li>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
