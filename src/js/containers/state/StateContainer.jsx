/**
 * StateContainer.jsx
 * Created by Lizzie Salita 5/1/18
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
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
    setStateCenter: PropTypes.func,
    match: PropTypes.object,
    history: PropTypes.object
};

const StateContainer = (props) => {
    let fullRequest = null;
    const [statusState, setStatusState] = useState({
        loading: true,
        error: false
    });

    const onClickFy = (fy) => {
        const [, stateName] = parseStateDataFromUrl(props.match.params.state);
        props.history.push(`/state/${stateName}/${fy}`);
        props.setStateFiscalYear(fy);
    };

    const setStateCenter = (id) => {
        const center = stateCenterFromFips(id);
        props.setStateCenter(center);
    };

    const parseOverview = (data) => {
        if (Object.keys(data).length === 0) {
            return;
        }
        const stateProfile = Object.create(BaseStateProfile);
        stateProfile.populate(data);
        props.setStateOverview(stateProfile);
    };

    const loadStateOverview = (id, year) => {
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
    };

    useEffect(() => {
        const { fy, state } = props.match.params;
        const [wasInputStateName, stateName, stateId] = parseStateDataFromUrl(state);

        if (!Object.keys(props.match.params).includes('fy')) {
            // props.history.replace(`/state/${stateName}/latest`);
            props.history.replace(`/state/${stateName}/2025`);
        }
        else if (!wasInputStateName) {
            props.history.replace(`/state/${stateName}/${fy}`);
        }
        else {
            props.setStateFiscalYear(fy);
            loadStateOverview(stateId, fy);
            setStateCenter(stateId);
        }

        return () => {
            props.resetState();
        };
    }, []);

    useEffect(() => {
        const [, , stateId] = parseStateDataFromUrl(props?.match?.params?.state);
        // Reset the FY
        props.setStateFiscalYear(props.match.params.fy);
        loadStateOverview(stateId, props.match.params.fy);
        // Update the map center
        setStateCenter(stateId);
    }, [props?.match?.params?.state]);

    useEffect(() => {
        // we just redirected the user or to the new url which includes the fy selection
        props.setStateFiscalYear(props?.match?.params?.fy);
    }, [props?.match?.params?.fy]);

    useEffect(() => {
        const [, , stateId] = parseStateDataFromUrl(props.match.params.state);
        loadStateOverview(stateId, props.stateProfile.fy);
    }, [props?.stateProfile?.fy]);

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
