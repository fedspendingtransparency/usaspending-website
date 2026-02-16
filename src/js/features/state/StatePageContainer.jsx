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
import useQueryTemp from "hooks/useQueryTemp";
import { stateCenterFromFips } from 'helpers/mapHelper';
import StatePage from './StatePage';
import { fetchStateOverview } from './stateHelper';

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

    const { fetchData, loading, error } = useQueryTemp(loadStateOverview);

    useEffect(() => {
        // Reset the FY
        dispatch(setStateFiscalYear(fy));
        fetchData(() => fetchStateOverview(stateId, fy));

        // Update the map center
        const center = stateCenterFromFips(stateId);
        dispatch(setStateCenter(center));
    }, [state, stateProfile.fy, fy, dispatch, stateId, fetchData]);

    return (
        <StatePage
            loading={loading}
            error={error}
            id={stateProfile.id}
            stateProfile={stateProfile}
            handleFyChange={handleFyChange} />
    );
};

StatePageContainer.propTypes = propTypes;
export default StatePageContainer;
