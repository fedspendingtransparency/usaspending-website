/**
 * AgencyOverview.jsx
 * Created by Lizzie Salita 3/16/21
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { throttle } from 'lodash';

import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import ExternalLink from 'components/sharedComponents/ExternalLink';
import ReadMore from 'components/sharedComponents/ReadMore';

export const AgencyOverview = () => {
    const {
        name,
        logo,
        website,
        mission,
        congressionalJustification,
        showAboutData,
        subtierCount
    } = useSelector((state) => state.agencyV2.overview);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = throttle(() => {
            setWindowWidth(window.innerWidth);
        });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const image = logo ? (
        <img
            className="agency-overview__image"
            src={`graphics/agency/${logo}`}
            alt={`${name} logo`} />
    ) : '';

    const missionBlock = (
        <div className="agency-overview__data">
            <h4>Agency Mission</h4>
            <p>{mission || '--'}</p>
        </div>
    );

    const aboutBlock = (
        <div className="agency-overview__data">
            <h4>About this Agency&apos;s Data</h4>
            <p>
                There is a 90-day delay on procurement (i.e., contract and IDV)
                data for the Department of Defense. Read more about this delay
                on our <Link to="/about">About the Data</Link> page.
            </p>
        </div>
    );

    const websiteBlock = (
        <div className="agency-overview__data">
            <h4>Website</h4>
            {website ? <ExternalLink url={website} /> : '--'}
        </div>
    );

    const cjBlock = (
        <div className="agency-overview__data">
            <h4>Congressional Justification of Budget (CJ)</h4>
            {congressionalJustification ? <ExternalLink url={congressionalJustification} /> : '--'}
        </div>
    );

    // Mobile layout
    let content = (
        <>
            {showAboutData ? aboutBlock : missionBlock}
            <ReadMore>
                {showAboutData && missionBlock}
                {websiteBlock}
                {cjBlock}
            </ReadMore>
        </>
    );

    // Desktop layout
    if (windowWidth >= mediumScreen) {
        content = (
            <div className="agency-overview__row">
                <div className="agency-overview__column">
                    {showAboutData && aboutBlock}
                    {missionBlock}
                </div>
                <div className="agency-overview__column">
                    {websiteBlock}
                </div>
                <div className="agency-overview__column">
                    {cjBlock}
                </div>
            </div>
        );
    }

    return (
        <div className="agency-overview">
            <div className="agency-overview__top">
                <div className="agency-overview__title">
                    <h3>{name}</h3>
                    <div className="agency-overview__sub-agencies">Includes {subtierCount} awarding sub-agencies</div>
                </div>
                {image}
            </div>
            {content}
        </div>
    );
};

export default AgencyOverview;
