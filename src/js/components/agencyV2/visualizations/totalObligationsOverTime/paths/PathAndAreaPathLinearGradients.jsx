
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    yScale: PropTypes.func,
    height: PropTypes.number.isRequired,
    agencyBudget: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    padding: PropTypes.object.isRequired
};

const PathAndAreaPathLinearGradients = ({
    yScale,
    height,
    agencyBudget,
    data
}) => {
    const [agencyBudgetStoppingPoint, setAgencyBudgetStoppingPoint] = useState(0);

    useEffect(() => {
        if (yScale && height && agencyBudget && data.length) {
            const maxObligation = Math.max(...data.map((x) => x.obligated));
            const difference = maxObligation - agencyBudget;
            // the stopping point between gradient colors equates to the percent difference between max obligation and agency budget
            const percentDifference = `${((difference / maxObligation) * 100)}%`;
            if (difference >= 0) {
                setAgencyBudgetStoppingPoint(percentDifference);
            }
            else {
                setAgencyBudgetStoppingPoint('0%');
            }
        }
    }, [yScale, height, agencyBudget]);

    return (
        <g>
            <linearGradient id="pathLinearGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                {/* $color-secondary */}
                <stop offset="0%" stopColor="#e31c3d" stopOpacity="1" />
                <stop offset={agencyBudgetStoppingPoint} stopColor="#e31c3d" stopOpacity="1" />
                {/* $color-cool-blue; */}
                <stop offset={agencyBudgetStoppingPoint} stopColor="#205493" stopOpacity="1" />
                <stop offset="100%" stopColor="#205493" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="areaPathLinearGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                {/* $color-secondary-lightest */}
                <stop offset="0%" stopColor="#f9dede" stopOpacity="1" />
                <stop offset={agencyBudgetStoppingPoint} stopColor="#f9dede" stopOpacity="1" />
                {/* $color-cool-blue-lightest; */}
                <stop offset={agencyBudgetStoppingPoint} stopColor="#dce4ef" stopOpacity="1" />
                <stop offset="100%" stopColor="#dce4ef" stopOpacity="1" />
            </linearGradient>
        </g>
    );
};

PathAndAreaPathLinearGradients.propTypes = propTypes;
export default PathAndAreaPathLinearGradients;
