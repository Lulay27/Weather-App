import React, { Component } from 'react';

// note problem where did not show gif on submit click
// fix by moving fetch(data) into handleSubmit

export default class GifAPI extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   gifSearch: this.props.gifSearch,
    //   imgSrc: '',
    // };
  }

  render() {
    return (
      <div>
        {this.props.isSubmitting
          ? this.props.handleApiGif(this.props.gifSearch)
          : ''}
      </div>
    );
  }
}
