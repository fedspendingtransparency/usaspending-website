/**
 * StateContainer.jsx
 * Created by Lizzie Salita 5/1/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import BaseStateProfile from 'models/v2/state/BaseStateProfile';
import * as StateHelper from 'helpers/stateHelper';
import * as stateActions from 'redux/actions/state/stateActions';

import StatePage from 'components/state/StatePage';

require('pages/state/statePage.scss');

const propTypes = {
    params: PropTypes.object,
    stateProfile: PropTypes.object,
    setStateOverview: PropTypes.func,
    setStateFiscalYear: PropTypes.func
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
    componentWillMount() {
        this.loadStateOverview(this.props.params.stateId, this.props.stateProfile.fy);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.stateId !== nextProps.params.stateId) {
            // Reset the FY
            this.props.setStateFiscalYear('latest');
            this.loadStateOverview(nextProps.params.stateId, 'latest');
        }
        if (this.props.stateProfile.fy !== nextProps.stateProfile.fy) {
            this.loadStateOverview(nextProps.params.stateId, nextProps.stateProfile.fy);
        }
    }

    loadStateOverview(id, year) {
        if (this.request) {
            this.request.cancel();
        }

        this.request = StateHelper.fetchStateOverview(id, year);

        this.request.promise
            .then((res) => {
                const noState = Object.keys(res.data.results).length === 0;

                this.setState({
                    loading: false,
                    error: noState
                }, () => {
                    if (!noState) {
                        this.parseOverview(res.data.results);
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
