/**
 * StateContainer.jsx
 * Created by Lizzie Salita 5/1/18
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { useNavigate, useMatch } from 'react-router';
import BaseStateProfile from 'models/v2/state/BaseStateProfile';
import * as StateHelper from 'helpers/stateHelper';
import * as stateActions from 'redux/actions/state/stateActions';
import { stateCenterFromFips } from 'helpers/mapHelper';

import StatePage from 'components/state/StatePage';
import { parseStateDataFromUrl } from '../../helpers/stateHelper';

require('pages/state/statePage.scss');

const propTypes = {
    stateProfile: PropTypes.object,
    setStateOverview: PropTypes.func,
    resetState: PropTypes.func,
    setStateFiscalYear: PropTypes.func,
    setStateCenter: PropTypes.func
};

const StateContainer = (props) => {
    let fullRequest = null;
    const navigate = useNavigate();
    const match = useMatch(`/state/:state/:fyParam?`);
    const { state, fyParam } = match.params;

    const fy = fyParam;

    const [statusState, setStatusState] = useState({
        loading: true,
        error: false
    });

    const onClickFy = (newFy) => {
        const [, stateName] = parseStateDataFromUrl(state);
        navigate(`/state/${stateName}/${newFy}`);
        props.setStateFiscalYear(newFy);
    };

    const setStateCenter = useCallback((id) => {
        const center = stateCenterFromFips(id);
        props.setStateCenter(center);
    });

    const parseOverview = (data) => {
        if (Object.keys(data).length === 0) {
            return;
        }
        const stateProfile = Object.create(BaseStateProfile);
        stateProfile.populate(data);
        props.setStateOverview(stateProfile);
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
        const [wasInputStateName, stateName, stateId] = parseStateDataFromUrl(state);

        if (!fy) {
            // this may be an issue on the first day of 2026 fiscal year
            // props.history(`/state/${stateName}/latest`, { replace: true });
            navigate(`/state/${stateName}/2025`, { replace: true });
        }
        else if (!wasInputStateName) {
            navigate(`/state/${stateName}/${fy}`, { replace: true });
        }
        else {
            props.setStateFiscalYear(fy);
            loadStateOverview(stateId, fy);
            setStateCenter(stateId);
        }

        return () => {
            props.resetState();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const [, , stateId] = parseStateDataFromUrl(state);
        // Reset the FY
        props.setStateFiscalYear(fy);
        loadStateOverview(stateId, fy);
        // Update the map center
        setStateCenter(stateId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    useEffect(() => {
        // we just redirected the user or to the new url which includes the fy selection
        props.setStateFiscalYear(fy);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fy]);

    useEffect(() => {
        const [, , stateId] = parseStateDataFromUrl(state);
        loadStateOverview(stateId, props.stateProfile.fy);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.stateProfile.fy]);

    return (
        <StatePage
            loading={statusState.loading}
            error={statusState.error}
            id={props.stateProfile.id}
            stateProfile={props.stateProfile}
            pickedFy={onClickFy} />
    );
};

StateContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        stateProfile: state.stateProfile
    }),
    (dispatch) => bindActionCreators(stateActions, dispatch)
)(StateContainer);
