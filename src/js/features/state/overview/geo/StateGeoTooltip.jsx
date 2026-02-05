import React from 'react';
import PropTypes from "prop-types";
import GeoVisualizationTooltip from "components/search/visualizations/geo/GeoVisualizationTooltip";

const propTypes = {
    selectedItem: PropTypes.string,
    showHover: PropTypes.bool
};

const StateGeoTooltip = ({
    selectedItem, showHover
}) => {
    if (!showHover) return null;

    const {
        label,
        value,
        y,
        x,
        visualization,
        total
    } = selectedItem;

    return (
        <GeoVisualizationTooltip
            label={label}
            value={value}
            y={y}
            x={x}
            visualization={visualization}
            total={total}
            description="Awarded Amount" />
    );
};

StateGeoTooltip.propTypes = propTypes;
export default StateGeoTooltip;
