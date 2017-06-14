/**
 * ObligatedContainer.jsx
 * Created by Lizzie Salita 6/9/17
 */

import React from 'react';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

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
        this.cgacRequest = AgencyHelper.fetchAgencyCgacCode({
            id
        });

        this.cgacRequest.promise
            .then((res) => {
                this.setState(
                    {
                        cgacCode: res.data.results[0].toptier_agency.cgac_code
                    }
                );
                this.setFiscalQuarter(this.state.cgacCode);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }

    setFiscalQuarter(cgacCode) {
        this.quarterRequest = AgencyHelper.fetchAgencyFiscalQuarter({
            cgac_code: cgacCode
        });

        this.quarterRequest.promise
            .then((res) => {
                this.setState({
                    fiscalQuarter: res.data.results[0].reporting_fiscal_quarter
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }

    loadData(agencyID, activeFY) {
        if (this.searchRequest) {
            // A request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

        // TODO - Lizzie: uncomment when available
        this.searchRequest = AgencyHelper.fetchAgencyObligatedAmounts({
            //fiscal_year: agencyID,
            //funding_agency_id: activeFY
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

                // TODO - Lizzie: uncomment when available
                //this.setCgacCode(this.props.id);
                this.setCgacCode(246);
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
        // TODO - Lizzie: uncomment when available
        return (
            <div id="agency-obligated-amount">
                <ObligatedVisualization
                    //activeFY={this.props.activeFY}
                    activeFY={2017}
                    reportingFiscalQuarter={this.state.fiscalQuarter}
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
