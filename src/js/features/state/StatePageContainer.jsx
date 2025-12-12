/**
 * StatePageContainer.jsx
 * Created by Lizzie Salita 5/1/18
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isCancel } from 'axios';

import BaseStateProfile from 'models/v2/state/BaseStateProfile';
import {
    setStateOverview,
    setStateFiscalYear,
    setStateCenter
} from 'redux/actions/state/stateActions';
import { stateCenterFromFips } from 'helpers/mapHelper';
import StatePage from 'components/state/StatePage';
import { fetchStateOverview } from 'helpers/stateHelper';

require('pages/state/statePage.scss');


const StatePageContainer = ({
    onClickFy, stateId, state, fy
}) => {
    const stateProfile = useSelector((s) => s.stateProfile);
    const dispatch = useDispatch();
    const [statusState, setStatusState] = useState({
        loading: true,
        error: false
    });

    const request = useRef(null);

    const loadStateOverview = useCallback((id, year) => {
        if (request.current) {
            request.current.cancel();
        }

        request.current = fetchStateOverview(id, year);

        request.current.promise
            .then(({ data }) => {
                const noState = Object.keys(data).length === 0;

                setStatusState(Object.assign({}, {
                    loading: false,
                    error: noState
                }));

                if (Object.keys(data).length === 0) {
                    return;
                }
                const newStateProfile = Object.create(BaseStateProfile);
                newStateProfile.populate(data);
                dispatch(setStateOverview(newStateProfile));
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    setStatusState(Object.assign({}, {
                        loading: false,
                        error: true
                    }));
                }
            });
    }, [dispatch]);

    useEffect(() => {
        // Reset the FY
        dispatch(setStateFiscalYear(fy));
        loadStateOverview(stateId, fy);

        // Update the map center
        const center = stateCenterFromFips(stateId);
        dispatch(setStateCenter(center));
    }, [state, stateProfile.fy, fy, dispatch, loadStateOverview, stateId]);

    return (
        <StatePage
            loading={statusState.loading}
            error={statusState.error}
            id={stateProfile.id}
            stateProfile={stateProfile}
            pickedFy={onClickFy} />
    );
};

export default StatePageContainer;
