/**
 * StateOverview.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    SectionHeader, FlexGridRow, FlexGridCol
} from "data-transparency-ui";

import AwardBreakdownContainer from
    'containers/state/visualizations/awardBreakdown/AwardBreakdownContainer';
import GeoVisualizationSectionContainer from
    'containers/state/visualizations/geo/GeoVisualizationSectionContainer';
import SummaryStats from 'features/state/overview/SummaryStats';
import AwardBreakdownHeader from "./AwardBreakdownHeader";
import AwardBreakdownCard from "./AwardBreakdownCard";

const propTypes = {
    stateProfile: PropTypes.object
};

const StateOverview = ({ stateProfile }) => {
    const [hideFlag, setHideFlag] = useState(true);
    const [flag, setFlag] = useState('');
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        let flagPrep = null;
        let hideFlagPrep = 'hide';

        if (stateProfile.flag !== '') {
            hideFlagPrep = '';
            flagPrep = (
                <img src={stateProfile.flag} alt={stateProfile.name} />
            );
        }

        setFlag(flagPrep);
        setHideFlag(hideFlagPrep);
    }, [stateProfile.flag, stateProfile.name, stateProfile.id]);

    return (
        <div
            id="state-overview"
            className="state-section state-overview">
            <div className="state-overview__title-wrapper">
                <div className={`state-overview__flag ${hideFlag}`}>
                    {flag}
                </div>
                <h2 className="state-overview__title">{stateProfile.name}</h2>
            </div>
            <SectionHeader
                icon={<FontAwesomeIcon icon="map-marker-alt" size="2x" />}
                title="Overview"
                titleTooltip={{ component: false }}
                descTooltip={{ component: false }} />
            <hr className="results-divider" />
            <div className="state-overview__content">
                <div className="state-overview__note">
                    <strong>Note:</strong> All data on this page is based on Primary Place of Performance.
                </div>
                <SummaryStats stateProfile={stateProfile} />
                <AwardBreakdownHeader toggle={toggle} setToggle={setToggle} />
                <FlexGridRow>
                    <FlexGridCol width={8} desktop={8} tablet={12} mobile={12}>
                        <div className="state-section__viz award-breakdown" id="award">
                            <AwardBreakdownContainer toggleState={toggle} />
                        </div>
                    </FlexGridCol>
                    <AwardBreakdownCard stateProfile={stateProfile} />
                </FlexGridRow>
                <div className="state-section__viz geo">
                    <h3 className="state-overview__heading">
                        Primary Place of Performance
                    </h3>
                    <GeoVisualizationSectionContainer className="state-profile__map-toggle" />
                </div>
            </div>
        </div>
    );
};

StateOverview.propTypes = propTypes;
export default StateOverview;
