/**
 * AgencyPage.jsx
 * Created by Maxwell Kendall 01/31/2020
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    ComingSoon,
    ErrorMessage,
    ShareIcon
} from 'data-transparency-ui';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { throttle } from "lodash";
import { useQueryParams, combineQueryParams, getQueryParamString } from 'helpers/queryParams';

import { agencyPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';

import AgencySection from './AgencySection';
import AgencyOverview from './overview/AgencyOverview';
import AwardSpendingSubagency from './awardSpending/AwardSpendingSubagency';
import StatusOfFunds from './statusOfFunds/StatusOfFunds';
import PageWrapper from '../sharedComponents/PageWrapper';
import PageTitle from './overview/PageTitle';
import NumericPickerWrapper from '../sharedComponents/dropdowns/NumericPickerWrapper';

require('pages/agency/index.scss');

const propTypes = {
    selectedFy: PropTypes.string,
    latestFy: PropTypes.number,
    setSelectedFy: PropTypes.func,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
    agencySlug: PropTypes.string
};

export const AgencyProfileV2 = ({
    selectedFy,
    setSelectedFy,
    isError,
    errorMessage,
    isLoading,
    latestFy,
    agencySlug
}) => {
    const history = useHistory();
    const query = useQueryParams();

    const { pathname, search } = useLocation();
    const path = `${pathname.substring(1)}${search}`;

    const [activeSection, setActiveSection] = useState(query.section || 'overview');
    const { name } = useSelector((state) => state.agency.overview);
    const { isStatusOfFundsChartLoaded } = useSelector((state) => state.agency);

    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);

    const dataThroughDates = useSelector((state) => state.agency.dataThroughDates);
    const overviewDataThroughDate = dataThroughDates?.overviewDataThroughDate;
    const statusDataThroughDate = dataThroughDates?.statusDataThroughDate;
    const awardSpendingDataThroughDate = dataThroughDates?.awardSpendingDataThroughDate;

    const handleShare = (optionName) => {
        handleShareOptionClick(optionName, path, {
            subject: `USAspending.gov Agency Profile: ${name}`,
            body: `View the spending activity for this Agency on USAspending.gov: ${getBaseUrl(path)}`
        });
    };

    const sections = [
        {
            section: 'overview',
            label: 'Overview',
            icon: 'landmark',
            dataThroughDate: overviewDataThroughDate,
            component: <AgencyOverview fy={selectedFy} dataThroughDate={overviewDataThroughDate} />
        },
        {
            section: 'status-of-funds',
            label: 'Status of Funds',
            icon: 'money-check-alt',
            dataThroughDate: statusDataThroughDate,
            component: <StatusOfFunds fy={selectedFy} />
        },
        {
            section: 'award-spending',
            label: 'Award Spending',
            icon: 'hand-holding-usd',
            dataThroughDate: awardSpendingDataThroughDate,
            component: <AwardSpendingSubagency fy={`${selectedFy}`} />
        }
    ];

    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = sections.find((obj) => obj.section === section);
        if (!matchedSection) {
            // no matching section
            return;
        }

        // find the section in dom
        const sectionDom = document.querySelector(`#agency-v2-${matchedSection.section}`);
        if (!sectionDom) {
            return;
        }

        // add section to url
        if (!window.location.href.includes(`section=${section}`)) {
            const newQueryParams = combineQueryParams(query, { section: `${section}` });
            history.replace({
                pathname: ``,
                search: getQueryParamString(newQueryParams)
            });
        }

        // update the state
        setActiveSection(section);

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
    };

    useEffect(() => {
        if (isStatusOfFundsChartLoaded && query.section) {
            jumpToSection(query.section);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.section, isStatusOfFundsChartLoaded]);

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

    return (
        <PageWrapper
            pageName="agency-v2"
            classNames="usa-da-agency-page-v2"
            overLine="Agency Profile"
            title={name}
            metaTagProps={isLoading ? {} : agencyPageMetaTags({ id: agencySlug, name })}
            inPageNav
            sections={sections}
            jumpToSection={jumpToSection}
            activeSection={activeSection}
            toolBarComponents={[
                <NumericPickerWrapper size="sm" leftIcon="calendar-alt" enabled selectedValue={selectedFy} latestValue={latestFy} handleChange={(fy) => setSelectedFy({ fy })} />,
                <ShareIcon url={getBaseUrl(path)} onShareOptionClick={handleShare} />
            ]}>
            <main id="main-content" className="main-content usda__flex-row">
                <div className="body usda__flex-col">
                    <PageTitle />
                    {isError
                        ? <ErrorMessage description={errorMessage} />
                        : sections.map((section) => (
                            <AgencySection key={section.section} section={section} isLoading={isLoading} icon={section.icon} dataThroughDate={section.dataThroughDate}>
                                {section.component || <ComingSoon />}
                            </AgencySection>
                        ))}
                </div>
            </main>
        </PageWrapper>
    );
};

AgencyProfileV2.propTypes = propTypes;
export default AgencyProfileV2;
