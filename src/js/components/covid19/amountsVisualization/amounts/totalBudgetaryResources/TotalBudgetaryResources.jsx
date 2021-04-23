/**
 * TotalBudgetaryResource.jsx
 * created by Jonathan Hill 04/22/21
 */

import React from 'react';
import PropTypes from 'prop-types';

import Rectangle from '../shared/Rectangle';
import LineAndText from './LineAndText';


const propTypes = {
    displayTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    showTooltip: PropTypes.bool,
    dataId: PropTypes.string,
    overviewData: PropTypes.object,
    scale: PropTypes.func
};

const dataId = '_totalBudgetAuthority';

const TotalBudgetaryResources = ({
    displayTooltip,
    hideTooltip,
    showTooltip,
    overviewData,
    scale
}) => (
    <g>
        <title>The text, vertical line and rectangle representative of the COVID-19 Total Budgetary Resources</title>
        <Rectangle
            overviewData={overviewData}
            scale={scale}
            displayTooltip={displayTooltip}
            hideTooltip={hideTooltip}
            showTooltip={showTooltip}
            dataId={dataId} />
        <LineAndText
            overviewData={overviewData}
            scale={scale}
            displayTooltip={displayTooltip}
            hideTooltip={hideTooltip}
            showTooltip={showTooltip}
            dataId={dataId} />
    </g>
);

TotalBudgetaryResources.propTypes = propTypes;
export default TotalBudgetaryResources;
