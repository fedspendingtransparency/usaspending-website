/**
 * SummaryStats.jsx
 * Created by Keith Didier 07/25/2024
 */

import React from 'react';
import PropTypes from 'prop-types';
import { InformationBoxes } from "data-transparency-ui";

const propTypes = {
    overview: PropTypes.object
};

const SummaryStats = ({ overview }) => {
    const boxes = [{
        title: "Obligations",
        type: 'obligatedAmount',
        amount: overview.totalAmount,
        isMonetary: true,
        isString: true,
        subtitleBottom: `from ${overview.totalAwards} prime awards`
    },
    {
        title: "Outlayed Amount",
        type: 'outlayedAmount',
        amount: overview.totalOutlays,
        isMonetary: true,
        isString: true,
        subtitleBottom: `from ${overview.totalAwards} prime awards`
    },
    {
        title: 'Face Value of Loans',
        type: 'faceValueOfLoans',
        amount: overview.totalFaceValueLoanAmount,
        isMonetary: true,
        isString: true,
        subtitleBottom:
            `from ${overview.totalFaceValueLoanPrimeAwards} prime awards`
    }];

    return (
        <div className="state-section__row">
            <div className="state-section__viz totals-container">
                <InformationBoxes boxes={boxes} />
            </div>
        </div>
    );
};

SummaryStats.propTypes = propTypes;
export default SummaryStats;
