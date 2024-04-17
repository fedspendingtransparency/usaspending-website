/**
 * RouterRoutes.jsx
 * Created by Kevin Li 5/26/17
 **/

import React from 'react';

const HomepageUpdate = React.lazy(() => import('components/homepageUpdate/HomepageUpdate').then((comp) => comp));
const SearchContainer = React.lazy(() => import('containers/search/SearchContainer').then((comp) => comp));
const SearchContainerRedirect = React.lazy(() => import('containers/search/SearchContainer').then((module) => ({ default: module.SearchContainerRedirect })));
const ExplorerLanding = React.lazy(() => import('components/explorer/landing/ExplorerLanding').then((comp) => comp));
const ExplorerDetailPageContainer = React.lazy(() => import('containers/explorer/detail/ExplorerDetailPageContainer').then((comp) => comp));
const AwardContainer = React.lazy(() => import('containers/award/AwardContainer').then((comp) => comp));
const AccountContainer = React.lazy(() => import('containers/account/AccountContainer').then((comp) => comp));
const AboutPage = React.lazy(() => import('components/about/AboutPage').then((comp) => comp));
const AccessibilityPage = React.lazy(() => import('components/about/legal/AccessibilityPage').then((comp) => comp));
const PrivacyPage = React.lazy(() => import('components/about/legal/PrivacyPage').then((comp) => comp));
const FOIAPage = React.lazy(() => import('components/about/legal/FOIAPage').then((comp) => comp));
const DBInfo = React.lazy(() => import('components/about/DBInfo').then((comp) => comp));
const AgencyLandingPage = React.lazy(() => import('components/agencyLanding/AgencyLandingPage').then((comp) => comp));
const BulkDownloadPageContainer = React.lazy(() => import('containers/bulkDownload/BulkDownloadPageContainer').then((comp) => comp));
const KeywordContainer = React.lazy(() => import('containers/keyword/KeywordContainer').then((comp) => comp));
const AccountLandingPage = React.lazy(() => import('components/accountLanding/AccountLandingPage').then((comp) => comp));
const StateLandingPage = React.lazy(() => import('components/stateLanding/StateLandingPage').then((comp) => comp));
const StateContainer = React.lazy(() => import('containers/state/StateContainer').then((comp) => comp));
const RecipientLandingPage = React.lazy(() => import('components/recipientLanding/RecipientLandingPage').then((comp) => comp));
const RecipientContainer = React.lazy(() => import('containers/recipient/RecipientContainer').then((comp) => comp));
const AgencyProfile = React.lazy(() => import('containers/agency/AgencyContainer').then((comp) => comp));
const DataSourcesAndMethodologiesPage = React.lazy(() => import('components/covid19/DataSourcesAndMethodologiesPage').then((comp) => comp));
const OpportunityProjectPage = React.lazy(() => import('components/covid19/OpportunityProjectPage').then((comp) => comp));
const Covid19Container = React.lazy(() => import('containers/covid19/Covid19Container').then((comp) => comp));
const AboutTheDataPage = React.lazy(() => import('components/aboutTheData/AboutTheDataPage').then((comp) => comp));
const AgencyDetailsPage = React.lazy(() => import('components/aboutTheData/AgencyDetailsPage').then((comp) => comp));
const ErrorPage = React.lazy(() => import('components/errorPage/ErrorPage').then((comp) => comp));
const SubmissionStatisticsDataSources = React.lazy(() => import('components/aboutTheData/DataSourcesAndMethodologiesPage').then((comp) => comp));
const DataDictionaryPage = React.lazy(() => import('components/dataDictionary/DataDictionaryPage').then((comp) => comp));
const AnalystGuidePage = React.lazy(() => import('components/analystGuide/AnalystGuidePage').then((comp) => comp));
const EquityCovidSpendingPage = React.lazy(() => import('components/dataDives/EquityCovidSpendingPage').then((comp) => comp));
const InteractiveDataSourcesPage = React.lazy(() => import('components/interactiveDataSources/InteractiveDataSourcesPage').then((comp) => comp));
const TrainingVideosContainer = React.lazy(() => import('containers/trainingVideos/TrainingVideosContainer').then((comp) => comp));
const TempPage = React.lazy(() => import('components/tempPage').then((comp) => comp));
const TempNav = React.lazy(() => import('components/about/navTest/About').then((comp) => comp));

// /* eslint-disable import/prefer-default-export */
// Please add any new routes to the scripts/pages.js routes file.
// eslint-disable-next-line import/prefer-default-export
export const routes = [
    {
        path: `/`,
        component: HomepageUpdate,
        exact: true
    },
    {
        path: '/search',
        component: SearchContainer,
        exact: true
    },
    {
        path: '/search/:urlHash',
        component: SearchContainerRedirect,
        exact: true
    },
    {
        path: '/explorer',
        component: ExplorerLanding,
        exact: true
    },
    {
        path: '/explorer/:root',
        component: ExplorerDetailPageContainer,
        exact: true
    },
    {
        path: '/award/:awardId',
        component: AwardContainer,
        exact: true
    },
    {
        path: '/federal_account/:accountNumber',
        component: AccountContainer,
        exact: true
    },
    {
        path: '/about/accessibility',
        component: AccessibilityPage,
        exact: true
    },
    {
        path: '/about/privacy',
        component: PrivacyPage,
        exact: true
    },
    {
        path: '/about/foia',
        component: FOIAPage,
        exact: true
    },
    {
        path: '/about',
        component: AboutPage,
        exact: true
    },
    {
        path: '/db_info',
        component: DBInfo,
        exact: true
    },
    {
        path: '/agency',
        parent: '/agency',
        component: AgencyLandingPage,
        exact: true
    },
    {
        path: '/download_center/:type',
        component: BulkDownloadPageContainer,
        exact: true
    },
    {
        path: '/download_center',
        component: BulkDownloadPageContainer,
        exact: true
    },
    {
        path: '/keyword_search/:keyword',
        component: KeywordContainer,
        exact: true
    },
    {
        path: '/keyword_search',
        component: KeywordContainer,
        exact: true
    },
    {
        path: '/federal_account',
        component: AccountLandingPage,
        exact: true
    },
    {
    // could be state name or fips code
        path: '/state/:state/:fy',
        component: StateContainer,
        exact: true
    },
    {
    // could be state name or fips code
        path: '/state/:state',
        component: StateContainer,
        exact: true
    },
    {
        path: '/state',
        component: StateLandingPage,
        exact: true
    },
    {
        path: '/recipient/:recipientId/:fy',
        component: RecipientContainer,
        exact: true
    },
    {
        path: '/recipient/:recipientId',
        component: RecipientContainer,
        exact: true
    },
    {
        path: '/recipient',
        component: RecipientLandingPage,
        exact: true
    },
    {
        path: '/agency/:agencySlug',
        component: AgencyProfile,
        exact: true
    },
    {
        path: '/submission-statistics',
        component: AboutTheDataPage,
        exact: true
    },
    {
        path: '/submission-statistics/agency/:agencyCode',
        component: AgencyDetailsPage,
        exact: true
    },
    {
        path: '/submission-statistics/data-sources',
        component: SubmissionStatisticsDataSources,
        exact: true
    },
    {
        path: '/disaster/covid-19/data-sources',
        component: DataSourcesAndMethodologiesPage,
        exact: true
    },
    {
        path: '/disaster/covid-19/the-opportunity-project',
        component: OpportunityProjectPage,
        exact: true
    },
    {
        path: '/disaster/covid-19',
        component: Covid19Container,
        exact: true
    },
    {
        path: '/data-dictionary',
        component: DataDictionaryPage,
        exact: true
    },
    {
        path: '/data-sources',
        component: InteractiveDataSourcesPage,
        exact: true
    },
    {
        path: '/data-dives/equity-COVID-19-spending',
        component: EquityCovidSpendingPage,
        exact: true
    },
    {
        path: '/temp-page',
        component: TempPage,
        exact: true
    },
    {
        path: '/temp-nav',
        component: TempNav,
        exact: true
    },
    {
        path: '/training-videos',
        component: TrainingVideosContainer,
        exact: true
    },
    {
        path: '/federal-spending-guide',
        component: AnalystGuidePage
    },
    {
        path: '*',
        component: ErrorPage
    }
];

