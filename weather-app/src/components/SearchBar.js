import React, { Component } from 'react';

export class SearchBar extends Component {
  render() {
    return (
      <div>
        <label>Enter city here</label>
        <input type="text" placeholder="Search..."></input>
      </div>
    );
  }
}

export class SearchData extends Component {
  render() {
    return <div>SearchBar</div>;
  }
}
