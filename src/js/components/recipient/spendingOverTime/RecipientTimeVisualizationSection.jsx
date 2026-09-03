/**
 * RecipientTimeVisualizationSection.jsx
 * Created by Lizzie Salita 7/6/18
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FlexGridRow } from "data-transparency-ui";

import useCallbackRef from "../../../hooks/useCallbackRef";
import RecipientTimeVisualization from './RecipientTimeVisualization';
import RecipientTimeVisualizationSectionHeader from "./RecipientTimeVisualizationSectionHeader";
import RecipientTimeVisualizationSectionButtons from "./RecipientTimeVisualizationSectionButtons";

const propTypes = {
    data: PropTypes.object,
    visualizationPeriod: PropTypes.string,
    updateVisualizationPeriod: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.bool
};

const RecipientTimeVisualizationSection = ({
    data, visualizationPeriod, updateVisualizationPeriod, loading, error
}) => {
    const [width, setWidth] = useState(0);

    const getWidth = (entry) => setWidth(entry.contentRect.width);

    const ref = useCallbackRef(getWidth);

    return (
        <FlexGridRow
            id="recipient-transactions-over-time"
            className="recipient-section transactions-over-time">
            <RecipientTimeVisualizationSectionHeader sectionHrRef={ref} />
            <RecipientTimeVisualizationSectionButtons
                visualizationPeriod={visualizationPeriod}
                updateVisualizationPeriod={updateVisualizationPeriod} />
            <RecipientTimeVisualization
                visualizationPeriod={visualizationPeriod}
                loading={loading}
                error={error}
                data={data}
                width={width}
                color="#141D3B" />
        </FlexGridRow>
    );
};

RecipientTimeVisualizationSection.propTypes = propTypes;
export default RecipientTimeVisualizationSection;
