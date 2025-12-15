import React from "react";

import AwardTypeCell from "components/state/visualizations/awardBreakdown/AwardTypeCell";
import * as TreemapHelper from "helpers/treemapHelper";


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
            key={cell.awardType}
            strokeColor="white"
            strokeOpacity={0.5}
            tooltipStyles={TreemapHelper.stateTooltipStyles}
            toggleTooltipIn={toggleTooltipIn}
            toggleTooltipOut={toggleTooltipOut}
            opacity={1} />
    ));

    return (
        <>
            {cells}
        </>
    );
};

export default AwardBreakdownTreeMapCells;
