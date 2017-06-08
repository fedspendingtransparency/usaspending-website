/**
 * RecipientContainer.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import AgencyOverviewModel from 'models/agency/AgencyOverviewModel';
import * as AgencyHelper from 'helpers/agencyHelper';
import * as agencyActions from 'redux/actions/agency/agencyActions';

import RecipientVisualization from 'components/agency/visualizations/recipient/RecipientVisualization';

const propTypes = {
    id: React.PropTypes.string
};

export class RecipientContainer extends React.Component {
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
            <RecipientVisualization />
        );
    }
}

export default connect(
    (state) => ({
        agency: state.agency
    })
)(RecipientContainer);

RecipientContainer.propTypes = propTypes;
