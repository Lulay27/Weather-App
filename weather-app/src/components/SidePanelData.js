import React from 'react';
import styles from './componentStyles.module.css';

export default function WeatherDisplay(props) {
  // const latestCity = this.props.cityArr[this.props.cityArr.length - 1];
  return (
    <>
      {props.isSubmitting ? (
        <div className={styles.sidePanelContainer}>
          <h2>Weather Statistics</h2>
          <li>Feels like: {props.cityData.main.feels_like}</li>
          <li>Humidty: {props.cityData.main.humidity}</li>
          <li>Forcast: {props.cityData.weather[0].description}</li>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
