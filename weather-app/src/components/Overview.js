import React, { Component } from 'react';

// gonna test using weather api and geo api here
export default class Overview extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   city: '',
    //   coord: {
    //     long: 0,
    //     lat: 0,
    //   },
    //   weather: {
    //     temp: '',
    //     feel: '',
    //     hum: '',
    //     desc: '',
    //     country: '',
    //   },
    // };
  }

  // is there a way to do this differently? like return jsx on handlebuttonclick() call?

  render() {
    return (
      <>
        <div>
          <li>
            Location: {this.props.gifSearch},{this.props.weather.country}
          </li>
          <li>Temperature: {this.props.weather.temp}</li>
          <li>Feels like: {this.props.weather.feel}</li>
          <li>Humidty: {this.props.weather.hum}</li>
          <li>Forcast: {this.props.weather.desc}</li>
        </div>
      </>
    );
  }
}
