/**
 * ObligatedContainer.jsx
 * Created by Lizzie Salita 6/9/17
 */

import React from 'react';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as AgencyHelper from 'helpers/agencyHelper';

import ObligatedVisualization from
    'components/agency/visualizations/obligated/ObligatedVisualization';

const propTypes = {
    id: React.PropTypes.string,
    activeFY: React.PropTypes.string,
    agencyName: React.PropTypes.string
};

export class ObligatedContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: true,
            obligatedAmount: 0,
            budgetAuthority: 0,
            fiscalQuarter: 0,
            cgacCode: ""
        };

        this.loadData = this.loadData.bind(this);
        this.setCgacCode = this.setCgacCode.bind(this);
        this.setFiscalQuarter = this.setFiscalQuarter.bind(this);
    }

    componentWillMount() {
        this.loadData(this.props.id, this.props.activeFY);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.loadData(nextProps.id, nextProps.activeFY);
        }
    }

    setCgacCode(id) {
        if (this.cgacRequest) {
            this.cgacRequest.cancel();
        }

        this.cgacRequest = AgencyHelper.fetchAgencyCgacCode({
            id
        });

        return this.cgacRequest.promise;
    }

    setFiscalQuarter(cgacCode) {
        if (this.quarterRequest) {
            this.quarterRequest.cancel();
        }

        this.quarterRequest = AgencyHelper.fetchAgencyFiscalQuarter({
            cgac_code: cgacCode
        });

        return this.quarterRequest.promise;
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
                    budgetAuthority: parseFloat(res.data.results[0].budget_authority_amount)
                });

                return this.setCgacCode(this.props.id);
            })
            .then((cgacRes) => {
                const cgacCode = cgacRes.data.results[0].toptier_agency.cgac_code;
                this.setState({
                    cgacCode
                });
                return this.setFiscalQuarter(cgacCode);
            })
            .then((quarterRes) => {
                this.setState({
                    inFlight: false,
                    fiscalQuarter: quarterRes.data.results[0].reporting_fiscal_quarter
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);

                    this.setState({
                        inFlight: false
                    });
                    this.searchRequest = null;
                    this.cgacRequest = null;
                    this.quarterRequest = null;
                }
            });
    }

    render() {
        return (
            <ObligatedVisualization
                activeFY={this.props.activeFY}
                reportingFiscalQuarter={this.state.fiscalQuarter}
                agencyName={this.props.agencyName}
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
