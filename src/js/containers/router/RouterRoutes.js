/**
 * RouterRoutes.jsx
 * Created by Kevin Li 5/26/17
 **/

import Homepage from 'components/homepage/Homepage';
import SearchContainer from 'containers/search/SearchContainer';
import ExplorerLanding from 'components/explorer/landing/ExplorerLanding';
import ExplorerDetailPageContainer from 'containers/explorer/detail/ExplorerDetailPageContainer';
import AwardContainer from 'containers/award/AwardContainer';
import AccountContainer from 'containers/account/AccountContainer';
import AgencyContainer from 'containers/agency/AgencyContainer';
import About from 'components/about/About';
import AccessibilityPage from 'components/about/legal/AccessibilityPage';
import PrivacyPage from 'components/about/legal/PrivacyPage';
import FOIAPage from 'components/about/legal/FOIAPage';
import DBInfo from 'components/about/DBInfo';
import AgencyLandingPage from 'components/agencyLanding/AgencyLandingPage';
import BulkDownloadPageContainer from 'containers/bulkDownload/BulkDownloadPageContainer';
import KeywordContainer from 'containers/keyword/KeywordContainer';
import AccountLandingPage from 'components/accountLanding/AccountLandingPage';
import StateLandingPage from 'components/stateLanding/StateLandingPage';
import StateContainer from 'containers/state/StateContainer';
import RecipientLandingPage from 'components/recipientLanding/RecipientLandingPage';
import RecipientContainer from 'containers/recipient/RecipientContainer';
import AgencyProfileV2 from 'containers/agency/v2/AgencyContainerV2';
import Covid19Container from 'containers/covid19/Covid19Container';
import DataSourcesAndMethodologiesPage from 'components/covid19/DataSourcesAndMethodologiesPage';

// /* eslint-disable import/prefer-default-export */
// Please add any new routes to the scripts/pages.js routes file.
export const routes = [
    {
        path: '/',
        component: Homepage
    },
    {
        path: '/search',
        component: SearchContainer
    },
    {
        path: '/search/:urlHash',
        component: SearchContainer
    },
    {
        path: '/explorer',
        component: ExplorerLanding
    },
    {
        path: '/explorer/:root',
        component: ExplorerDetailPageContainer
    },
    {
        path: '/award/:awardId',
        component: AwardContainer
    },
    {
        path: '/federal_account/:accountNumber',
        component: AccountContainer
    },
    {
        path: '/agency/:agencyId',
        component: AgencyContainer
    },
    {
        path: '/about/accessibility',
        component: AccessibilityPage
    },
    {
        path: '/about/privacy',
        component: PrivacyPage
    },
    {
        path: '/about/foia',
        component: FOIAPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/db_info',
        component: DBInfo
    },
    {
        path: '/agency',
        parent: '/agency',
        component: AgencyLandingPage
    },
    {
        path: '/download_center/:type',
        component: BulkDownloadPageContainer
    },
    {
        path: '/download_center',
        component: BulkDownloadPageContainer
    },
    {
        path: '/keyword_search/:keyword',
        component: KeywordContainer
    },
    {
        path: '/keyword_search',
        component: KeywordContainer
    },
    {
        path: '/federal_account',
        component: AccountLandingPage
    },
    {
        path: '/state/:stateId/:fy',
        component: StateContainer
    },
    {
        path: '/state/:stateId',
        component: StateContainer
    },
    {
        path: '/state',
        component: StateLandingPage
    },
    {
        path: '/recipient/:recipientId/:fy',
        component: RecipientContainer
    },
    {
        path: '/recipient/:recipientId',
        component: RecipientContainer
    },
    {
        path: '/recipient',
        component: RecipientLandingPage
    },
    {
        path: '/agency_v2/:agencyId',
        component: AgencyProfileV2
    },
    {
        path: '/disaster/covid-19/data-sources',
        component: DataSourcesAndMethodologiesPage
    },
    {
        path: '/disaster/covid-19',
        component: Covid19Container
    }
];
/* eslint-enable import/prefer-default-export */

