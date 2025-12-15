import React from "react";
import AwardTypeCell from "features/state/overview/treemap/AwardTypeCell";

const AwardBreakdownTreeMapCells = ({ virtualChart, setHoveredAwardType }) => {
    const toggleTooltipIn = (awardTypeId) => {
        setHoveredAwardType(awardTypeId);
    };

    const toggleTooltipOut = () => {
        setHoveredAwardType('');
    };

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
