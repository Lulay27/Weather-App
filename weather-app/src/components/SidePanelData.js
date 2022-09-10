import React, { Component } from 'react';
import styles from './componentStyles.module.css';

export default class SidePanelData extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.isSubmitting ? (
          <div className={styles.listContainer}>
            <li>{this.props.search}</li>
            <li>Temperature: {this.props.weather.temp}</li>
            <li>Forcast: {this.props.weather.desc}</li>
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}
