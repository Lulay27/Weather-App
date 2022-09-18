import React, { Component } from 'react';

export default class SidePanelHistory extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.isSubmitting
          ? this.props.cityArr.map((city) => {
              return <h1>{city}</h1>;
            })
          : ''}
      </div>
    );
  }
}
