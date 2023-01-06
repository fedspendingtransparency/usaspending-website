import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQueryParams } from 'helpers/queryParams';
import { throttle } from 'lodash';
import { ComingSoon, ShareIcon } from 'data-transparency-ui';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { scrollToY } from 'helpers/scrollToHelper';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import InteractiveDataSourcesSection from './InteractiveDataSourcesSection';
import { interactiveDataSourcesPageMetaTags } from '../../helpers/metaTagHelper';
import Sidebar from '../sharedComponents/sidebar/Sidebar';
import AboutSection from './sections/AboutSection';
import IntroSection from './sections/IntroSection';
import FederalSpendingOverview from './scrollerSections/FederalSpendingOverview';
import DataTypes from './scrollerSections/DataTypes';
import DataSubmissionExtraction from './scrollerSections/DataSubmissionExtraction';
import Frequency from './scrollerSections/Frequency';
import DataValidation from './scrollerSections/DataValidation';
import DataFeatures from './scrollerSections/DataFeatures';
import DataUseCases from './scrollerSections/DataUseCases';
import DataAvailable from './scrollerSections/DataAvailable';
import DataSourceSystems from './scrollerSections/DataSourceSystems';
import AccountData from './scrollerSections/AccountData';
import AwardData from './scrollerSections/AwardData';
import AdditionalData from './scrollerSections/AdditionalData';

require('pages/interactiveDataSources/index.scss');

const scrollPositionOfSiteHeader = getStickyBreakPointForSidebar();
const InteractiveDataSourcesPage = () => {
    const [activeSection, setActiveSection] = useState('intro-section');
    const query = useQueryParams();
    const history = useHistory();
    const sections = [
        {
            name: 'intro-section',
            display: 'Introduction',
            showSectionTitle: false,
            scroller: false,
            component: <IntroSection />
        },
        {
            name: 'history-section',
            display: 'History of the DATA Act',
            showSectionTitle: false,
            scroller: false,
            component: <AboutSection />
        },
        {
            name: 'federal-spending-overview',
            display: 'Federal Spending Overview',
            showSectionTitle: false,
            scroller: true,
            component: <FederalSpendingOverview title="Federal Spending Overview" subtitle="How do federal dollars move from Congress to the American people?" />
        },
        {
            name: 'data-available',
            display: 'Data Available on USAspending.gov',
            showSectionTitle: false,
            scroller: true,
            component: <DataAvailable title="Data Available on USAspending.gov" subtitle="What kinds of data does USAspending.gov have?" />
        },
        {
            name: 'data-types',
            display: 'Data Types',
            showSectionTitle: false,
            scroller: true,
            component: <DataTypes title="Data Types" subtitle="How can I understand all the data types on USAspending.gov?" />
        },
        {
            name: 'data-source-systems',
            display: 'Source Systems',
            showSectionTitle: false,
            scroller: true,
            component: <DataSourceSystems title="Source Systems" subtitle="What government data systems flow into USAspending.gov?" />
        },
        {
            name: 'account-data',
            display: 'Account Data',
            showSectionTitle: false,
            scroller: true,
            component: <AccountData title="Account Data" subtitle="What are the sources for account data on USAspending.gov?" />
        },
        {
            name: 'award-data',
            display: 'Award Data',
            showSectionTitle: false,
            scroller: true,
            component: <AwardData title="Award Data" subtitle="What are the sources for award data on USAspending.gov?" />
        },
        {
            name: 'additional-data',
            display: 'Additional Data',
            showSectionTitle: false,
            scroller: true,
            component: <AdditionalData title="Additional Data" subtitle="What are the sources for additional data on USAspending.gov?" />
        },
        {
            name: 'data-submission-extraction',
            display: 'Data Submission and Extraction',
            showSectionTitle: false,
            scroller: true,
            component: <DataSubmissionExtraction title="Data Submission and Extraction" subtitle="What data are submitted to, versus extracted by, USAspending.gov?" />
        },
        {
            name: 'frequency',
            display: 'Frequency of Data Updates',
            showSectionTitle: false,
            scroller: true,
            component: <Frequency title="Frequency of Data Updates" subtitle="How often are data updated on USAspending.gov?" />
        },
        {
            name: 'data-validation',
            display: 'Data Validation',
            showSectionTitle: false,
            scroller: true,
            component: <DataValidation title="Data Validation" subtitle="How does the DATA Act Broker validate data before they are publicly available?" />
        },
        {
            name: 'data-access',
            display: 'Features on USAspending.gov',
            showSectionTitle: false,
            scroller: true,
            component: <DataFeatures title="Features on USAspending.gov" subtitle="Where can I find data on USAspending.gov from these sources?" />
        },
        {
            name: 'data-use-cases',
            display: 'Use Cases',
            showSectionTitle: false,
            scroller: true,
            component: <DataUseCases title="Use Cases" subtitle="What can I do with the data on USAspending.gov?" />
        }
    ];
    const jumpToSection = (section = '') => {
        // check if valid section
        const matchedSection = sections.find((obj) => obj.name === section);
        if (!matchedSection) return; // no matching section
        // scroll to correct section
        const sectionDom = document.querySelector(`#interactive-data-sources-${matchedSection.name}`);
        if (!sectionDom) return;
        if (activeSection === 'intro-section') {
            scrollToY(sectionDom.offsetTop - 150, 700);
        }
        else if (matchedSection.scroller) {
            // for scroller sections, add height
            scrollToY(sectionDom.offsetTop + 18, 700);
        }
        else {
            // scrollY set to the top of the section, subtracting the height of sticky elements + 20px of margin
            scrollToY(sectionDom.offsetTop - 86, 700);
        }
        setActiveSection(matchedSection.name);
    };
    useEffect(throttle(() => {
        // prevents a console error about react unmounted component leak
        let isMounted = true;
        if (isMounted) {
            const urlSection = query.section;
            if (urlSection) {
                // TODO: revisit settimeout
                setTimeout(() => {
                    jumpToSection(urlSection);
                    // remove the query param from the url after scrolling to the given section
                    history.replace(`/data-sources`);
                }, 1000);
            }
        }
        return () => {
            isMounted = false;
        };
    }, 100), [history, query.section]);


    const emailData = {
        subject: "USAspending Data Sources",
        body: "View a visualization of USAspending data sources on this interactive page: https://www.usaspending.gov/data-sources"
    };
    const handleShare = (name) => {
        handleShareOptionClick(name, `data-sources`, emailData);
    };
    return (
        <PageWrapper
            pageName="Data Sources"
            classNames="usa-da-interactive-data-sources-page"
            overLine="resources"
            metaTagProps={interactiveDataSourcesPageMetaTags}
            title="Data Sources"
            toolBarComponents={[
                <ShareIcon url={getBaseUrl('data-sources')} onShareOptionClick={handleShare} />
            ]}>
            <main id="main-content" className="main-content usda__flex-row">
                <div className="sidebar usda__flex-col">
                    <div className="sidebar_content">
                        <Sidebar
                            pageName="interactive-data-sources"
                            fixedStickyBreakpoint={scrollPositionOfSiteHeader}
                            isGoingToBeSticky
                            active={activeSection}
                            jumpToSection={jumpToSection}
                            detectActiveSection={setActiveSection}
                            sections={sections.map((section) => ({
                                section: section.name,
                                label: section.display
                            }))} />
                    </div>
                </div>
                <div className="body usda__flex-col">
                    {sections.map((section) => (
                        <InteractiveDataSourcesSection
                            key={section.name}
                            section={section}>
                            {section.component || <ComingSoon />}
                        </InteractiveDataSourcesSection>
                    ))}
                </div>
            </main>
        </PageWrapper>
    );
};
export default InteractiveDataSourcesPage;
