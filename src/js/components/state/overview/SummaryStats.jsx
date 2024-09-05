/**
 * SummaryStats.jsx
 * Created by Keith Didier 07/25/2024
 */

import React from 'react';
import PropTypes from 'prop-types';
import { InformationBoxes } from "data-transparency-ui";

const propTypes = {
    stateProfile: PropTypes.object
};

const SummaryStats = (props) => {
    const { stateProfile } = props;
    const boxes = [{
        title: "Obligations",
        type: 'obligatedAmount',
        amount: stateProfile.totalAmount,
        isMonetary: true,
        isString: true,
        subtitleBottom: `from ${stateProfile.totalAwards} prime awards`
    },
    {
        title: "Outlayed Amount",
        type: 'outlayedAmount',
        amount: stateProfile.totalOutlays,
        isMonetary: true,
        isString: true,
        subtitleBottom: `from ${stateProfile.totalAwards} prime awards`
    },
    {
        title: 'Face Value of Loans',
        type: 'faceValueOfLoans',
        amount: stateProfile.totalFaceValueLoanAmount,
        isMonetary: true,
        isString: true,
        subtitleBottom:
            `from ${stateProfile.totalFaceValueLoanPrimeAwards} prime awards`
    }];

    return (
        <div className="state-section__viz totals-container">
            <InformationBoxes boxes={boxes} />
        </div>
    );
};

SummaryStats.propTypes = propTypes;
export default SummaryStats;
