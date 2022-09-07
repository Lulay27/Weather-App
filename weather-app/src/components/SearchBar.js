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

    console.log('gifsearch:', this.state.gifSearch);
    console.log('input:', this.state.input);

    // fetch(
    //   `https://api.giphy.com/v1/gifs/translate?api_key=Y3N6ACeh4OhO4q5qG0Z7Sgbk5KIrzRSY&s=${this.state.input}`,
    //   { mode: 'cors' }
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((response) => {
    //     this.setState({
    //       imgSrc: response.data.images.original.url,
    //       // isSubmitting: false,
    //     });
    //   });

    const cordsRes = await (
      await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.input}&appid=8371ba1206036d8bad7d681b9fced4bd`,
        { mode: 'cors' }
      )
    ).json();

    this.setState({
      coord: {
        long: cordsRes[0].lon,
        lat: cordsRes[0].lat,
      },
      weather: {
        country: cordsRes[0].country,
      },
    });

    console.log('Coords:', cordsRes);

    // fetch(
    //   `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.input}&appid=8371ba1206036d8bad7d681b9fced4bd`,
    //   { mode: 'cors' }
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((response) => {
    //     console.log('coords', response);
    //     this.setState({
    //       coord: {
    //         long: response[0].lon,
    //         lat: response[0].lat,
    //       },
    //       weather: {
    //         country: response[0].country,
    //       },
    //     });
    //   });

    const weatherRes = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.state.coord.lat}&lon=${this.state.coord.long}&appid=8371ba1206036d8bad7d681b9fced4bd`,
        { mode: 'cors' }
      )
    ).json();

    this.setState({
      // input: '',
      weather: {
        temp: weatherRes.main.temp,
        feel: weatherRes.main.feels_like,
        hum: weatherRes.main.humidity,
        desc: weatherRes.weather[0].description,
        // country: this.state.weather.country,
      },
    });

    // debuging
    console.log(this.state.input, weatherRes);
    console.log(this.state.gifSearch, cordsRes);
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

        {/* <div>
          <img alt="" src={this.state.imgSrc}></img>
        </div> */}

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
