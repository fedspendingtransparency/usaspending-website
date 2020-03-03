/**
 * AgencyContainer.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import moment from 'moment';

import AgencyOverviewModel from 'models/agency/AgencyOverviewModel';
import * as AgencyHelper from 'helpers/agencyHelper';
import * as SearchHelper from 'helpers/searchHelper';
import * as agencyActions from 'redux/actions/agency/agencyActions';

import AgencyPage from 'components/agency/AgencyPage';

require('pages/agency/agencyPage.scss');

const propTypes = {
    params: PropTypes.object,
    agency: PropTypes.object,
    setAgencyOverview: PropTypes.func
};

export class AgencyContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            lastUpdate: '',
            isTreasury: false
        };

        this.request = null;
        this.updateRequest = null;
    }
    componentDidMount() {
        this.loadAgencyOverview(this.props.params.agencyId);
        this.loadUpdateDate();
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.agencyId !== prevProps.params.agencyId) {
            this.loadAgencyOverview(this.props.params.agencyId);
        }
    }

    loadAgencyOverview(id) {
        if (this.request) {
            this.request.cancel();
        }

        this.request = AgencyHelper.fetchAgencyOverview(id);

        this.request.promise
            .then((res) => {
                const noAgency = Object.keys(res.data.results).length === 0;

                this.setState({
                    loading: false,
                    error: noAgency
                }, () => {
                    if (!noAgency) {
                        this.parseOverview(res.data.results, id);
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

    parseOverview(data, id) {
        const agency = new AgencyOverviewModel(Object.assign({}, data, {
            agency_id: id
        }), true);
        this.props.setAgencyOverview(agency);

        let isTreasury = false;
        if (data.icon_filename === 'DOT.jpg') {
            isTreasury = true;
        }

        if (isTreasury !== this.state.isTreasury) {
            this.setState({
                isTreasury
            });
        }
    }

    loadUpdateDate() {
        if (this.updateRequest) {
            this.updateRequest.cancel();
        }

        this.updateRequest = SearchHelper.fetchLastUpdate();
        this.updateRequest.promise
            .then((res) => {
                this.parseUpdateDate(res.data.last_updated);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.updateRequest = null;
                }
            });
    }

    parseUpdateDate(value) {
        const date = moment(value, 'MM/DD/YYYY');
        this.setState({
            lastUpdate: date.format('MMMM D, YYYY')
        });
    }

    render() {
        return (
            <AgencyPage
                loading={this.state.loading}
                error={this.state.error}
                id={this.props.agency.id}
                agency={this.props.agency}
                lastUpdate={this.state.lastUpdate}
                isTreasury={this.state.isTreasury} />
        );
    }
}

export default connect((state) => ({ agency: state.agency }), (dispatch) => bindActionCreators(agencyActions, dispatch))(AgencyContainer);

AgencyContainer.propTypes = propTypes;
