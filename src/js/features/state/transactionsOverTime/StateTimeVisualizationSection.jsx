/**
 * StateTimeVisualizationSection.jsx
 * Created by David Trinh 5/15/18
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import StateTimeVisualizationChart from
    'components/state/spendingovertime/StateTimeVisualizationChart';
import StateTimeVisualizationHeader from "./header/StateTimeVisualizationHeader";

const propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    visualizationPeriod: PropTypes.string,
    updateVisualizationPeriod: PropTypes.func
};

const StateTimeVisualizationSection = ({
    data,
    loading,
    visualizationPeriod,
    updateVisualizationPeriod
}) => {
    const [outlayToggle, setOutlayToggle] = useState(false);
    const [visualizationWidth, setVisualizationWidth] = useState(0);

    return (
        <section
            id="state-transactions-over-time"
            className="state-section transactions-over-time">
            <StateTimeVisualizationHeader
                updateVisualizationPeriod={updateVisualizationPeriod}
                visualizationPeriod={visualizationPeriod}
                setVisualizationWidth={setVisualizationWidth}
                outlayToggle={outlayToggle}
                setOutlayToggle={setOutlayToggle} />
            <StateTimeVisualizationChart
                visualizationPeriod={visualizationPeriod}
                loading={loading}
                data={data}
                width={visualizationWidth}
                outlayToggle={outlayToggle} />
        </section>
    );
};

StateTimeVisualizationSection.propTypes = propTypes;
export default StateTimeVisualizationSection;
