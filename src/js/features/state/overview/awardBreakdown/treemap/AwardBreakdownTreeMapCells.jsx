/**
 * AwardBreakdownTreeMap.jsx
 * Created on 12/15/2025 by Josue Aguilar
 */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import AwardTypeCell from "features/state/overview/awardBreakdown/treemap/AwardTypeCell";

const propTypes = {
    virtualChart: PropTypes.object,
    setHoveredAwardType: PropTypes.func,
    sectionWrapper: PropTypes.shape({ current: PropTypes.object }),
    visualizationWidth: PropTypes.number,
    visualizationHeight: PropTypes.number
};

const AwardBreakdownTreeMapCells = ({
    virtualChart, setHoveredAwardType, sectionWrapper, visualizationWidth, visualizationHeight
}) => {
    const toggleTooltipIn = useCallback((awardTypeId) => {
        setHoveredAwardType(awardTypeId);
    }, [setHoveredAwardType]);

    const toggleTooltipOut = useCallback(() => {
        setHoveredAwardType('');
    }, [setHoveredAwardType]);

    const cells = virtualChart.map((cell) => (
        <AwardTypeCell
            {...cell}
            strokeColor="white"
            strokeOpacity={0.5}
            toggleTooltipIn={toggleTooltipIn}
            toggleTooltipOut={toggleTooltipOut}
            opacity={1}
            key={cell.awardType} />
    ));

    return (
        <div
            className="tree-wrapper"
            ref={sectionWrapper}>
            <svg
                width={visualizationWidth}
                height={visualizationHeight}
                className="treemap-svg overlay">
                {cells}
            </svg>
        </div>
    );
};

AwardBreakdownTreeMapCells.propTypes = propTypes;
export default AwardBreakdownTreeMapCells;
