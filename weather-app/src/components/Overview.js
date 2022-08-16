import React, { Component } from 'react';

// gonna test using weather api and geo api here
export default class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coord: {
        long: 0,
        lat: 0,
      },
      city: 'victoria',
      weather: {
        temp: '',
        feel: '',
      },
    };
  }

  handleButtonClick = () => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.city}&appid=8371ba1206036d8bad7d681b9fced4bd`,
      { mode: 'cors' }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          coord: {
            long: response[0].lon,
            lat: response[0].lat,
          },
        });
      });

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.state.coord.lat}&lon=${this.state.coord.long}&appid=8371ba1206036d8bad7d681b9fced4bd`,
      { mode: 'cors' }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        this.setState({
          weather: {
            temp: response.main.feels_like,
            feel: response.weather[0].description,
          },
        });
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleButtonClick}>destroy all plants</button>
        <li>
          {this.state.weather.temp} and {this.state.weather.feel}
        </li>
      </div>
    );
  }
}
