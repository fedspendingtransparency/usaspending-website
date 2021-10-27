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
    className: PropTypes.string,
    publicLaw: PropTypes.string
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
    className,
    publicLaw
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
            width={width}
            publicLaw={publicLaw} />
        <Rectangle
            overviewData={overviewData}
            className={className}
            scale={scale}
            displayTooltip={displayTooltip}
            hideTooltip={hideTooltip}
            showTooltip={showTooltip}
            tooltipId={tooltipId}
            dataId={dataId}
            publicLaw={publicLaw} />
    </g>
);

DefaultAmountViz.propTypes = propTypes;
export default DefaultAmountViz;
