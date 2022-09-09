import React, { Component } from 'react';
import { SearchBar } from './SearchBar';
import styles from './componentStyles.module.css';

export default class MainPage extends Component {
  render() {
    return (
      <>
        <div className={styles.main}>
          <div className={styles.test}>
            <h1>Weather Application</h1>
          </div>

          <div className="searchbar-container">
            <SearchBar />
          </div>
        </div>
      </>
    );
  }
}
