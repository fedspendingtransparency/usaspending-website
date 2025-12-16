/**
 * StatePage.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";

import Error from 'components/sharedComponents/Error';
import { LoadingWrapper } from "components/sharedComponents/Loading";
import StateOverview from "features/state/overview/StateOverview";
import StateTimeVisualizationSectionContainer from
    "features/state/transactionsOverTime/StateTimeVisualizationSectionContainer";
import TopFiveSection from "components/state/topFive/TopFiveSection";
import StateFooter from "components/state/StateFooter";
import StatePageWrapper from "./StatePageWrapper";

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    stateProfile: PropTypes.object,
    handleFyChange: PropTypes.func
};

const StatePage = ({
    error,
    loading,
    stateProfile = { fy: '' },
    handleFyChange
}) => {
    let content = (
        <FlexGridRow className="state-content-wrapper">
            <FlexGridCol className="state-content">
                <StateOverview />
                <StateTimeVisualizationSectionContainer />
                <TopFiveSection />
                <StateFooter />
            </FlexGridCol>
        </FlexGridRow>
    );

    if (error) {
        content = (
            <Error
                title="Invalid State"
                message="The state ID provided is invalid. Please check the ID and try again." />
        );
    }

    return (
        <StatePageWrapper
            stateProfile={stateProfile}
            handleFyChange={handleFyChange}
            loading={loading}>
            <main id="main-content" className="main-content">
                <Helmet>
                    <link
                        href="https://api.mapbox.com/mapbox-gl-js/v2.11.1/mapbox-gl.css"
                        rel="stylesheet" />
                </Helmet>
                <LoadingWrapper isLoading={loading}>
                    {content}
                </LoadingWrapper>
            </main>
        </StatePageWrapper>
    );
};

export default StatePage;

StatePage.propTypes = propTypes;
