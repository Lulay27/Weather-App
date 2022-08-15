import React, { Component } from 'react';
import GifAPI from './GifAPI';

// right now searchbar is the overview mode code over and clean it so logic makes sense

export class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      gifSearch: '',
      isSubmitting: false,
      imgSrc: '',
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
  };

  handleApiGif = (gifSearch) => {
    fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=Y3N6ACeh4OhO4q5qG0Z7Sgbk5KIrzRSY&s=${gifSearch}`,
      { mode: 'cors' }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          imgSrc: response.data.images.original.url,
          isSubmitting: false,
        });
      });
  };

  render() {
    return (
      <div>
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
          <GifAPI
            isSubmitting={this.state.isSubmitting}
            handleApiGif={this.handleApiGif}
            gifSearch={this.state.gifSearch}
          />
        </div>
        <div>
          <img src={this.state.imgSrc}></img>
        </div>
      </div>
    );
  }
}
