/**
 * AgencyContainer.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { is } from 'immutable';

import AgencyOverviewModel from 'models/agency/AgencyOverviewModel';
import * as AgencyHelper from 'helpers/agencyHelper';
import * as agencyActions from 'redux/actions/agency/agencyActions';

import AgencyPage from 'components/agency/AgencyPage';

const propTypes = {
    params: React.PropTypes.object,
    agency: React.PropTypes.object,
    setAgencyOverview: React.PropTypes.func
};

export class AgencyContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false
        };

        this.request = null;
    }
    componentWillMount() {
        this.loadAgencyOverview(this.props.params.agencyId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.agencyId !== nextProps.params.agencyId) {
            this.loadAgencyOverview(nextProps.params.agencyId);
        }
    }

    loadAgencyOverview(id) {
        if (this.request) {
            this.request.cancel();
        }

        this.request = AgencyHelper.fetchAgencyOverview(id);

        this.request.promise
            .then((res) => {
                this.setState({
                    loading: false,
                    error: false
                }, () => {
                    this.parseOverview(res.data.results);
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
        const agency = new AgencyOverviewModel(data, true);
        this.props.setAgencyOverview(agency);
    }

    render() {
        return (
            <AgencyPage
                loading={this.state.loading}
                error={this.state.error}
                id={this.props.agency.id}
                agency={this.props.agency} />
        );
    }
}

export default connect(
    (state) => ({
        agency: state.agency
    }),
    (dispatch) => bindActionCreators(agencyActions, dispatch)
)(AgencyContainer);

AgencyContainer.propTypes = propTypes;
