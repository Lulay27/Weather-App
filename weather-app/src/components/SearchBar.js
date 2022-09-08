import React, { Component } from 'react';
import Overview from './Overview';

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
  };

  render() {
    return (
      <>
        <div>
          <form onSubmit={this.state.input !== '' ? this.handleSubmit : null}>
            <input
              onChange={this.handleInputChange}
              type="text"
              placeholder="Enter a word"
              value={this.state.input}
            ></input>
            <button>Submit</button>
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
