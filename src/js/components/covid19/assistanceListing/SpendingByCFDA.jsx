/**
 * SpendingByCFDA.jsx
 * Created by Lizzie Salita 6/22/20
 */

import React from 'react';
import OverviewData from '../OverviewData';

const overviewData = [
    {
        type: 'totalCfda',
        label: 'Total CFDA Programs'
    },
    {
        type: 'totalAwardOutlays',
        label: 'Total Award Outlays',
        dollarAmount: true
    },
    {
        type: 'totalAwardObligations',
        label: 'Total Award Obligations',
        dollarAmount: true
    },
    {
        type: 'numberOfAwards',
        label: 'Total Number of Awards'
    }
];

const SpendingByCFDA = () => {
    // TODO - replace hard-coded values with numbers from Redux and count API response
    const amounts = {
        totalCfda: 35,
        totalAwardOutlays: 413100000000,
        totalAwardObligations: 866700000000,
        numberOfAwards: 53000000
    };
    return (
        <div className="body__content assistance-listing">
            <h3 className="body__narrative">
                These are the assistance listings that supported the COVID-19 Response with <strong>awards</strong>.
            </h3>
            <p className="body__narrative-description">
                The total federal spending for the COVID-19 Response can be divided into different budget categories, including the different agencies that spent funds, the Federal Spending bills and Federal Accounts that funded the Response, and the different types of items and services that were purchased.
            </p>
            <div className="overview-data-group">
                {overviewData.map((data) => (
                    <OverviewData
                        key={data.label}
                        {...data}
                        // TODO - use the active award type in the subtitle
                        subtitle="for all awards"
                        amount={amounts[data.type]} />
                ))}
            </div>
        </div>
    );
};

export default SpendingByCFDA;
