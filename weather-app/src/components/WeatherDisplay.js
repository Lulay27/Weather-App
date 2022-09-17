import React, { Component } from 'react';
import styles from './componentStyles.module.css';
import sun from '../public/sun.png';

export default class SidePanelData extends Component {
  render() {
    const tempz = Math.round(this.props.weather.temp) + '°';

    return (
      <>
        {this.props.isSubmitting ? (
          <div className={styles.weatherDisplayContainer}>
            <li className={`${styles.temperature} ${styles.flexcenter}`}>
              {tempz}
            </li>
            <li className={`${styles.city} ${styles.flexcenter}`}>
              {this.props.search}
            </li>
            <li className={` ${styles.forcast}`}>
              {this.props.weather.desc === 'clouds' ? (
                <div>Cloud Img</div>
              ) : this.props.weather.desc === 'sunny' ? (
                <div>Sunny Img</div>
              ) : this.props.weather.desc === 'scattered clouds' ? (
                <div>Scat Clouds Img</div>
              ) : this.props.weather.desc === 'overcast clouds' ? (
                <div>Over Clouds Img</div>
              ) : this.props.weather.desc === 'clear sky' ? (
                <div>Clear Sky Img</div>
              ) : (
                ''
              )}
              <img src={sun} width="80px" alt="forcast-img"></img>
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
