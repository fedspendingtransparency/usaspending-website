/**
 * AccountLandingPage.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import { ShareIcon } from 'data-transparency-ui';
import { useDispatch } from 'react-redux';

import { accountLandingPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';

import PageWrapper from 'components/sharedComponents/PageWrapper';
import AccountLandingContainer from 'containers/accountLanding/AccountLandingContainer';
import { showModal } from '../../redux/actions/modal/modalActions';

const slug = 'federal_account';
const emailSubject = 'USAspending.gov Federal Account Profiles';


const AccountLandingPage = () => {
    const dispatch = useDispatch();
    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    const handleShare = (name) => {
        handleShareOptionClick(name, slug, {
            subject: emailSubject,
            body: `View all of the Federal Account Profiles on USAspending.gov: ${getBaseUrl(slug)}`
        }, handleShareDispatch);
    };
    return (
        <PageWrapper
            pageName="Federal Account Profiles"
            classNames="usa-da-account-landing"
            title="Federal Account Profiles"
            metaTagProps={accountLandingPageMetaTags}
            toolBarComponents={[
                <ShareIcon
                    onShareOptionClick={handleShare}
                    url={getBaseUrl(slug)} />
            ]}>
            <main
                id="main-content"
                className="main-content">
                <AccountLandingContainer />
            </main>
        </PageWrapper>
    );
};

export default AccountLandingPage;
