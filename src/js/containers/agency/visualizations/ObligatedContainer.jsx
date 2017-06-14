/**
 * ObligatedContainer.jsx
 * Created by Lizzie Salita 6/9/17
 */

import React from 'react';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

// import AgencyOverviewModel from 'models/agency/AgencyOverviewModel';
import * as AgencyHelper from 'helpers/agencyHelper';

import ObligatedVisualization from 'components/agency/visualizations/obligated/ObligatedVisualization';

const propTypes = {
    id: React.PropTypes.string,
    activeFY: React.PropTypes.string,
    agencyName: React.PropTypes.string
};

export class ObligatedContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            inFlight: true,
            obligatedAmount: 0,
            budgetAuthority: 0
        };

        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        this.loadData(this.props.id, this.props.activeFY);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.loadData(nextProps.id, nextProps.activeFY);
        }
    }

    loadData(agencyID, activeFY) {
        if (this.searchRequest) {
            // A request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

        // TODO - Lizzie: remove once data is available
        this.searchRequest = AgencyHelper.fetchObligatedAmounts({
            fiscal_year: 2017,
            funding_agency_id: 246
        });

        this.setState({
            inFlight: true
        });

        this.searchRequest.promise
            .then((res) => {
                this.searchRequest = null;

                this.setState({
                    inFlight: false
                });

                this.setState({
                    obligatedAmount: parseFloat(res.data.results[0].obligated_amount),
                    budgetAuthority: parseFloat(res.data.results[0].budget_authority_amount)
                });
            })
            .catch((err) => {
                this.searchRequest = null;

                this.setState({
                    inFlight: false
                });

                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }

    render() {
        // TODO - Lizzie: get reporting fiscal quarter
        return (
            <div id="agency-obligated-amount">
                <ObligatedVisualization
                    activeFY={parseFloat(this.props.activeFY)}
                    reportingFiscalQuarter={3}
                    agencyName={this.props.agencyName}
                    obligatedAmount={this.state.obligatedAmount}
                    budgetAuthority={this.state.budgetAuthority} />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        agency: state.agency
    })
)(ObligatedContainer);

ObligatedContainer.propTypes = propTypes;
