/**
 * StatePage.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ShareIcon, FiscalYearPicker } from 'data-transparency-ui';

import { statePageMetaTags } from 'helpers/metaTagHelper';
import { currentFiscalYear, earliestFiscalYear, getFiscalYearsWithLatestAndAll } from 'helpers/fiscalYearHelper';

import Error from 'components/sharedComponents/Error';
import PageWrapper from 'components/sharedComponents/Page';
import { LoadingWrapper } from "components/sharedComponents/Loading";
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';

import StateContent from './StateContent';

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    id: PropTypes.string,
    stateProfile: PropTypes.object,
    pickedFy: PropTypes.func
};

const StatePage = ({
    error,
    loading,
    id,
    stateProfile = { fy: '' },
    pickedFy
}) => {
    const slug = `state/${id}/${stateProfile.fy}`;
    const emailArgs = {
        subject: `USAspending.gov State Profile: ${stateProfile.overview.name}`,
        body: `View the spending activity for this state on USAspending.gov: ${getBaseUrl(slug)}`
    };

    let content = <StateContent id={id} stateProfile={stateProfile} />;
    if (error) {
        content = (
            <Error
                title="Invalid State"
                message="The state ID provided is invalid. Please check the ID and try again." />
        );
    }

    const handleShare = (name) => {
        handleShareOptionClick(name, slug, emailArgs);
    };

    return (
        <PageWrapper
            classNames="usa-da-state-page"
            overLine="state profile"
            title={stateProfile.overview.name}
            metaTagProps={stateProfile.overview ? statePageMetaTags(stateProfile.overview) : {}}
            toolBarComponents={[
                <FiscalYearPicker
                    selectedFy={stateProfile?.fy}
                    handleFyChange={pickedFy}
                    options={getFiscalYearsWithLatestAndAll(earliestFiscalYear, currentFiscalYear())} />,
                <ShareIcon
                    onShareOptionClick={handleShare}
                    url={getBaseUrl(slug)} />
            ]}>
            <main id="main-content" className="main-content">
                <LoadingWrapper isLoading={loading}>
                    {content}
                </LoadingWrapper>
            </main>
        </PageWrapper>
    );
};

export default StatePage;

StatePage.propTypes = propTypes;
