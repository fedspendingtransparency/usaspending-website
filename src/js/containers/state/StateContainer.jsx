/**
 * StateContainer.jsx
 * Created by Lizzie Salita 5/1/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import BaseStateProfile from 'models/state/BaseStateProfile';
import * as StateHelper from 'helpers/stateHelper';
import * as stateActions from 'redux/actions/state/stateActions';
import { stateCenterFromFips } from 'helpers/mapHelper';

import StatePage from 'components/state/StatePage';

require('pages/state/statePage.scss');

const propTypes = {
    params: PropTypes.object,
    stateProfile: PropTypes.object,
    setStateOverview: PropTypes.func,
    setStateFiscalYear: PropTypes.func,
    setStateCenter: PropTypes.func
};

export class StateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false
        };

        this.request = null;
    }

    componentDidMount() {
        this.loadStateOverview(this.props.params.stateId, this.props.stateProfile.fy);
        this.setStateCenter(this.props.params.stateId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.stateId !== prevProps.params.stateId) {
            // Reset the FY
            this.props.setStateFiscalYear('latest');
            this.loadStateOverview(this.props.params.stateId, 'latest');
            // Update the map center
            this.setStateCenter(this.props.params.stateId);
        }
        if (this.props.stateProfile.fy !== prevProps.stateProfile.fy) {
            this.loadStateOverview(this.props.params.stateId, this.props.stateProfile.fy);
        }
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
                pickedFy={this.props.setStateFiscalYear} />
        );
    }
}

export default connect(
    (state) => ({
        stateProfile: state.stateProfile
    }),
    (dispatch) => bindActionCreators(stateActions, dispatch)
)(StateContainer);

StateContainer.propTypes = propTypes;
