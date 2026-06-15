/**
 * AgencyLandingPage.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React from 'react';
import { useDispatch } from 'react-redux';

import { agencyLandingPageMetaTags } from '../../helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from '../../helpers/socialShare';

import PageWrapper from '../../components/sharedComponents/PageWrapper';
import ShareIcon508 from '../../components/sharedComponents/buttons/ShareIcon508';

import AgencyLandingContainer from '../../containers/agencyLanding/AgencyLandingContainer';
import { showModal } from '../../redux/actions/modal/modalActions';

require('pages/agencyLanding/agencyLandingPage.scss');

const emailSubject = 'USAspending.gov Agency Profiles';

const AgencyLandingPage = () => {
    const dispatch = useDispatch();
    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    const handleShare = (name) => {
        handleShareOptionClick(name, 'agency', {
            subject: emailSubject,
            body: `View all of the Agency Profiles on USAspending.gov: ${getBaseUrl('agency')}`
        }, handleShareDispatch);
    };

    return (
        <PageWrapper
            pageName="Agency Profiles"
            classNames="usa-da-agency-landing"
            title="Agency Profiles"
            metaTagProps={agencyLandingPageMetaTags}
            toolBarComponents={[
                <ShareIcon508
                    onShareOptionClick={handleShare}
                    url={getBaseUrl('agency')} />
            ]}>
            <main
                id="main-content"
                className="main-content">
                <AgencyLandingContainer />
            </main>
        </PageWrapper>
    );
};
export default AgencyLandingPage;
