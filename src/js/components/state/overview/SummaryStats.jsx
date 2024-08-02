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

    return (
        <div className="state-section__viz totals-container">
            <InformationBoxes boxes={[
                {
                    title: "Obligated Amount",
                    type: 'obligatedAmount',
                    amount: stateProfile.totalAmount,
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
                }
            ]} />
        </div>
    );
};

SummaryStats.propTypes = propTypes;
export default SummaryStats;
