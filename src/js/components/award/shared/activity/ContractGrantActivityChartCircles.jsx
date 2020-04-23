/**
 * ContractGrantActivityChartCircles.jsx
 * Created by Jonathan Hill 04/23/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    circles: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        description: PropTypes.string,
        className: PropTypes.string,
        cx: PropTypes.number,
        cy: PropTypes.number,
        r: PropTypes.number
    }))
};

const ContractGrantActivityChartCircles = ({ circles }) => {
    if (!circles.length) return null;
    return (
        <g className="contract-grant-activity-chart__circles">
            {
                circles.map((circle) => {
                    const {
                        key,
                        description,
                        className,
                        cx,
                        cy,
                        r
                    } = circle;
                    return (
                        <g key={key} tabIndex="0">
                            <desc>{description}</desc>
                            <circle
                                className={className}
                                cx={cx}
                                cy={cy}
                                r={r} />
                        </g>
                    );
                })
            }
        </g>
    );
};

ContractGrantActivityChartCircles.propTypes = propTypes;
export default ContractGrantActivityChartCircles;
