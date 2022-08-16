import React, { Component } from 'react';

// gonna test using weather api and geo api here
export default class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  handleButtonClick = () => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${this.props.gifSearch}&appid=8371ba1206036d8bad7d681b9fced4bd`,
      { mode: 'cors' }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response[0].country);
        this.setState({
          coord: {
            long: response[0].lon,
            lat: response[0].lat,
          },
          weather: {
            country: response[0].country,
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
            temp: response.main.temp,
            feel: response.main.feels_like,
            hum: response.main.humidity,
            desc: response.weather[0].description,
            country: this.state.weather.country,
          },
        });
      });

    // return (
    //   <li>
    //     {this.props.gifSearch} {this.state.weather.temp}{' '}
    //     {this.state.weather.feel}
    //   </li>
    // );
  };

  // is there a way to do this differently? like return jsx on handlebuttonclick() call?

  render() {
    return (
      <div>
        {this.props.isSubmitting ? this.handleButtonClick() : ''}
        {/* <button onClick={this.handleButtonClick}>destroy all plants</button> */}
        <div>
          <li>{this.props.gifSearch}</li>
          <li>{this.state.weather.temp}</li>
          <li>{this.state.weather.feel}</li>
          <li>{this.state.weather.hum}</li>
          <li>{this.state.weather.desc}</li>
          <li>{this.state.weather.country}</li>
        </div>
      </div>
    );
  }
}
