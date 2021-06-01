/**
 * AgencyOverview.jsx
 * Created by Lizzie Salita 3/16/21
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { throttle } from 'lodash';
import { LoadingMessage, TooltipWrapper, TooltipComponent } from 'data-transparency-ui';

import { DEFC_OBJECT } from 'propTypes';

import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import ExternalLink from 'components/sharedComponents/ExternalLink';
import ReadMore from 'components/sharedComponents/ReadMore';
import FySummary from './FySummary';

const replaceEmergencyPl = new RegExp(/(Emergency P.L.|Non-emergency P.L.)/);

const CovidTooltip = ({
    codes,
    fy
}) => {
    const getText = () => codes
        .map(({ code, public_law: pl, title }) => {
            const parsedPublicLaw = `${pl.includes('Non-emergency') ? 'Not designated as emergency' : 'Designated as emergency'}`;
            return (
                <li>
                    <strong>{`DEFC: ${code}`}</strong>
                    <p>{`${parsedPublicLaw}; ${pl.replace(replaceEmergencyPl, 'Public Law')}, ${title.toUpperCase()}`}</p>
                </li>
            );
        });
    return (
        <TooltipComponent title="Disaster and Emergency Funding Codes (DEFC)">
            <p>{`In FY ${fy}, this agency received supplemental funding in response to the following:`}</p>
            <ul>
                {getText()}
            </ul>
            <Link to={{
                pathname: "/disaster/covid-19/",
                search: "?section=award_spending_by_agency"
            }}>
                {`View this agency's DEFC spending.`}
            </Link>
        </TooltipComponent>
    );
};

CovidTooltip.propTypes = {
    fy: PropTypes.string,
    codes: PropTypes.arrayOf(DEFC_OBJECT)
};

const propTypes = {
    isLoading: PropTypes.bool,
    fy: PropTypes.string,
    agencyId: PropTypes.string
};

const AgencyOverview = ({
    isLoading,
    fy,
    agencyId
}) => {
    const {
        name,
        logo,
        website,
        mission,
        congressionalJustification,
        showAboutData,
        subtierCount,
        covidDefCodes
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
                There is a 90 day delay in displaying contract award data, subcontract data,
                and Account Breakdown by Award (File C) data for the Department of Defense (DOD).
                For more information, visit our <Link to="/about?section=data-quality">About Page</Link>.
                To see a complete list of this agency&apos;s submissions, visit our&nbsp;
                <Link to="/submission-statistics/agency/097">Submission Statistics page</Link>.
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

    const overview = isLoading ? <LoadingMessage /> : (
        <>
            <div className="agency-overview__top">
                <div className="agency-overview__title">
                    <h3>
                        {name}
                        {name && covidDefCodes.length > 0 &&
                            <TooltipWrapper className="agency-overview__tooltip covid-19-flag" tooltipComponent={<CovidTooltip fy={fy} codes={covidDefCodes} />}>
                                <span className="covid-spending-flag">
                                    COVID-19 Spending
                                </span>
                            </TooltipWrapper>
                        }
                    </h3>
                    <div className="agency-overview__sub-agencies">Includes {subtierCount} awarding sub-agencies</div>
                </div>
                {image}
            </div>
            {content}
        </>
    );

    return (
        <div className="agency-overview">
            {overview}
            <FySummary fy={fy} isMobile={windowWidth < mediumScreen} agencyId={agencyId} />
        </div>
    );
};

AgencyOverview.propTypes = propTypes;
export default AgencyOverview;
