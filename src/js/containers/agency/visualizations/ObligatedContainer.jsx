/**
 * ObligatedContainer.jsx
 * Created by Lizzie Salita 6/9/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import AgencyOverviewModel from 'models/agency/AgencyOverviewModel';
import * as AgencyHelper from 'helpers/agencyHelper';
import * as agencyActions from 'redux/actions/agency/agencyActions';

import ObligatedVisualization from 'components/agency/visualizations/obligated/ObligatedVisualization';

const propTypes = {
    id: React.PropTypes.string
};

export class ObligatedContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false
        };
    }

    componentWillMount() {
        this.loadData(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.loadData(nextProps.id);
        }
    }

    loadData(id) {
        // future API call
    }

    render() {
        return (
            <ObligatedVisualization
                activeFY={2017}
                agency="U.S. Department of Energy (DOE)"
                obligatedAmount={18800000000}
                budgetAuthority={3840000000000} />
        );
    }
}

export default connect(
    (state) => ({
        agency: state.agency
    })
)(ObligatedContainer);

ObligatedContainer.propTypes = propTypes;
