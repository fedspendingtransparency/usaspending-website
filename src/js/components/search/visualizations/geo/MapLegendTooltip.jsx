import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export const mapLegendTT = (
    <div className="award-summary-tooltip related-awards-tt">
        <div className="tooltip__text">
            <strong>Total Spending</strong>
            <p>
                Shows the full amount of dollars spent in each geographic unit (state, county, or congressional district, depending on which you&#39;ve chosen to focus on).
            </p>
        </div>
        <div className="tooltip__text">
            <strong>Per Capita Spending</strong>
            <p>
                Shows the total amount spent in each geographic unit (state, county, or congressional district) divided by the population of that unit. This number makes it easier to compare numbers across geographic units, since spending usually scales by the population of a region.
                Population data for states, counties, and congressional districts is sourced from U.S. Census 2018 estimates.
            </p>
        </div>
    </div>
);
