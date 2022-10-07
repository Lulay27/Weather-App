import React from 'react';

export default function SidePanelHistory(props) {
  return (
    <div>
      {props.isSubmitting ? <h2>Recent Searches</h2> : null}
      {props.isSubmitting
        ? props.cityArr.map((cityData) => {
            return (
              <div
                // onClick={() => {
                //   props.handleHistory(city.text);
                // }}
                key={cityData.id}
              >
                {cityData.cityTitle}
              </div>
            );
          })
        : null}
    </div>
  );
}
