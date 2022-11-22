import React from 'react';

export default function SidePanelHistory(props) {
  const reversedArray = props.cityArr.slice(0).reverse();

  return (
    <div>
      {props.isSubmitting ? <h2>Recent Searches</h2> : null}
      {props.isSubmitting
        ? reversedArray.map((cityData) => {
            return (
              <div key={cityData.id}>
                <button onClick={() => props.testerFunc(cityData.id)}>
                  {cityData.cityTitle}
                </button>
              </div>
            );
          })
        : null}
    </div>
  );
}
