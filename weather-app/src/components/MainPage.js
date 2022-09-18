import React, { Component } from 'react';
import SidePanelData from './SidePanelData';
import styles from './componentStyles.module.css';
import search from '../public/search.png';
import WeatherDisplay from './WeatherDisplay';
import SidePanelHistory from './SidePanelHistory';

export class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      search: '',
      isSubmitting: false,
      city: '',
      cityArr: [],
      weather: {
        temp: '',
        feel: '',
        hum: '',
        desc: '',
        country: '',
        icon: '',
      },
    };
  }

  handleInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      this.setState({
        search: this.state.input,
        isSubmitting: true,
        cityArr: this.state.cityArr.concat([this.state.input]),
      });

      const cordsRes = await (
        await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.input}&appid=8371ba1206036d8bad7d681b9fced4bd`,
          { mode: 'cors' }
        )
      ).json();

      const weatherRes = await (
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${cordsRes[0].lat}&lon=${cordsRes[0].lon}&appid=8371ba1206036d8bad7d681b9fced4bd`,
          { mode: 'cors' }
        )
      ).json();

      this.setState({
        weather: {
          temp: weatherRes.main.temp,
          feel: weatherRes.main.feels_like,
          hum: weatherRes.main.humidity,
          desc: weatherRes.weather[0].description,
          country: cordsRes[0].country,
          icon: weatherRes.weather[0].icon,
        },
      });

      console.log('city weather data:', weatherRes);
    } catch (err) {
      console.log(err);
      alert('Enter a valid city Name');
    }
  };

  render() {
    return (
      <>
        <div className={styles.main}>
          <div className={styles.sidePanel}>
            <form onSubmit={this.state.input !== '' ? this.handleSubmit : null}>
              <div className={styles.inputContainer}>
                <input
                  className={styles.formInput}
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="Enter a City"
                  value={this.state.input}
                ></input>
                <input
                  className={styles.searchBtn}
                  type="image"
                  src={search}
                  alt="search"
                ></input>
              </div>
            </form>
            <SidePanelData
              isSubmitting={this.state.isSubmitting}
              search={this.state.search}
              weather={this.state.weather}
            />
            <SidePanelHistory
              isSubmitting={this.state.isSubmitting}
              cityArr={this.state.cityArr}
            />
          </div>
          <div className={styles.weatherData}>
            <WeatherDisplay
              isSubmitting={this.state.isSubmitting}
              search={this.state.search}
              weather={this.state.weather}
            />
          </div>
        </div>
      </>
    );
  }
}
