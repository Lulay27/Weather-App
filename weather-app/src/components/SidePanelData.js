import React, { Component } from 'react';
import styles from './componentStyles.module.css';

export default class WeatherDisplay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const latestCity = this.props.cityArr[this.props.cityArr.length - 1];
    return (
      <>
        {this.props.isSubmitting ? (
          <div className={styles.sidePanelContainer}>
            <h2>Weather Statistics</h2>
            <li>Feels like: {latestCity.feel}</li>
            <li>Humidty: {latestCity.hum}</li>
            <li>Forcast: {latestCity.desc}</li>
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}
