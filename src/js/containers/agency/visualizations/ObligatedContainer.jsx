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
    activeFY: React.PropTypes.string
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

        // TODO- Lizzie: remove placeholder values
        // const params = {
        //    fiscal_year: activeFY,
        //    funding_agency_id: agencyID
        // };

        const params = {
            fiscal_year: 2017,
            funding_agency_id: 246
        };

        this.searchRequest = AgencyHelper.fetchObligatedAmounts(params);

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
        // TODO - Lizzie: remove hard-coded props
        return (
            <ObligatedVisualization
                activeFY={2017}
                reportingFiscalQuarter={3}
                agency="U.S. Department of Energy (DOE)"
                obligatedAmount={this.state.obligatedAmount}
                budgetAuthority={this.state.budgetAuthority} />
        );
    }
}

export default connect(
    (state) => ({
        agency: state.agency
    })
)(ObligatedContainer);

ObligatedContainer.propTypes = propTypes;
