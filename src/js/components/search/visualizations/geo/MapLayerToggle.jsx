/**
 * MapLayerToggle.jsx
 * Created by Kevin Li 10/26/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';
import { CondensedCDTooltip } from '../../../award/shared/InfoTooltipContent';
import { tabletScreen, xLargeScreen } from '../../../../dataMapping/shared/mobileBreakpoints';

const propTypes = {
    active: PropTypes.string,
    available: PropTypes.array,
    changeMapLayer: PropTypes.func,
    sources: PropTypes.object,
    className: PropTypes.string
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
        let tempLabel = '';
        if (props.sources[layer].label === 'country') {
            tempLabel = 'countries';
        }
        else if (props.sources[layer].label === 'county') {
            tempLabel = 'U.S. counties';
        }
        else if (props.sources[layer].label === 'state') {
            tempLabel = 'U.S. states';
        }
        else {
            tempLabel = 'U.S. Congressional Districts';
        }
        const title = capitalizeLabel(tempLabel);
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
                    {title}
                </button>
                {title === "Congressional Districts" ?
                    <div className="map-layer__cd-tooltip">
                        <TooltipWrapper
                            icon="info"
                            className={props.className}
                            tooltipPosition={(window.innerWidth >= tabletScreen && window.innerWidth <= xLargeScreen) ? 'left' : 'right'}
                            tooltipComponent={<CondensedCDTooltip title="Congressional Districts" />} />
                    </div>
                    : null}
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
