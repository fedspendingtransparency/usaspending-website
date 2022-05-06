/**
 * StateContainer.jsx
 * Created by Lizzie Salita 5/1/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { withRouter } from 'react-router-dom';

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

export class StateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false
        };

        this.request = null;
        this.onClickFy = this.onClickFy.bind(this);
    }

    componentDidMount() {
        const { fy, state } = this.props.match.params;
        const [wasInputStateName, stateName, stateId] = parseStateDataFromUrl(state);

        if (!Object.keys(this.props.match.params).includes('fy')) {
            this.props.history.replace(`/state/${stateName}/latest`);
        }
        else if (!wasInputStateName) {
            this.props.history.replace(`/state/${stateName}/${fy}`);
        }
        else {
            this.props.setStateFiscalYear(fy);
            this.loadStateOverview(stateId, fy);
            this.setStateCenter(stateId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.state !== prevProps.match.params.state) {
            const [, , stateId] = parseStateDataFromUrl(this.props.match.params.state);
            // Reset the FY
            this.props.setStateFiscalYear(this.props.match.params.fy);
            this.loadStateOverview(stateId, this.props.match.params.fy);
            // Update the map center
            this.setStateCenter(stateId);
        }
        if (
            (!prevProps.match.params.fy && this.props.match.params.fy) ||
            (prevProps.match.params.fy !== this.props.match.params.fy)) {
            // we just redirected the user or to the new url which includes the fy selection
            this.props.setStateFiscalYear(this.props.match.params.fy);
        }
        if (this.props.stateProfile.fy !== prevProps.stateProfile.fy) {
            const [, , stateId] = parseStateDataFromUrl(this.props.match.params.state);
            this.loadStateOverview(stateId, this.props.stateProfile.fy);
        }
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    onClickFy(fy) {
        const [, stateName] = parseStateDataFromUrl(this.props.match.params.state);
        this.props.history.push(`/state/${stateName}/${fy}`);
        this.props.setStateFiscalYear(fy);
    }

    setStateCenter(id) {
        const center = stateCenterFromFips(id);
        this.props.setStateCenter(center);
    }

    loadStateOverview(id, year) {
        if (this.request) {
            this.request.cancel();
        }

        this.request = StateHelper.fetchStateOverview(id, year);

        this.request.promise
            .then((res) => {
                const noState = Object.keys(res.data).length === 0;

                this.setState({
                    loading: false,
                    error: noState
                }, () => {
                    if (!noState) {
                        this.parseOverview(res.data);
                    }
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);

                    this.setState({
                        loading: false,
                        error: true
                    });
                }
            });
    }

    parseOverview(data) {
        const stateProfile = Object.create(BaseStateProfile);
        stateProfile.populate(data);
        this.props.setStateOverview(stateProfile);
    }

    render() {
        return (
            <StatePage
                loading={this.state.loading}
                error={this.state.error}
                id={this.props.stateProfile.id}
                stateProfile={this.props.stateProfile}
                pickedFy={this.onClickFy} />
        );
    }
}

StateContainer.propTypes = propTypes;
const StateContainerWithRouter = withRouter(StateContainer);

export default connect(
    (state) => ({
        stateProfile: state.stateProfile
    }),
    (dispatch) => bindActionCreators(stateActions, dispatch)
)(StateContainerWithRouter);
