/**
 * StateTimeVisualizationHeader.jsx
 * Created on 12/17/2025 by Josue Aguilar
 */

import React, { useState } from "react";
import { NewPicker, SectionHeader } from "data-transparency-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import OutlaysToggle from "./OutlaysToggle";
import OutlaysExplanation from "./OutlaysExplanation";

const StateTimeVisualizationHeader = ({
    visualizationPeriod,
    updateVisualizationPeriod,
    outlayToggle,
    setOutlayToggle
}) => {
    const [outlayWhatOpen, setOutlayWhatOpen] = useState(false);

    const onClick = (e) => {
        updateVisualizationPeriod(e);
    };

    const dropdownOptions = [
        {
            name: 'Year',
            value: 'fiscal_year',
            onClick
        },
        {
            name: 'Quarter',
            value: 'quarter',
            onClick
        },
        {
            name: 'Month',
            value: 'month',
            onClick
        }
    ];

    const sortFn = () => dropdownOptions;

    /* TODO: Add back in once outlays are resolved, commented out in DEV-13189 */
    const showOutlays = false;

    return (
        <>
            <SectionHeader
                icon={<FontAwesomeIcon icon="chart-bar" size="2x" />}
                title="Transactions Over Time"
                titleTooltip={{ component: false }}
                descTooltip={{ component: false }} />
            <hr className="results-divider" />
            <div className="state-section__description">
                The graph below shows trends over time for transactions to this state.{" "}
                Break down the amounts by years, quarters, or months,{" "}
                and hover over the bars for more detailed information.
            </div>
            <div className="state__controls-desktop">
                <NewPicker
                    leftIcon=""
                    size="md"
                    options={dropdownOptions}
                    label="View by"
                    enabled
                    classname="state-dropdown__picker"
                    selectedOption={dropdownOptions?.length
                        ? dropdownOptions?.find((obj) => obj.value === visualizationPeriod)?.name
                        : `${visualizationPeriod}`}
                    sortFn={sortFn} />
                {showOutlays &&
                    <OutlaysToggle
                        outlayToggle={outlayToggle}
                        setOutlayToggle={setOutlayToggle}
                        outlayWhatOpen={outlayWhatOpen}
                        setOutlayWhatOpen={setOutlayWhatOpen} />
                }
            </div>
            { showOutlays && <OutlaysExplanation outlayWhatOpen={outlayWhatOpen} /> }
        </>
    );
};

export default StateTimeVisualizationHeader;
