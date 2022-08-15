import React, { Component } from 'react';

export default class GifAPI extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.gifSearch !== ''
          ? this.props.isSubmitting
            ? this.props.handleApiGif(this.props.gifSearch)
            : ''
          : ''}
      </div>
    );
  }
}
