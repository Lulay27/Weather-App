import React, { Component } from 'react';

// note problem where did not show gif on submit click
// fix by moving fetch(data) into handleSubmit

export default class GifAPI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gifSearch: this.props.gifSearch,
      imgSrc: '',
    };
  }

  componentDidMount() {
    fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=Y3N6ACeh4OhO4q5qG0Z7Sgbk5KIrzRSY&s=${this.state.gifSearch}`,
      { mode: 'cors' }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          imgSrc: response.data.images.original.url,
        });
      });
  }

  render() {
    return (
      <div>
        swag
        <img src={this.state.imgSrc}></img>
      </div>
    );
  }
}
