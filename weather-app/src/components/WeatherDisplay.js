import React, { Component } from 'react';
import styles from './componentStyles.module.css';

export default class SidePanelData extends Component {
  render() {
    let latestCity;
    let tempz;
    let iconId;
    let iconURL;

    if (this.props.cityArr.length > 0) {
      latestCity = this.props.cityArr[this.props.cityArr.length - 1];
      tempz = Math.round(latestCity.temp) + '°';
      iconId = latestCity.icon;
      iconURL = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    }

    return (
      <>
        {this.props.isSubmitting ? (
          <div className={styles.weatherDisplayContainer}>
            <li className={`${styles.temperature} ${styles.flexcenter}`}>
              {tempz}
            </li>
            <li className={`${styles.city} ${styles.flexcenter}`}>
              {latestCity.text}
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
}
