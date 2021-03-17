/**
 * AgencyOverview.jsx
 * Created by Lizzie Salita 3/16/21
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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

    const about = showAboutData ? (
        <div className="agency-overview__data">
            <h4>About this Agency&apos;s Data</h4>
            <p>
                There is a 90-day delay on procurement (i.e., contract and IDV)
                data for the Department of Defense. Read more about this delay
                on our <Link to="/about">About the Data</Link> page.
            </p>
        </div>
    ) : missionBlock;

    return (
        <div className="agency-overview">
            <div className="agency-overview__top">
                <div className="agency-overview__title">
                    <h3>{name}</h3>
                    <div className="agency-overview__sub-agencies">Includes {subtierCount} awarding sub-agencies</div>
                </div>
                {image}
            </div>
            {about}
            <ReadMore>
                {showAboutData && missionBlock}
                <div className="agency-overview__data">
                    <h4>Website</h4>
                    {website ? <ExternalLink url={website} /> : '--'}
                </div>
                <div className="agency-overview__data">
                    <h4>Congressional Justification of Budget (CJ)</h4>
                    {congressionalJustification ? <ExternalLink url={congressionalJustification} /> : '--'}
                </div>
            </ReadMore>
        </div>
    );
};

export default AgencyOverview;
