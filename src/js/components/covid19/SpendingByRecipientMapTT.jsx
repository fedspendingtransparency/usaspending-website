import React from 'react';

const SpendingByRecipientMapTT = () => (
    <div className="spending_types-tt">
        <h2 className="tooltip__title">Recipient Map</h2>
        <div className="tooltip__text">
            <p>
                Use the dropdowns below to filter spending amounts on the map.
            </p><br />
            <p>
                <strong>Obligations</strong> refer to amounts promised to be paid by agencies.
            </p><br />
            <p>
                <strong>Outlays</strong> refer to amounts actually paid by agencies.
            </p><br />
            <p>
                <strong>Face Value of Loans</strong> refers to the amount that agencies have issued in loans (i.e., direct loans) and loan guarantees (i.e., indirect loans).
            </p><br />
            <p>
                <strong>Total Spending</strong> refers to the full amount of dollars spent in each location type (i.e., state, county, or congressional district).
            </p><br />
            <p>
                <strong>Per Capita Spending</strong> refers to the total amount spent in each location type divided by the population of that area. This spending type makes it easier to compare amounts across different locations, since spending usually scales by the population of a region. Population data for states, counties, and congressional districts are sourced from U.S. Census 2018 estimates.
            </p>
        </div>
    </div>
);

export default SpendingByRecipientMapTT;
