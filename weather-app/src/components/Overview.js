import React, { Component } from 'react';

// gonna test using weather api and geo api here
export default class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherObj: '',
      weather: {
        temp: '',
        feel: '',
      },
    };
  }

  handleButtonClick = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=48&lon=123&appid=8371ba1206036d8bad7d681b9fced4bd`,
      { mode: 'cors' }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        this.setState({
          weatherObj: response,
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
