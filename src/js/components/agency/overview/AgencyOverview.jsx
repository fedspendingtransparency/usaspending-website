/**
 * AgencyOverview.jsx
 * Created by Lizzie Salita 3/16/21
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { throttle } from 'lodash';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import ReadMore from 'components/sharedComponents/ReadMore';
import FySummary from './FySummary';

const propTypes = {
    fy: PropTypes.string,
    dataThroughDate: PropTypes.string
};

const AgencyOverview = ({ fy, dataThroughDate }) => {
    const {
        website,
        mission,
        congressionalJustification,
        showAboutData
    } = useSelector((state) => state.agency.overview);

    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
            {website ? <a href={website} target="_blank">{website}</a> : '--'}
        </div>
    );

    const cjBlock = (
        <div className="agency-overview__data">
            <h4>Congressional Justification of Budget (CJ)</h4>
            {congressionalJustification ?
                (
                    <a href={congressionalJustification} target="_blank">
                        {congressionalJustification}
                    </a>
                ) : '--'}
        </div>
    );

    const content = isMobile ?
        <>
            {showAboutData ? aboutBlock : missionBlock}
            <ReadMore>
                {showAboutData && missionBlock}
                {websiteBlock}
                {cjBlock}
            </ReadMore>
        </>
        :
        <>
            <FlexGridRow className="agency-overview__row">
                <FlexGridCol width={8}>
                    {showAboutData && aboutBlock}
                    {missionBlock}
                </FlexGridCol>
                <FlexGridCol width={4}>
                    {websiteBlock}
                    {cjBlock}
                </FlexGridCol>
            </FlexGridRow>
        </>;

    return (
        <div className="body__content agency-overview">
            {content}
            <FySummary fy={fy} dataThroughDate={dataThroughDate} windowWidth={windowWidth} isMobile={isMobile} />
        </div>
    );
};

AgencyOverview.propTypes = propTypes;
export default AgencyOverview;
