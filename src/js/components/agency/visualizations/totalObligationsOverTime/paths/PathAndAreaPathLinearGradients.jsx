
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { stoppingPoints } from 'helpers/agency/visualizations/TotalObligationsOverTimeVisualizationHelper';
import {
    pathStopColorRed,
    pathStopColorBlue,
    areaPathStopColorRed,
    areaPathStopColorBlue,
    normalStoppingPoints
} from 'dataMapping/agency/visualizations/totalObligationsOverTime';

const propTypes = {
    agencyBudget: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    width: PropTypes.number
};

const PathAndAreaPathLinearGradients = ({
    agencyBudget,
    data,
    width
}) => {
    const [gradientStops, setGradientStops] = useState(normalStoppingPoints);

    useEffect(() => setGradientStops(stoppingPoints(agencyBudget, data)), [agencyBudget, data, width]);

    return (
        <g>
            {/* path linear gradient */}
            <linearGradient id="pathLinearGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                {
                    gradientStops.map((stop, i) => (
                        <stop
                            key={`${stop.offset}-${i}`}
                            offset={stop.offset}
                            stopColor={stop.stopColor === 'blue' ? pathStopColorBlue : pathStopColorRed}
                            stopOpacity="1" />
                    ))
                }
            </linearGradient>
            {/* area path linear gradient */}
            <linearGradient id="areaPathLinearGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                {
                    gradientStops.map((stop, i) => (
                        <stop
                            key={`${stop.offset}-${i}`}
                            offset={stop.offset}
                            stopColor={stop.stopColor === 'blue' ? areaPathStopColorBlue : areaPathStopColorRed}
                            stopOpacity="1" />
                    ))
                }
            </linearGradient>
        </g>
    );
};

PathAndAreaPathLinearGradients.propTypes = propTypes;
export default PathAndAreaPathLinearGradients;
