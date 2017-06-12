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
        // future API call
        this.setState({
            loading: false
        }, () => {
            // temporarily force the ID into the Redux store object while we mock the API
            this.parseOverview({
                agency_id: id,
                agency_name: 'U.S. Department of Energy',
                agency_abbreviation: 'DOE',
                agency_logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Seal_of_the_United_States_Department_of_Energy.svg/500px-Seal_of_the_United_States_Department_of_Energy.svg.png',
                active_fy: '2017'
            });
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
