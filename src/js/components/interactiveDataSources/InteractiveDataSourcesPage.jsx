import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { useQueryParams, combineQueryParams, getQueryParamString } from 'helpers/queryParams';
import { find, throttle } from 'lodash';
import { ComingSoon, ShareIcon } from 'data-transparency-ui';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import InteractiveDataSourcesSection from './InteractiveDataSourcesSection';
import { interactiveDataSourcesPageMetaTags } from '../../helpers/metaTagHelper';
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
import DownloadStaticFile from "../sharedComponents/DownloadStaticFile";

require('pages/interactiveDataSources/index.scss');

const InteractiveDataSourcesPage = () => {
    const [activeSection, setActiveSection] = useState('intro-section');
    const query = useQueryParams();
    const history = useHistory();
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);

    const sections = [
        {
            section: 'intro-section',
            label: 'Introduction',
            showSectionWrapper: false,
            scroller: false,
            component: <IntroSection />
        },
        {
            section: 'history-section',
            label: 'History of the DATA Act',
            showSectionWrapper: false,
            scroller: false,
            component: <AboutSection />
        },
        {
            section: 'federal-spending-overview',
            label: 'Federal Spending Overview',
            showSectionWrapper: false,
            scroller: true,
            component: <FederalSpendingOverview title="Federal Spending Overview" subtitle="How do federal dollars move from Congress to the American people?" />
        },
        {
            section: 'data-available',
            label: 'Data Available on USAspending.gov',
            showSectionWrapper: false,
            scroller: true,
            component: <DataAvailable title="Data Available on USAspending.gov" subtitle="What kinds of data does USAspending.gov have?" />
        },
        {
            section: 'data-types',
            label: 'Data Types',
            showSectionWrapper: false,
            scroller: true,
            component: <DataTypes title="Data Types" subtitle="How can I understand all the data types on USAspending.gov?" />
        },
        {
            section: 'data-source-systems',
            label: 'Source Systems',
            showSectionWrapper: false,
            scroller: true,
            component: <DataSourceSystems title="Source Systems" subtitle="What government data systems flow into USAspending.gov?" />
        },
        {
            section: 'account-data',
            label: 'Account Data',
            showSectionWrapper: false,
            scroller: true,
            component: <AccountData title="Account Data" subtitle="What are the sources for account data on USAspending.gov?" />
        },
        {
            section: 'award-data',
            label: 'Award Data',
            showSectionWrapper: false,
            scroller: true,
            component: <AwardData title="Award Data" subtitle="What are the sources for award data on USAspending.gov?" />
        },
        {
            section: 'additional-data',
            label: 'Additional Data',
            showSectionWrapper: false,
            scroller: true,
            component: <AdditionalData title="Additional Data" subtitle="What are the sources for additional data on USAspending.gov?" />
        },
        {
            section: 'data-submission-extraction',
            label: 'Data Submission and Extraction',
            showSectionWrapper: false,
            scroller: true,
            component: <DataSubmissionExtraction title="Data Submission and Extraction" subtitle="What data are submitted to, versus extracted by, USAspending.gov?" />
        },
        {
            section: 'frequency',
            label: 'Frequency of Data Updates',
            showSectionWrapper: false,
            scroller: true,
            component: <Frequency title="Frequency of Data Updates" subtitle="How often are data updated on USAspending.gov?" />
        },
        {
            section: 'data-validation',
            label: 'Data Validation',
            showSectionWrapper: false,
            scroller: true,
            component: <DataValidation title="Data Validation" subtitle="How does the DATA Act Broker validate data before they are publicly available?" />
        },
        {
            section: 'data-access',
            label: 'Features on USAspending.gov',
            showSectionWrapper: false,
            scroller: true,
            component: <DataFeatures title="Features on USAspending.gov" subtitle="Where can I find data on USAspending.gov from these sources?" />
        },
        {
            section: 'data-use-cases',
            label: 'Use Cases',
            showSectionWrapper: false,
            scroller: true,
            component: <DataUseCases title="Use Cases" subtitle="What can I do with the data on USAspending.gov?" />
        }
    ];

    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const sectionObj = find(sections, ['section', section]);
        if (!sectionObj) return;

        // find the section in dom
        const sectionDom = document.querySelector(`#interactive-data-sources-${sectionObj.section}`);
        if (!sectionDom) return;

        // add section to url
        const newQueryParams = combineQueryParams(query, { section: `${section}` });
        history.replace({
            pathname: ``,
            search: getQueryParamString(newQueryParams)
        });
        setActiveSection(section);
        // add offsets
        const conditionalOffset = window.scrollY < getStickyBreakPointForSidebar() ? stickyHeaderHeight + 40 : 10;
        const sectionTop = (sectionDom.offsetTop - stickyHeaderHeight - conditionalOffset);

        window.scrollTo({
            top: sectionTop - 25,
            left: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (query.section) {
            jumpToSection(query.section);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.section]);

    useEffect(throttle(() => {
        // prevents a console error about react unmounted component leak
        let isMounted = true;
        if (isMounted) {
            const urlSection = query.section;
            if (urlSection) {
                setActiveSection(urlSection);
                jumpToSection(urlSection);
            }
        }
        return () => {
            isMounted = false;
        };
    }, 100), [history, query.section]);

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


    const emailData = {
        subject: "USAspending Data Sources",
        body: "View a visualization of USAspending data sources on this interactive page: https://www.usaspending.gov/data-sources"
    };

    const handleShare = (name) => {
        handleShareOptionClick(name, `data-sources`, emailData);
    };

    return (
        <PageWrapper
            pageName="interactive-data-sources"
            classNames="usa-da-interactive-data-sources-page"
            overLine="resources"
            metaTagProps={interactiveDataSourcesPageMetaTags}
            title="Data Sources"
            toolBarComponents={[
                <ShareIcon
                    url={getBaseUrl('data-sources')}
                    onShareOptionClick={handleShare}
                    classNames={!isMobile ? "margin-right" : ""} />,
                <DownloadStaticFile
                    path="/data/data-sources-download.pdf" />
            ]}
            sections={sections}
            activeSection={activeSection}
            jumpToSection={jumpToSection}
            inPageNav>
            <main id="main-content" className="main-content usda__flex-row">
                <div className="body usda__flex-col">
                    {sections.map((section) => (
                        <InteractiveDataSourcesSection
                            key={section.section}
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
