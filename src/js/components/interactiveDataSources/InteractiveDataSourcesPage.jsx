import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQueryParams } from 'helpers/queryParams';
import { throttle } from 'lodash';
import { ComingSoon } from 'data-transparency-ui';
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
            subtitle: '',
            scroller: false,
            component: <IntroSection />
        },
        {
            name: 'history-section',
            display: 'History of the DATA Act',
            showSectionTitle: false,
            subtitle: '',
            scroller: false,
            component: <AboutSection />
        },
        {
            name: 'federal-spending-overview',
            display: 'Federal Spending Overview',
            showSectionTitle: false,
            subtitle: 'How do federal dollars move from Congress to the American people?',
            scroller: true,
            component: <FederalSpendingOverview />
        },
        {
            name: 'data-available',
            display: 'Data Available on USAspending.gov',
            showSectionTitle: false,
            subtitle: 'What kinds of data does USAspending.gov have?',
            scroller: true,
            component: <DataAvailable />
        },
        {
            name: 'data-types',
            display: 'Data Types',
            showSectionTitle: false,
            subtitle: 'How can I understand all the data types on USAspending.gov?',
            scroller: true,
            component: <DataTypes />
        },
        {
            name: 'data-source-systems',
            display: 'Source Systems',
            showSectionTitle: false,
            subtitle: 'What government data systems flow into USAspending.gov?',
            scroller: true,
            component: <DataSourceSystems />
        },
        {
            name: 'account-data',
            display: 'Account Data',
            showSectionTitle: false,
            subtitle: 'What are the sources for account data on USAspending.gov?',
            scroller: true,
            component: <AccountData />
        },
        {
            name: 'award-data',
            display: 'Award Data',
            showSectionTitle: false,
            subtitle: 'What are the sources for award data on USAspending.gov?',
            scroller: true,
            component: <AwardData />
        },
        {
            name: 'additional-data',
            display: 'Additional Data',
            showSectionTitle: false,
            subtitle: 'What are the sources for additional data on USAspending.gov?',
            scroller: true,
            component: <AdditionalData />
        },
        {
            name: 'data-submission-extraction',
            display: 'Data Submission and Extraction',
            showSectionTitle: false,
            subtitle: 'What data are submitted directly to USAspending.gov, and what data are extracted by USAspending.gov?',
            scroller: true,
            component: <DataSubmissionExtraction />
        },
        {
            name: 'frequency',
            display: 'Frequency of Data Updates',
            showSectionTitle: false,
            subtitle: 'How often are data updated on USAspending.gov?',
            scroller: true,
            component: <Frequency />
        },
        {
            name: 'data-validation',
            display: 'Data Validation',
            showSectionTitle: false,
            subtitle: ': How does the DATA Act Broker validate data before they are accessible to the public?',
            scroller: true,
            component: <DataValidation />
        },
        {
            name: 'data-access',
            display: 'Features on USAspending.gov',
            showSectionTitle: false,
            subtitle: 'Where can I find data on USAspending.gov from these sources?',
            scroller: true,
            component: <DataFeatures />
        },
        {
            name: 'data-use-cases',
            display: 'Use Cases',
            showSectionTitle: false,
            subtitle: 'What can I do with the data on USAspending.gov?',
            scroller: true,
            component: <DataUseCases />
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
            scrollToY(sectionDom.offsetTop + 86, 700);
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
    return (
        <PageWrapper
            pageName="Data Sources"
            classNames="usa-da-interactive-data-sources-page"
            overLine="resources"
            metaTagProps={interactiveDataSourcesPageMetaTags}
            title="Data Sources">
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
