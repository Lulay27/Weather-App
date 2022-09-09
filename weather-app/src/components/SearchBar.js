import React, { Component } from 'react';
import Overview from './Overview';
import styles from './componentStyles.module.css';
import search from '../public/search.png';

export class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      gifSearch: '',
      isSubmitting: false,
      imgSrc: '',
      city: '',
      coord: {
        long: 0,
        lat: 0,
      },
      weather: {
        temp: '',
        feel: '',
        hum: '',
        desc: '',
        country: '',
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
        gifSearch: this.state.input,
        isSubmitting: true,
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
        <div>
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
        </div>
        <div>
          <Overview
            isSubmitting={this.state.isSubmitting}
            gifSearch={this.state.gifSearch}
            weather={this.state.weather}
          />
        </div>
      </>
    );
  }
}
