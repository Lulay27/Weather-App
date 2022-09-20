import React, { Component } from 'react';

export default class SidePanelHistory extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.isSubmitting ? <h2>Recent Searches</h2> : null}
        {this.props.isSubmitting
          ? this.props.cityArr.map((city) => {
              return <div>{city}</div>;
            })
          : null}
      </div>
    );
  }
}
