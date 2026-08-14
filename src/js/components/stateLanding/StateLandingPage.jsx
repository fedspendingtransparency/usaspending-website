/**
 * StateLanding.jsx
 * Created by Kevin Li 5/23/18
 */

import React from 'react';
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import { useDispatch } from 'react-redux';

import PageWrapper from 'components/sharedComponents/PageWrapper';
import ShareIcon508 from "components/sharedComponents/buttons/ShareIcon508";
import { stateLandingPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';

import StateLandingContainer from 'containers/stateLanding/StateLandingContainer';
import { showModal } from 'redux/actions/modal/modalActions';
import H2PageHeader from '../sharedComponents/header/H2PageHeader';

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

    // eslint-disable-next-line max-len
    const subtitle = "Find insights into the awards that fall within a particular U.S. state or territory with the tools and data breakdowns found in our State Profile pages.";

    return (
        <PageWrapper
            pageName="State Profiles"
            classNames="usa-da-state-landing"
            title="State Profiles"
            metaTagProps={stateLandingPageMetaTags}
            toolBarComponents={[
                <ShareIcon508
                    onShareOptionClick={handleShare}
                    url={getBaseUrl(slug)}
                    key={slug}/>
            ]}>
            <main
                id="main-content"
                className="main-content">
                <FlexGridRow className="content__row landing-page">
                    <FlexGridCol className="content__col" width="fill">
                        <H2PageHeader title="Find a State Profile." subtitle={subtitle} />
                        <StateLandingContainer />
                    </FlexGridCol>
                </FlexGridRow>
            </main>
        </PageWrapper>
    );
};

export default StateLandingPage;
