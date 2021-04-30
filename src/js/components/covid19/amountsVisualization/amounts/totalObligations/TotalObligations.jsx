/**
 * TotalObligations.jsx
 * created by Jonathan Hill 04/22/21
 */

import React from 'react';
import PropTypes from 'prop-types';


import Rectangle from '../shared/Rectangle';
import LineAndText from './LineAndText';

const propTypes = {
    displayTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    showTooltip: PropTypes.string,
    dataId: PropTypes.string,
    overviewData: PropTypes.object,
    scale: PropTypes.func,
    remainingBalanceLabelData: PropTypes.shape({
        x: PropTypes.number,
        width: PropTypes.number
    }),
    remainingBalanceValueData: PropTypes.shape({
        x: PropTypes.number,
        width: PropTypes.number
    }),
    publicLawFilter: PropTypes.string
};

const dataId = '_totalObligations';

const TotalObligations = ({
    displayTooltip,
    hideTooltip,
    showTooltip,
    overviewData,
    scale,
    remainingBalanceLabelData,
    remainingBalanceValueData,
    publicLawFilter
}) => (
    <g>
        <title>The text, vertical line and rectangle representative of the COVID-19 Total Obligations</title>
        <LineAndText
            overviewData={overviewData}
            scale={scale}
            displayTooltip={displayTooltip}
            hideTooltip={hideTooltip}
            dataId={dataId}
            remainingBalanceLabelData={remainingBalanceLabelData}
            remainingBalanceValueData={remainingBalanceValueData}
            publicLawFilter={publicLawFilter} />
        <Rectangle
            overviewData={overviewData}
            scale={scale}
            displayTooltip={displayTooltip}
            hideTooltip={hideTooltip}
            showTooltip={showTooltip}
            dataId={dataId}
            publicLawFilter={publicLawFilter} />
    </g>
);

TotalObligations.propTypes = propTypes;
export default TotalObligations;
