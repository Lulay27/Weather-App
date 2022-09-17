import React, { Component } from 'react';
import styles from './componentStyles.module.css';

export default class WeatherDisplay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        {this.props.isSubmitting ? (
          <div className={styles.sidePanelContainer}>
            <h3>Weather Statistics</h3>
            <li>Feels like: {this.props.weather.feel}</li>
            <li>Humidty: {this.props.weather.hum}</li>
            <li>Forcast: {this.props.weather.desc}</li>
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}
