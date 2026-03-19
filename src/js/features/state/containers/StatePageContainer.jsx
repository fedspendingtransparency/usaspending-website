/**
 * StatePageContainer.jsx
 * Created by Lizzie Salita 5/1/18
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";

import {
    setStateOverview,
    setStateFiscalYear,
    setStateCenter
} from 'redux/actions/state/stateActions';
import { stateCenterFromFips } from 'helpers/mapHelper';
import useFetchOverview from "./useFetchOverview";
import StatePage from '../StatePage';

require('pages/state/statePage.scss');

const propTypes = {
    handleFyChange: PropTypes.func,
    stateId: PropTypes.string,
    state: PropTypes.string,
    fy: PropTypes.string
};

const StatePageContainer = ({
    handleFyChange, stateId, state, fy
}) => {
    const stateProfile = useSelector((s) => s.stateProfile);
    const dispatch = useDispatch();

    const {
        stateProfileData, isSuccess, isLoading, error
    } = useFetchOverview(stateId, fy);

    useEffect(() => {
        if (isSuccess && stateProfileData && Object.keys(stateProfileData).length > 0) {
            dispatch(setStateOverview(stateProfileData));
        }
    }, [isSuccess, stateProfileData]);

    useEffect(() => {
        // Reset the FY
        dispatch(setStateFiscalYear(fy));

        // Update the map center
        const center = stateCenterFromFips(stateId);
        dispatch(setStateCenter(center));
    }, [state, stateProfile.fy, fy, dispatch, stateId]);

    return (
        <StatePage
            loading={isLoading}
            error={error}
            id={stateProfile.id}
            stateProfile={stateProfile}
            handleFyChange={handleFyChange} />
    );
};

StatePageContainer.propTypes = propTypes;
export default StatePageContainer;
