/**
 * RecipientLandingPage.jsx
 * Created by David Trinh 7/2/18
 */

import React from 'react';
import { ShareIcon } from 'data-transparency-ui';
import { useDispatch } from 'react-redux';

import { recipientLandingPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';

import RecipientLandingContainer from 'containers/recipientLanding/RecipientLandingContainer';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import { showModal } from '../../redux/actions/modal/modalActions';

require('pages/recipientLanding/recipientLandingPage.scss');

const slug = 'recipient';
const emailSubject = 'USAspending.gov Recipient Profiles';

const RecipientLandingPage = () => {
    const dispatch = useDispatch();
    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    const handleShare = (name) => {
        handleShareOptionClick(name, slug, {
            subject: emailSubject,
            body: `View all of the Recipient Profiles on USAspending.gov: ${getBaseUrl(slug)}`
        }, handleShareDispatch);
    };

    return (
        <PageWrapper
            pageName="Recipient Profiles"
            classNames="usa-da-recipient-landing"
            title="Recipient Profiles"
            metaTagProps={recipientLandingPageMetaTags}
            toolBarComponents={[
                <ShareIcon
                    onShareOptionClick={handleShare}
                    url={getBaseUrl(slug)}
                    key="page-wrapper__share-icon" />
            ]}>
            <main id="main-content" className="main-content">
                <RecipientLandingContainer />
            </main>
        </PageWrapper>
    );
};
export default RecipientLandingPage;

