/**
 * StatePage.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { find, throttle } from 'lodash';
import { ShareIcon, FiscalYearPicker } from 'data-transparency-ui';
import { statePageMetaTags } from 'helpers/metaTagHelper';
import { currentFiscalYear, earliestFiscalYear, getFiscalYearsWithLatestAndAll } from 'helpers/fiscalYearHelper';
import { Helmet } from 'react-helmet';
import Error from 'components/sharedComponents/Error';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import { LoadingWrapper } from "components/sharedComponents/Loading";
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { useHistory } from "react-router-dom";
import { useQueryParams, combineQueryParams, getQueryParamString } from 'helpers/queryParams';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import StateContent from './StateContent';

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    id: PropTypes.string,
    stateProfile: PropTypes.object,
    pickedFy: PropTypes.func
};

const StatePage = ({
    error,
    loading,
    id,
    stateProfile = { fy: '' },
    pickedFy
}) => {
    const history = useHistory();
    const query = useQueryParams();
    const [activeSection, setActiveSection] = useState(query.section || 'overview');
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);

    const slug = `state/${id}/${stateProfile.fy}`;
    const emailArgs = {
        subject: `USAspending.gov State Profile: ${stateProfile.overview.name}`,
        body: `View the spending activity for this state on USAspending.gov: ${getBaseUrl(slug)}`
    };

    const stateSections = [
        {
            section: 'overview',
            label: 'Overview'
        },
        {
            section: 'transactions-over-time',
            label: 'Transactions Over Time'
        },
        {
            section: 'top-five',
            label: 'Top 5'
        }
    ];
    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const sectionObj = find(stateSections, ['section', section]);
        if (!sectionObj) return;

        // find the section in dom
        const sectionDom = document.querySelector(`#state-${sectionObj.section}`);
        if (!sectionDom) return;

        // add section to url
        const newQueryParams = combineQueryParams(query, { section: `${section}` });
        history.replace({
            pathname: ``,
            search: getQueryParamString(newQueryParams)
        });

        // add offsets
        let conditionalOffset;
        if (isMobile) {
            conditionalOffset = window.scrollY < getStickyBreakPointForSidebar() ? stickyHeaderHeight + 140 : 60;
        }
        else {
            conditionalOffset = window.scrollY < getStickyBreakPointForSidebar() ? stickyHeaderHeight + 40 : 10;
        }
        const sectionTop = (sectionDom.offsetTop - stickyHeaderHeight - conditionalOffset);

        window.scrollTo({
            top: sectionTop - 25,
            left: 0,
            behavior: 'smooth'
        });
        setActiveSection(section);
    };

    useEffect(() => {
        if (!loading && query.section) {
            jumpToSection(query.section);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.section, loading]);

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
    }, [windowWidth]);

    let content = <StateContent id={id} stateProfile={stateProfile} />;
    if (error) {
        content = (
            <Error
                title="Invalid State"
                message="The state ID provided is invalid. Please check the ID and try again." />
        );
    }

    const handleShare = (name) => {
        handleShareOptionClick(name, slug, emailArgs);
    };

    const backgroundColor = {
        backgroundColor: "#1a4480"
    };

    return (
        <PageWrapper
            pageName="state"
            classNames="usa-da-state-page"
            overLine="state profile"
            title={stateProfile.overview.name}
            metaTagProps={stateProfile.overview ? statePageMetaTags(stateProfile.overview) : {}}
            toolBarComponents={[
                <FiscalYearPicker
                    backgroundColor={backgroundColor}
                    selectedFy={stateProfile?.fy}
                    handleFyChange={pickedFy}
                    options={getFiscalYearsWithLatestAndAll(earliestFiscalYear, currentFiscalYear())} />,
                <ShareIcon
                    onShareOptionClick={handleShare}
                    url={getBaseUrl(slug)} />
            ]}
            sections={stateSections}
            activeSection={activeSection}
            jumpToSection={jumpToSection}
            inPageNav>
            <main id="main-content" className="main-content">
                <Helmet>
                    <link href="https://api.mapbox.com/mapbox-gl-js/v2.11.1/mapbox-gl.css" rel="stylesheet" />
                </Helmet>
                <LoadingWrapper isLoading={loading}>
                    {content}
                </LoadingWrapper>
            </main>
        </PageWrapper>
    );
};

export default StatePage;

StatePage.propTypes = propTypes;
