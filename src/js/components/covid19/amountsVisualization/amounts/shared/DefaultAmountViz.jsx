/**
 * DefaultAmountViz.jsx
 * created by Jonathan Hill 04/22/21
 */

import React from 'react';
import PropTypes from 'prop-types';

import Rectangle from './Rectangle';
import DefaultLineAndText from './DefaultLineAndText';


const propTypes = {
    dataId: PropTypes.string,
    tooltipId: PropTypes.string,
    displayTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    showTooltip: PropTypes.string,
    overviewData: PropTypes.object,
    scale: PropTypes.func,
    width: PropTypes.number,
    className: PropTypes.string
};

const DefaultAmountViz = ({
    dataId,
    tooltipId,
    displayTooltip,
    hideTooltip,
    showTooltip,
    overviewData,
    scale,
    width,
    className
}) => (
    <g>
        <DefaultLineAndText
            overviewData={overviewData}
            className={className}
            scale={scale}
            displayTooltip={displayTooltip}
            hideTooltip={hideTooltip}
            tooltipId={tooltipId}
            dataId={dataId}
            width={width} />
        <Rectangle
            overviewData={overviewData}
            className={className}
            scale={scale}
            displayTooltip={displayTooltip}
            hideTooltip={hideTooltip}
            showTooltip={showTooltip}
            tooltipId={tooltipId}
            dataId={dataId} />
    </g>
);

DefaultAmountViz.propTypes = propTypes;
export default DefaultAmountViz;
