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
        path: '/disaster/covid-19/data-sources',
        component: DataSourcesAndMethodologiesPage,
        exact: true
    },
    {
        path: '/disaster/covid-19',
        component: Covid19Container,
        exact: true
    }
];
/* eslint-enable import/prefer-default-export */

