import React, { Component } from 'react';
import SidePanelData from './SidePanelData';
import styles from './componentStyles.module.css';
import uniqid from 'uniqid';
import WeatherDisplay from './WeatherDisplay';
import SidePanelHistory from './SidePanelHistory';

export class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityArr: [],
      isSubmitting: false,
      errorMsg: '',
      city: {
        text: '',
        id: uniqid(),
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
      city: {
        text: e.target.value,
        id: uniqid(),
      },
    });
  };

  handleError = (e) => {
    e.preventDefault();
    this.setState({
      city: {
        text: 'poop',
      },
      errorMsg: 'Enter a valid city name',
    });
    console.log('hello i am inside error ');
  };

  handleHistory = (city) => {
    this.setState({
      city: {
        text: city.text,
        id: uniqid(),
      },
      cityArr: this.state.cityArr.concat([city]),
    });
  };

  finishSubmit = () => {
    this.setState({
      cityArr: this.state.cityArr.concat([this.state.city]),
      city: {
        text: '',
        id: uniqid(),
      },
      isSubmitting: 'true',
    });
  };

  handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const cordsRes = await (
        await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.city.text}&appid=8371ba1206036d8bad7d681b9fced4bd`,
          { mode: 'cors' }
        )
      ).json();

      const weatherRes = await (
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${cordsRes[0].lat}&lon=${cordsRes[0].lon}&appid=8371ba1206036d8bad7d681b9fced4bd`,
          { mode: 'cors' }
        )
      ).json();

      this.setState(
        {
          errorMsg: '',
          city: {
            text: this.state.city.text,
            id: uniqid(),
            temp: weatherRes.main.temp,
            feel: weatherRes.main.feels_like,
            hum: weatherRes.main.humidity,
            desc: weatherRes.weather[0].description,
            country: cordsRes[0].country,
            icon: weatherRes.weather[0].icon,
          },
        },
        this.finishSubmit
      );

      // console.log('city weather data:', weatherRes);
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
            <form
              onSubmit={
                this.state.city.text !== ''
                  ? this.handleSubmit
                  : this.handleError
              }
            >
              <div className={styles.inputContainer}>
                <input
                  className={styles.formInput}
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="Enter a City"
                ></input>
                <div className={styles.errorMsg}>{this.state.errorMsg}</div>
              </div>
            </form>
            {/* <SidePanelData
              isSubmitting={this.state.isSubmitting}
              city={this.state.city}
            /> */}
            {/* <SidePanelHistory
              isSubmitting={this.state.isSubmitting}
              cityArr={this.state.cityArr}
              handleHistory={this.handleHistory}
            /> */}
          </div>
          <div className={styles.weatherData}>
            <WeatherDisplay
              isSubmitting={this.state.isSubmitting}
              cityArr={this.state.cityArr}
              city={this.state.city}
            />
          </div>
        </div>
      </>
    );
  }
}
