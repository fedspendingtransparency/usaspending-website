import React from 'react';
import { Link } from 'react-router-dom';

const HomePageTooltip = () => (
  <div className="homepage__covid-19-tt">
    <h2 className="tooltip__title">COVID-19 Spending</h2>
      <div className="tooltip__text">
        <p>This amount represents Total Outlays of COVID-19 supplemental appropriations as reported by federal agencies. Visit our <Link to="/disaster/covid-19">COVID-19 Spending profile page</Link> to learn more, including details about the CFDA Programs that are scrolling on the homepage.</p>
      </div>
  </div>
);

export default HomePageTooltip;
