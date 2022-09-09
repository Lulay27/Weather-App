import React, { Component } from 'react';
import styles from './componentStyles.module.css';

export default class Overview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.isSubmitting ? (
          <div className={styles.listContainer}>
            <li>
              Location: {this.props.gifSearch},{this.props.weather.country}
            </li>
            <li>Temperature: {this.props.weather.temp}</li>
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
