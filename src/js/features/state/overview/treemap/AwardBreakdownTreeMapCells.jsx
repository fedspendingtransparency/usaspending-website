import React, { useCallback } from "react";
import AwardTypeCell from "features/state/overview/treemap/AwardTypeCell";

const AwardBreakdownTreeMapCells = ({ virtualChart, setHoveredAwardType }) => {
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
        <>
            {cells}
        </>
    );
};

export default AwardBreakdownTreeMapCells;
