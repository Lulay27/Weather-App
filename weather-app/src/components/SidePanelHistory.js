import React from 'react';

export default function SidePanelHistory(props) {
  const reversedArray = props.cityArr.slice(0).reverse();

  return (
    <div>
      <h2>Recent Searches</h2>
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
