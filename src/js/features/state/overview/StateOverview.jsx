/**
 * StateOverview.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    SectionHeader, FlexGridRow
} from "data-transparency-ui";
import { useSelector } from "react-redux";

import AwardBreakdownContainer from
    'features/state/overview/awardBreakdown/AwardBreakdownContainer';
import GeoVisualizationSectionContainer from
    'containers/state/visualizations/geo/GeoVisualizationSectionContainer';
import SummaryStats from 'features/state/overview/SummaryStats';
import AwardBreakdownHeader from "./awardBreakdown/AwardBreakdownHeader";
import AwardBreakdownCard from "./awardBreakdown/card/AwardBreakdownCard";

const StateOverview = () => {
    const { overview, fy, id } = useSelector((state) => state.stateProfile);
    const [hideFlag, setHideFlag] = useState(true);
    const [flag, setFlag] = useState('');
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        let flagPrep = null;
        let hideFlagPrep = 'hide';

        if (overview.flag !== '') {
            hideFlagPrep = '';
            flagPrep = (
                <img src={overview.flag} alt={overview.name} />
            );
        }

        setFlag(flagPrep);
        setHideFlag(hideFlagPrep);
    }, [overview.flag, overview.name, overview.id]);

    return (
        <div
            id="state-overview"
            className="state-section state-overview">
            <div className="state-overview__title-wrapper">
                <div className={`state-overview__flag ${hideFlag}`}>
                    {flag}
                </div>
                <h2 className="state-overview__title">{overview.name}</h2>
            </div>
            <SectionHeader
                icon={<FontAwesomeIcon icon="map-marker-alt" size="2x" />}
                title="Overview"
                titleTooltip={{ component: false }}
                descTooltip={{ component: false }} />
            <hr className="results-divider" />
            <div className="state-overview__content">
                <div className="state-overview__note">
                    <strong>Note: </strong>
                    All data on this page is based on Primary Place of Performance.
                </div>
                <SummaryStats overview={overview} />
                <AwardBreakdownHeader toggle={toggle} setToggle={setToggle} />
                <FlexGridRow>
                    <AwardBreakdownContainer
                        fy={fy}
                        id={id}
                        toggleState={toggle} />
                    <AwardBreakdownCard overview={overview} />
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

export default StateOverview;
