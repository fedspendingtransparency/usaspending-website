/**
 * AgencyPage.jsx
 * Created by Maxwell Kendall 01/31/2020
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    ComingSoon,
    ErrorMessage,
    FiscalYearPicker,
    ShareIcon,
    DownloadIconButton
} from 'data-transparency-ui';
import { useSelector } from 'react-redux';

import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';
import { agencyPageMetaTags } from 'helpers/metaTagHelper';
import { scrollToY } from 'helpers/scrollToHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';

import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import AccountSpending from 'components/agencyV2/accountSpending/AccountSpending';
import AgencySection from './AgencySection';
import AgencyOverview from './overview/AgencyOverview';
import PageWrapper from '../sharedComponents/Page';

require('pages/agencyV2/index.scss');

const scrollPositionOfSiteHeader = getStickyBreakPointForSidebar();

const propTypes = {
    agencyId: PropTypes.string,
    selectedFy: PropTypes.string,
    latestFy: PropTypes.number,
    setSelectedFy: PropTypes.func,
    isError: PropTypes.bool,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool
};

export const AgencyProfileV2 = ({
    selectedFy,
    agencyId,
    setSelectedFy,
    isError,
    // errorMessage,
    isLoading,
    latestFy
}) => {
    const [activeSection, setActiveSection] = useState('overview');
    const { name } = useSelector((state) => state.agencyV2.overview);

    const sections = [
        {
            name: 'overview',
            display: 'Overview',
            component: <AgencyOverview fy={selectedFy} isLoading={isLoading} />
        },
        {
            name: 'budget-category',
            display: 'Budget Category',
            overLine: 'Total Spending',
            component: <AccountSpending fy={`${selectedFy}`} agencyId={agencyId} />
        },
        {
            name: 'sub-agency',
            display: 'Sub-Agency',
            overLine: 'Award Spending'
        }
    ];

    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = sections.find((obj) => obj.name === section);
        if (!matchedSection) {
            // no matching section
            return;
        }

        // scroll to the correct section
        const sectionDom = document.querySelector(`#agency-v2-${matchedSection.name}`);

        if (!sectionDom) {
            return;
        }
        if (activeSection === 'overview') {
            scrollToY(sectionDom.offsetTop - 150, 700);
        }
        else {
            // scrollY set to the top of the section, subtracting the height of sticky elements + 20px of margin
            scrollToY(sectionDom.offsetTop - 86, 700);
        }

        setActiveSection(matchedSection.name);
    };

    const slug = `agency_v2/${agencyId}`;

    const handleShare = (optionName) => {
        handleShareOptionClick(optionName, slug, {
            subject: `USAspending.gov Agency Profile: ${name}`,
            body: `View the spending activity for this Agency on USAspending.gov: ${getBaseUrl(slug)}/?fy=${selectedFy}`
        });
    };

    return (
        <PageWrapper
            classNames="usa-da-agency-page-v2"
            overLine="Agency Profile"
            title={name}
            metaTagProps={agencyPageMetaTags}
            toolBarComponents={[
                <FiscalYearPicker selectedFy={selectedFy} latestFy={latestFy} handleFyChange={(fy) => setSelectedFy({ fy })} />,
                <ShareIcon url={getBaseUrl(slug)} onShareOptionClick={handleShare} />,
                <DownloadIconButton downloadInFlight={false} handleClick={() => {}} />
            ]}>
            <main id="main-content" className="main-content usda__flex-row">
                <div className="sidebar usda__flex-col">
                    <Sidebar
                        pageName="agency-v2"
                        fixedStickyBreakpoint={scrollPositionOfSiteHeader}
                        isGoingToBeSticky
                        active={activeSection}
                        jumpToSection={jumpToSection}
                        detectActiveSection={setActiveSection}
                        sections={sections.map((section) => ({
                            section: section.name,
                            label: section.display,
                            overLine: section.overLine
                        }))} />
                </div>
                <div className="body usda__flex-col">
                    {isError ? <ErrorMessage /> : sections.map((section) => (
                        <AgencySection key={section.name} section={section} isLoading={isLoading}>
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
