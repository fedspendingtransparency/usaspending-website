import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ComingSoon, FlexGridCol, FlexGridRow } from 'data-transparency-ui';

import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { interactiveDataSourcesPageMetaTags } from 'helpers/metaTagHelper';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import BannerPageHeader from "components/sharedComponents/header/BannerPageHeader";
import InPageNav from 'components/sharedComponents/InPageNav';
import { showModal } from 'redux/actions/modal/modalActions';
import InteractiveDataSourcesSection from './InteractiveDataSourcesSection';
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
import useJumpToSection from "../../hooks/useJumpToSection";

require('pages/interactiveDataSources/index.scss');

const InteractiveDataSourcesPage = () => {
    const dispatch = useDispatch();

    const handleShare = useCallback((name) => {
        handleShareOptionClick(
            name,
            `data-sources`,
            {
                subject: "USAspending Data Sources",
                body: "View a visualization of USAspending data sources on this interactive page: https://www.usaspending.gov/data-sources"
            },
            (url) => dispatch(showModal(url)));
    }, [dispatch]);

    const sections = useMemo(() => [
        {
            section: 'intro-section',
            label: 'Introduction',
            showSectionWrapper: false,
            scroller: false,
            component: <IntroSection url={getBaseUrl('data-sources')} onShareClick={handleShare} downloadLink="/data/data-sources-download.pdf" />
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
            component: <DataValidation title="Data Validation" subtitle="How does the Data Broker validate data before they are publicly available?" />
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
    ], [handleShare]);

    const jumpToSection = useJumpToSection("#interactive-data-sources-", sections, false, -300);

    return (
        <PageWrapper
            pageName="interactive-data-sources"
            classNames="usa-da-interactive-data-sources-page"
            metaTagProps={interactiveDataSourcesPageMetaTags}
            title="Data Sources"
            noHeader>
            <main id="main-content" className="main-content">
                <BannerPageHeader
                    kicker="RESOURCES"
                    title="USAspending Data Sources"
                    body="A journey through government spending data"
                    faIcon="database"
                    primaryColor="#005EA2"
                    secondaryColor="#0076D6" />
                <InPageNav
                    sections={sections}
                    activeSection="intro-section"
                    pageName="interactive-data-sources"
                    detectActiveSection
                    jumpToSection={jumpToSection} />
                <FlexGridRow className="interactive-data-sources__row">
                    <FlexGridCol width={12} className="interactive-data-sources__col">
                        {sections.map((section) => (
                            <InteractiveDataSourcesSection
                                key={section.section}
                                section={section}>
                                {section.component || <ComingSoon />}
                            </InteractiveDataSourcesSection>
                        ))}
                    </FlexGridCol>
                </FlexGridRow>
            </main>
        </PageWrapper>
    );
};
export default InteractiveDataSourcesPage;
