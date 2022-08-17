import React, { Component } from 'react';
import GifAPI from './GifAPI';
import Overview from './Overview';
// import Overview from './Overview';

// right now searchbar is the overview mode code over and clean it so logic makes sense

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

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      input: '',
      gifSearch: this.state.input,
      isSubmitting: true,
    });

    fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=Y3N6ACeh4OhO4q5qG0Z7Sgbk5KIrzRSY&s=${this.state.input}`,
      { mode: 'cors' }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          imgSrc: response.data.images.original.url,
          // isSubmitting: false,
        });
      });

    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.input}&appid=8371ba1206036d8bad7d681b9fced4bd`,
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
          // isSubmitting: false,
          weather: {
            temp: response.main.temp,
            feel: response.main.feels_like,
            hum: response.main.humidity,
            desc: response.weather[0].description,
            country: this.state.weather.country,
          },
        });
      });
  };

  handleApiGif = (gifSearch) => {
    // fetch(
    //   `https://api.giphy.com/v1/gifs/translate?api_key=Y3N6ACeh4OhO4q5qG0Z7Sgbk5KIrzRSY&s=${gifSearch}`,
    //   { mode: 'cors' }
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((response) => {
    //     this.setState({
    //       imgSrc: response.data.images.original.url,
    //       isSubmitting: false,
    //     });
    //   });
    // fetch(
    //   `http://api.openweathermap.org/geo/1.0/direct?q=${gifSearch}&appid=8371ba1206036d8bad7d681b9fced4bd`,
    //   { mode: 'cors' }
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((response) => {
    //     console.log(response[0].country);
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
    // fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.state.coord.lat}&lon=${this.state.coord.long}&appid=8371ba1206036d8bad7d681b9fced4bd`,
    //   { mode: 'cors' }
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({
    //       isSubmitting: false,
    //       weather: {
    //         temp: response.main.temp,
    //         feel: response.main.feels_like,
    //         hum: response.main.humidity,
    //         desc: response.weather[0].description,
    //         country: this.state.weather.country,
    //       },
    //     });
    //   });
  };

  handleApiWeather = (gifSearch) => {
    // fetch(
    //   `http://api.openweathermap.org/geo/1.0/direct?q=${gifSearch}&appid=8371ba1206036d8bad7d681b9fced4bd`,
    //   { mode: 'cors' }
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((response) => {
    //     console.log(response[0].country);
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
    // fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.state.coord.lat}&lon=${this.state.coord.long}&appid=8371ba1206036d8bad7d681b9fced4bd`,
    //   { mode: 'cors' }
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({
    //       isSubmitting: false,
    //       weather: {
    //         temp: response.main.temp,
    //         feel: response.main.feels_like,
    //         hum: response.main.humidity,
    //         desc: response.weather[0].description,
    //         country: this.state.weather.country,
    //       },
    //     });
    //   });
  };

  render() {
    return (
      <>
        <div>
          <form onSubmit={this.handleSubmit}>
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
          <img alt="" src={this.state.imgSrc}></img>
        </div>

        <div>
          {this.state.isSubmitting ? (
            <Overview
              weather={this.state.weather}
              isSubmitting={this.state.isSubmitting}
            />
          ) : (
            ''
          )}
        </div>
      </>
    );
  }
}
