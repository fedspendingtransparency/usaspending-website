/**
 * StateContainer.jsx
 * Created by Lizzie Salita 5/1/18
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isCancel } from 'axios';
import { useNavigate, useMatch } from 'react-router';

import BaseStateProfile from 'models/v2/state/BaseStateProfile';
import * as StateHelper from 'helpers/stateHelper';
import {
    setStateOverview,
    resetState,
    setStateFiscalYear,
    setStateCenter
} from 'redux/actions/state/stateActions';
import { stateCenterFromFips } from 'helpers/mapHelper';
import StatePage from 'components/state/StatePage';
import { parseStateDataFromUrl } from 'helpers/stateHelper';

require('pages/state/statePage.scss');


const Navigate = ({
    onClickFy, stateId, state, fy
}) => {
    const stateProfile = useSelector((s) => s.stateProfile);
    const dispatch = useDispatch();
    const [statusState, setStatusState] = useState({
        loading: true,
        error: false
    });

    let fullRequest = null;

    const setCenter = useCallback((id) => {
        const center = stateCenterFromFips(id);
        dispatch(setStateCenter(center));
    }, [dispatch]);

    const parseOverview = (data) => {
        if (Object.keys(data).length === 0) {
            return;
        }
        const newStateProfile = Object.create(BaseStateProfile);
        newStateProfile.populate(data);
        dispatch(setStateOverview(newStateProfile));
    };

    const loadStateOverview = useCallback((id, year) => {
        if (fullRequest) {
            fullRequest.cancel();
        }

        fullRequest = StateHelper.fetchStateOverview(id, year);

        fullRequest.promise
            .then((res) => {
                const noState = Object.keys(res.data).length === 0;

                setStatusState(Object.assign({}, {
                    loading: false,
                    error: noState
                }));

                parseOverview(res.data);
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
    });

    useEffect(() => {
        // Reset the FY
        dispatch(setStateFiscalYear(fy));
        loadStateOverview(stateId, fy);
        // Update the map center
        setCenter(stateId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, stateProfile.fy, fy]);

    return (
        <StatePage
            loading={statusState.loading}
            error={statusState.error}
            id={stateProfile.id}
            stateProfile={stateProfile}
            pickedFy={onClickFy} />
    );
};

const StateContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const match = useMatch(`/state/:state/:fyParam?`);
    const { state, fyParam } = match.params;

    const [wasInputStateName, stateName, stateId] = parseStateDataFromUrl(state);
    const fy = fyParam;

    const onClickFy = (newFy) => {
        navigate(`/state/${stateName}/${newFy}`);
        dispatch(setStateFiscalYear(newFy));
    };

    useEffect(() => {
        if (!fy) {
            // this may be an issue on the first day of 2026 fiscal year
            // history(`/state/${stateName}/latest`, { replace: true });
            navigate(`/state/${stateName}/2026`, { replace: true });
        }
        else if (!wasInputStateName) {
            navigate(`/state/${stateName}/${fy}`, { replace: true });
        }
        else {
            dispatch(setStateFiscalYear(fy));
        }

        return () => {
            dispatch(resetState());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Navigate
            onClickFy={onClickFy}
            stateId={stateId}
            state={state}
            fy={fy} />
    );
};

export default StateContainer;
