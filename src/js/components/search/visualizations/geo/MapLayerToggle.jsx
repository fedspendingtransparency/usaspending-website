/**
 * MapLayerToggle.jsx
 * Created by Kevin Li 10/26/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';
import { CondensedCDTooltip } from '../../../award/shared/InfoTooltipContent';
import FeatureFlag from '../../../sharedComponents/FeatureFlag';

const propTypes = {
    active: PropTypes.string,
    available: PropTypes.array,
    changeMapLayer: PropTypes.func,
    sources: PropTypes.object
};

const capitalizeLabel = (original) => {
    const regexFirstLetter = /(^|\s)[a-z]/g;
    return original.replace(regexFirstLetter, (match) => match.toUpperCase());
};

const MapLayerToggle = (props) => {
    const clickedLayer = (e) => {
        const scope = e.target.value;
        props.changeMapLayer(scope);
    };

    const items = props.available.map((layer) => {
        const title = capitalizeLabel(props.sources[layer].label);
        let active = '';
        if (props.active === layer) {
            active = 'active';
        }
        return (
            <li
                key={layer}>
                <button
                    className={`map-layer-option ${active}`}
                    onClick={clickedLayer}
                    title={`Display by ${title}`}
                    aria-label={`Display by ${title}`}
                    data-content={title}
                    value={layer}>
                    {title === 'Congressional District' ?
                        <span
                            style={{ display: 'flex' }}>
                            {title}s <FeatureFlag><TooltipWrapper tooltipPosition="right" icon="info" tooltipComponent={<CondensedCDTooltip title="Congressional District" />} /></FeatureFlag>
                        </span>
                        :
                        <>{title}s </>}
                </button>
            </li>
        );
    });

    return (
        <div className="map-layer-toggle">
            <ul className="map-layer-list">
                {items}
            </ul>
        </div>
    );
};

MapLayerToggle.propTypes = propTypes;

export default MapLayerToggle;
