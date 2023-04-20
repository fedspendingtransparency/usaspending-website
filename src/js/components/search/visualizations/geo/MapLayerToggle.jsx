/**
 * MapLayerToggle.jsx
 * Created by Kevin Li 10/26/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';
import { CondensedCDTooltip } from '../../../award/shared/InfoTooltipContent';
import FeatureFlag from '../../../sharedComponents/FeatureFlag';
import { tabletScreen, mLargeScreen } from '../../../../dataMapping/shared/mobileBreakpoints';

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
        if (props.sources[layer].label === 'county') {
            tempLabel = 'counties';
        }
        else if (props.sources[layer].label === 'state') {
            tempLabel = 'states';
        }
        else {
            tempLabel = 'Congressional Districts';
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
                    <FeatureFlag>
                        <div className="map-layer__cd-tooltip">
                            <TooltipWrapper
                                icon="info"
                                className={props.className}
                                tooltipPosition={(window.innerWidth >= tabletScreen && window.innerWidth <= mLargeScreen) ? 'left' : 'right'}
                                tooltipComponent={<CondensedCDTooltip title="Congressional Districts" />} />
                        </div>
                    </FeatureFlag>
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
