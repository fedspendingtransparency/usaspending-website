/**
 * StateLanding.jsx
 * Created by Kevin Li 5/23/18
 */

import React from 'react';
import { FlexGridCol, FlexGridRow, ShareIcon } from 'data-transparency-ui';
import { useDispatch } from 'react-redux';

import PageWrapper from 'components/sharedComponents/PageWrapper';
import { stateLandingPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';

import StateLandingContainer from 'containers/stateLanding/StateLandingContainer';
import { showModal } from '../../redux/actions/modal/modalActions';

require('pages/stateLanding/stateLandingPage.scss');

const slug = 'state';
const emailSubject = 'USAspending.gov State Profiles';

const StateLandingPage = () => {
    const dispatch = useDispatch();
    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    const handleShare = (name) => {
        handleShareOptionClick(name, slug, {
            subject: emailSubject,
            body: `View all of the State Profiles on USAspending.gov: ${getBaseUrl(slug)}`
        }, handleShareDispatch);
    };

    return (
        <PageWrapper
            pageName="State Profiles"
            classNames="usa-da-state-landing"
            title="State Profiles"
            metaTagProps={stateLandingPageMetaTags}
            toolBarComponents={[
                <ShareIcon
                    onShareOptionClick={handleShare}
                    url={getBaseUrl(slug)} />
            ]}>
            <main
                id="main-content"
                className="main-content">
                <FlexGridRow className="content__row landing-page">
                    <FlexGridCol className="content__col" width="fill">
                        <div className="landing-page__overview">
                            <h2
                                className="landing-page__title">
                                    Find a State Profile.
                            </h2>
                            <div className="landing-page__description">
                                    Find insights into the awards that fall within a particular U.S. state or territory with the tools and data breakdowns found in our State Profile pages.
                            </div>
                        </div>
                        <StateLandingContainer />
                    </FlexGridCol>
                </FlexGridRow>
            </main>
        </PageWrapper>
    );
};

export default StateLandingPage;
