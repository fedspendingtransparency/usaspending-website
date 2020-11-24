/**
 * RouterRoutes.jsx
 * Created by Kevin Li 5/26/17
 **/

import React from 'react';
import kGlobalConstants from 'GlobalConstants';


const Homepage = React.lazy(() => import('components/homepage/Homepage').then((comp) => comp));
const SearchContainer = React.lazy(() => import('containers/search/SearchContainer').then((comp) => comp));
const ExplorerLanding = React.lazy(() => import('components/explorer/landing/ExplorerLanding').then((comp) => comp));
const ExplorerDetailPageContainer = React.lazy(() => import('containers/explorer/detail/ExplorerDetailPageContainer').then((comp) => comp));
const AwardContainer = React.lazy(() => import('containers/award/AwardContainer').then((comp) => comp));
const AccountContainer = React.lazy(() => import('containers/account/AccountContainer').then((comp) => comp));
const AgencyContainer = React.lazy(() => import('containers/agency/AgencyContainer').then((comp) => comp));
const About = React.lazy(() => import('components/about/About').then((comp) => comp));
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
const AgencyProfileV2 = React.lazy(() => import('containers/agency/v2/AgencyContainerV2').then((comp) => comp));
const Covid19Container = React.lazy(() => import('containers/covid19/Covid19Container').then((comp) => comp));
const DataSourcesAndMethodologiesPage = React.lazy(() => import('components/covid19/DataSourcesAndMethodologiesPage').then((comp) => comp));
const AgenciesContainer = React.lazy(() => import('containers/aboutTheData/AgenciesContainer').then((comp) => comp));
const AgenciesDetailContainer = React.lazy(() => import('containers/aboutTheData/AgenciesDetailContainer').then((comp) => comp));
const ErrorPage = React.lazy(() => import('components/errorPage/ErrorPage').then((comp) => comp));

// /* eslint-disable import/prefer-default-export */
// Please add any new routes to the scripts/pages.js routes file.
export const routes = [
    {
        path: '/',
        component: Homepage,
        exact: true
    },
    {
        path: '/search',
        component: SearchContainer,
        exact: true
    },
    {
        path: '/search/:urlHash',
        component: SearchContainer,
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
        path: '/agency/:agencyId',
        component: AgencyContainer,
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
        component: About,
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
        path: '/state/:stateId/:fy',
        component: StateContainer,
        exact: true
    },
    {
        path: '/state/:stateId',
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
        path: '/agency_v2/:agencyId',
        component: AgencyProfileV2,
        exact: true
    },
    {
        path: '/about-the-data/agencies',
        component: AgenciesContainer,
        exact: true,
        hide: !kGlobalConstants.DEV
    },
    {
        path: '/about-the-data/agency/:agencyId',
        component: AgenciesDetailContainer,
        exact: true,
        hide: !kGlobalConstants.DEV && !kGlobalConstants.QAT // Not DEV and not QAT === Production, so we hide
    },
    {
        path: '/disaster/covid-19/data-sources',
        component: DataSourcesAndMethodologiesPage,
        exact: true
    },
    {
        path: '/disaster/covid-19',
        component: Covid19Container,
        exact: true
    },
    {
        path: '*',
        component: ErrorPage
    }
];
/* eslint-enable import/prefer-default-export */

