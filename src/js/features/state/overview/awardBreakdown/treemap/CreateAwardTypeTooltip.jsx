/**
 * CreateAwardTypeTooltip.jsx
 * Created on 12/15/2025 by Josue Aguilar
 */

import React from "react";
import { find } from "lodash-es";

import { awardTypeLabels } from "dataMapping/state/awardTypes";
import AwardTypeTooltip from "features/state/overview/awardBreakdown/treemap/AwardTypeTooltip";
import { formatMoneyWithUnitsShortLabel } from "helpers/moneyFormatter";
import * as MoneyFormatter from "helpers/moneyFormatter";


const CreateAwardTypeTooltip = ({
    awardBreakdown,
    totalAmount,
    toggleState,
    sectionWrapper,
    hoveredAwardType,
    virtualChart,
    amountType
}) => {
    const createTooltip = () => {
        let tooltip = null;

        // We have to check for the existence of the ref so that Firefox doesn't die
        let sectionHeight = 0;
        if (sectionWrapper.current) {
            sectionHeight = sectionWrapper.current.getBoundingClientRect().height;
        }

        if (hoveredAwardType) {
            const awardType = find(awardBreakdown,
                { type: `${hoveredAwardType}` });

            const awardTypeDefinition = awardTypeLabels[hoveredAwardType];

            const node = find(virtualChart,
                { awardType: `${hoveredAwardType}` });

            tooltip = (
                <AwardTypeTooltip
                    value={formatMoneyWithUnitsShortLabel(awardType[amountType.current])}
                    percentage={MoneyFormatter.calculatePercentage(
                        awardType[amountType.current], totalAmount)
                    }
                    description={awardTypeDefinition}
                    x={node.x0}
                    y={node.y0}
                    width={node.width}
                    height={node.height}
                    sectionHeight={sectionHeight}
                    toggleState={toggleState} />
            );
        }

        return tooltip;
    };

    return (
        <>
            {createTooltip()}
        </>
    );
};

export default CreateAwardTypeTooltip;
