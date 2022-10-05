import React from 'react';

export default function SidePanelHistory() {
  return (
    <div>
      {this.props.isSubmitting ? <h2>Recent Searches</h2> : null}
      {this.props.isSubmitting
        ? this.props.cityArr.map((city) => {
            return (
              <div
                // onClick={() => {
                //   this.props.handleHistory(city.text);
                // }}
                key={city.id}
              >
                {city.text}
              </div>
            );
          })
        : null}
    </div>
  );
}
