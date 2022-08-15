import React, { Component } from 'react';
import GifAPI from './GifAPI';

// right now searchbar is the overview mode code over and clean it so logic makes sense

export class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      gifSearch: '',
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
    });
  };

  render() {
    return (
      <div>
        <div>
          <form onClick={this.handleSubmit}>
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
          <GifAPI gifSearch={this.state.gifSearch} />
        </div>
      </div>
    );
  }
}
