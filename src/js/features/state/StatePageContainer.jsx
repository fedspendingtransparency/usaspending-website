/**
 * StatePageContainer.jsx
 * Created by Lizzie Salita 5/1/18
 */

import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";

import BaseStateProfile from 'models/v2/state/BaseStateProfile';
import {
    setStateOverview,
    setStateFiscalYear,
    setStateCenter
} from 'redux/actions/state/stateActions';
import { stateCenterFromFips } from 'helpers/mapHelper';
import useOverview from "./hooks/useOverview";
import StatePage from './StatePage';

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

    const loadStateOverview = useCallback((data) => {
        if (Object.keys(data).length === 0) {
            return;
        }
        const newStateProfile = Object.create(BaseStateProfile);
        newStateProfile.populate(data);
        dispatch(setStateOverview(newStateProfile));
    }, [dispatch]);

    const {
        data, isSuccess, isLoading, error
    } = useOverview(stateId, fy);

    useEffect(() => {
        if (isSuccess && Object.keys(data?.data).length === 0) {
            loadStateOverview(data?.data);
        }
    }, [data]);

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
