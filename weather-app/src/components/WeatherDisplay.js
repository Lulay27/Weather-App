import React, { Component } from 'react';
import styles from './componentStyles.module.css';

export default class SidePanelData extends Component {
  render() {
    const tempz = Math.round(this.props.weather.temp) + '°';
    const iconId = this.props.weather.icon;
    const iconURL = `http://openweathermap.org/img/wn/${iconId}@2x.png`;

    return (
      <>
        {this.props.isSubmitting ? (
          <div className={styles.weatherDisplayContainer}>
            <li className={`${styles.temperature} ${styles.flexcenter}`}>
              {tempz}
            </li>
            <li className={`${styles.city} ${styles.flexcenter}`}>
              {this.props.cityArr[this.props.cityArr.length - 1]}
            </li>
            <li className={` ${styles.forcast}`}>
              <img src={iconURL} width="80px" alt="forcast-img"></img>
              <div>{this.props.weather.desc}</div>
            </li>
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}
