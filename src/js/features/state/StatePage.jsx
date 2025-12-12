/**
 * StatePage.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Error from 'components/sharedComponents/Error';
import { LoadingWrapper } from "components/sharedComponents/Loading";
import StateContent from './StateContent';
import StatePageWrapper from "./StatePageWrapper";

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    id: PropTypes.string,
    stateProfile: PropTypes.object,
    handleFyChange: PropTypes.func
};

const StatePage = ({
    error,
    loading,
    id,
    stateProfile = { fy: '' },
    handleFyChange
}) => {
    let content = <StateContent id={id} stateProfile={stateProfile} />;

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
