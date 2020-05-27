/**
 * RouterRoutes.jsx
 * Created by Kevin Li 5/26/17
 **/

import Homepage from 'components/homepage/Homepage';
import SearchContainer from 'containers/search/SearchContainer';
import ExplorerLanding from 'components/explorer/landing/ExplorerLanding';
import { ExplorerDetailPageContainer } from 'containers/explorer/detail/ExplorerDetailPageContainer';
import { AwardContainer } from 'containers/award/AwardContainer';
import { AccountContainer } from 'containers/account/AccountContainer';
import { AgencyContainer } from 'containers/agency/AgencyContainer';
import About from 'components/about/About';
import AccessibilityPage from 'components/about/legal/AccessibilityPage';
import PrivacyPage from 'components/about/legal/PrivacyPage';
import FOIAPage from 'components/about/legal/FOIAPage';
import DBInfo from 'components/about/DBInfo';
import AgencyLandingPage from 'components/agencyLanding/AgencyLandingPage';
import { BulkDownloadPageContainer } from 'containers/bulkDownload/BulkDownloadPageContainer';
import { KeywordContainer } from 'containers/keyword/KeywordContainer';
import AccountLandingPage from 'components/accountLanding/AccountLandingPage';
import StateLandingPage from 'components/stateLanding/StateLandingPage';
import { StateContainer } from 'containers/state/StateContainer';
import RecipientLandingPage from 'components/recipientLanding/RecipientLandingPage';
import { RecipientContainer } from 'containers/recipient/RecipientContainer';
import AgencyProfileV2 from 'containers/agency/v2/AgencyContainerV2';

/* eslint-disable import/prefer-default-export */
export const routes = [
    {
        path: '/',
        addToSitemap: true,
        component: Homepage
    },
    {
        path: '/search',
        addToSitemap: true,
        component: SearchContainer
    },
    {
        path: '/search/:urlHash',
        addToSitemap: false,
        component: SearchContainer
    },
    {
        path: '/explorer',
        addToSitemap: true,
        component: ExplorerLanding
    },
    {
        path: '/explorer/:root',
        addToSitemap: false,
        component: ExplorerDetailPageContainer
    },
    {
        path: '/award/:awardId',
        addToSitemap: false,
        component: AwardContainer
    },
    {
        path: '/federal_account/:accountNumber',
        addToSitemap: false,
        component: AccountContainer
    },
    {
        path: '/agency/:agencyId',
        addToSitemap: false,
        component: AgencyContainer
    },
    {
        path: '/about/accessibility',
        addToSitemap: true,
        component: AccessibilityPage
    },
    {
        path: '/about/privacy',
        addToSitemap: true,
        component: PrivacyPage
    },
    {
        path: '/about/foia',
        addToSitemap: true,
        component: FOIAPage
    },
    {
        path: '/about',
        addToSitemap: true,
        component: About
    },
    {
        path: '/db_info',
        addToSitemap: true,
        component: DBInfo
    },
    {
        path: '/agency',
        parent: '/agency',
        addToSitemap: true,
        component: AgencyLandingPage
    },
    {
        path: '/download_center/:type',
        addToSitemap: false,
        component: BulkDownloadPageContainer
    },
    {
        path: '/download_center',
        addToSitemap: true,
        component: BulkDownloadPageContainer
    },
    {
        path: '/keyword_search/:keyword',
        addToSitemap: false,
        component: KeywordContainer
    },
    {
        path: '/keyword_search',
        addToSitemap: true,
        component: KeywordContainer
    },
    {
        path: '/federal_account',
        addToSitemap: true,
        component: AccountLandingPage
    },
    {
        path: '/state/:stateId/:fy',
        addToSitemap: false,
        component: StateContainer
    },
    {
        path: '/state/:stateId',
        addToSitemap: false,
        component: StateContainer
    },
    {
        path: '/state',
        addToSitemap: true,
        component: StateLandingPage
    },
    {
        path: '/recipient/:recipientId/:fy',
        addToSitemap: false,
        component: RecipientContainer
    },
    {
        path: '/recipient/:recipientId',
        addToSitemap: false,
        component: RecipientLandingPage
    },
    {
        path: '/recipient',
        addToSitemap: true,
        component: RecipientLandingPage
    },
    {
        path: '/agency_v2/:agencyId',
        addToSitemap: false,
        component: AgencyProfileV2
    }
];
/* eslint-enable import/prefer-default-export */
