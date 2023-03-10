import React from 'react';
import styles from './componentStyles.module.css';

// displays history of city searches. Most recent on top
export default function SidePanelHistory(props) {
  const reversedArray = props.cityArr.slice(0).reverse();
  return (
    <div>
      <h2>Recent Searches</h2>
      <button className={styles.authBtn} onClick={props.isClearing}>
        clear
      </button>
      {reversedArray.map((cityData) => {
        return (
          <div key={cityData.id}>
            <ol>{cityData.cityTitle}</ol>
          </div>
        );
      })}
    </div>
  );
}
