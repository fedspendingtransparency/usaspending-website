/**
 * AgencyOverview.jsx
 * Created by Lizzie Salita 3/16/21
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ExternalLink from 'components/sharedComponents/ExternalLink';

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
            src={`graphics/agency/${logo}`}
            alt={name} />
    ) : '';

    const about = showAboutData ? (
        <div>
            <h4>About this Agency&apos;s Data</h4>
            <p>
                There is a 90-day delay on procurement (i.e., contract and IDV)
                data for the Department of Defense. Read more about this delay
                on our <Link to="/about">About the Data</Link> page.
            </p>
        </div>
    ) : '';

    return (
        <div className="agency-overview">
            {image}
            <h3>{name}</h3>
            <p>Includes {subtierCount} awarding sub-agencies</p>
            {about}
            <div>
                <h4>Agency Mission</h4>
                <p>{mission || '--'}</p>
            </div>
            <div>
                <h4>Website</h4>
                {website ? <ExternalLink url={website} /> : '--'}
            </div>
            <div>
                <h4>Congressional Justification of Budget (CJ)</h4>
                {congressionalJustification ? <ExternalLink url={congressionalJustification} /> : '--'}
            </div>
        </div>
    );
};

export default AgencyOverview;
