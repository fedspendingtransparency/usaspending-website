/**
 * ObligatedContainer.jsx
 * Created by Lizzie Salita 6/9/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as AgencyHelper from 'helpers/agencyHelper';

import ObligatedVisualization from
    'components/agency/visualizations/obligated/ObligatedVisualization';

const propTypes = {
    id: PropTypes.string,
    activeFY: PropTypes.string,
    agencyName: PropTypes.string,
    asOfDate: PropTypes.string
};

export class ObligatedContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: true,
            obligatedAmount: 0,
            budgetAuthority: 0,
            outlay: 0
        };

        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData(this.props.id, this.props.activeFY);
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.loadData(this.props.id, this.props.activeFY);
        }
    }

    loadData(agencyID, activeFY) {
        if (this.searchRequest) {
            // A request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

        this.setState({
            inFlight: true
        });

        this.searchRequest = AgencyHelper.fetchAgencyObligatedAmounts({
            fiscal_year: activeFY,
            funding_agency_id: agencyID
        });

        this.searchRequest.promise
            .then((res) => {
                this.searchRequest = null;

                this.setState({
                    obligatedAmount: parseFloat(res.data.results[0].obligated_amount),
                    budgetAuthority: parseFloat(res.data.results[0].budget_authority_amount),
                    outlay: parseFloat(res.data.results[0].outlay_amount)
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);

                    this.setState({
                        inFlight: false
                    });
                    this.searchRequest = null;
                }
            });
    }

    render() {
        return (
            <ObligatedVisualization
                activeFY={this.props.activeFY}
                agencyName={this.props.agencyName}
                obligatedAmount={this.state.obligatedAmount}
                budgetAuthority={this.state.budgetAuthority}
                outlay={this.state.outlay}
                asOfDate={this.props.asOfDate} />
        );
    }
}

export default connect(
    (state) => ({
        agency: state.agency
    })
)(ObligatedContainer);

ObligatedContainer.propTypes = propTypes;
