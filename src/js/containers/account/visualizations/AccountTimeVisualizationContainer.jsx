/**
 * AccountTimeVisualizationContainer.jsx
 * Created by Kevin Li 3/20/17
 */


import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import _ from 'lodash';
import moment from 'moment';

import AccountTimeVisualizationSection from
    'components/account/visualizations/time/AccountTimeVisualizationSection';

import * as AccountHelper from 'helpers/accountHelper';
import * as AccountQuartersHelper from 'helpers/accountQuartersHelper';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import * as accountFilterActions from 'redux/actions/account/accountFilterActions';

import AccountSearchBalanceOperation from 'models/account/queries/AccountSearchBalanceOperation';
import { balanceFields } from 'dataMapping/accounts/accountFields';

const propTypes = {
    reduxFilters: React.PropTypes.object,
    account: React.PropTypes.object
};

export class AccountTimeVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            groups: [],
            xSeries: [],
            ySeries: [],
            allY: [],
            visualizationPeriod: 'year',
            hasFilteredObligated: false
        };

        this.balanceRequests = [];
        this.changePeriod = this.changePeriod.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.reduxFilters, this.props.reduxFilters)) {
            this.fetchData();
        }
    }

    changePeriod(period) {
        const prevPeriod = this.state.visualizationPeriod;
        this.setState({
            visualizationPeriod: period
        });
        if (prevPeriod != period) {
            this.fetchData();
        }
    }

    fetchData() {
        if (this.balanceRequests.length > 0) {
            // cancel all previous requests
            this.balanceRequests.forEach((request) => {
                request.cancel();
            });
            this.balanceRequests = [];
        }

        const searchOperation = new AccountSearchBalanceOperation(this.props.account.id);
        searchOperation.fromState(this.props.reduxFilters);
        const filters = searchOperation.toParams();

        const requests = [];
        const promises = [];

        if (this.state.hasFilteredObligated) {
            // TODO
            if (this.state.visualizationPeriod === 'quarter') {
                this.parseBalances();
            }
            else {
                this.parseBalances();
            }
        }
        else {
            // Does not have filtered obligated
            if (this.state.visualizationPeriod === 'quarter') {
                //Object.keys(balanceFields).forEach((balanceType) => {
                //    // generate API call using helper for quarters
                //    const request = AccountQuartersHelper.fetchTasBalanceTotals({
                //        filters,
                //        group: 'reporting_period_start',
                //        field: balanceFields[balanceType],
                //        aggregate: 'sum',
                //        order: ['reporting_period_start']
                //    });
                //
                //    request.type = balanceType;
                //
                //    requests.push(request);
                //    promises.push(request.promise);
                //});
                //
                //this.balanceRequests = requests;

                this.parseBalances();
            }
            else {
                Object.keys(balanceFields).forEach((balanceType) => {
                    // generate API call
                    const request = AccountHelper.fetchTasBalanceTotals({
                        filters,
                        group: 'reporting_period_start',
                        field: balanceFields[balanceType],
                        aggregate: 'sum',
                        order: ['reporting_period_start']
                    });

                    request.type = balanceType;

                    requests.push(request);
                    promises.push(request.promise);
                });

                this.balanceRequests = requests;
            }

        }

        Promise.all(promises)
            .then((res) => {
                this.parseBalances(res);

                this.setState({
                    loading: false
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        loading: false
                    });
                    console.log(err);
                }
            });
    }

    parseBalances(data) {
        let years = [];
        let quarters = [];
        let mockY = [];
        if (this.state.hasFilteredObligated) {
            if (this.state.visualizationPeriod === 'quarter') {
                years = ['2017 Q1', '2017 Q2', '2017 Q3'];
                quarters = [['2017 Q1'], ['2017 Q2'], ['2017 Q3']];
                mockY = [
                    [{
                        budgetAuthority: 50000,
                        obligationTotal: 40000,
                        obligationFiltered: 23000,
                        unobligated: 10000,
                        outlay: 30000
                    }],
                    [{
                        budgetAuthority: 70000,
                        obligationTotal: 50000,
                        obligationFiltered: 43000,
                        unobligated: 20000,
                        outlay: 62000
                    }],
                    [{
                        budgetAuthority: 30000,
                        obligationTotal: 20000,
                        obligationFiltered: 18000,
                        unobligated: 10000,
                        outlay: 22000
                    }]
                ];
            }
            else {
                // Visualization period is years
                years = ['2015', '2016', '2017'];
                quarters = [['2017 Q1'], ['2017 Q2'], ['2017 Q3']];
                mockY = [
                    [{
                        budgetAuthority: 50000,
                        obligationTotal: 40000,
                        obligationFiltered: 23000,
                        unobligated: 10000,
                        outlay: 30000
                    }],
                    [{
                        budgetAuthority: 70000,
                        obligationTotal: 50000,
                        obligationFiltered: 43000,
                        unobligated: 20000,
                        outlay: 62000
                    }],
                    [{
                        budgetAuthority: 30000,
                        obligationTotal: 20000,
                        obligationFiltered: 18000,
                        unobligated: 10000,
                        outlay: 22000
                    }]
                ];
            }
        }
        else {
            // does not have filtered obligated
            if (this.state.visualizationPeriod === 'quarter') {
                years = ['2017 Q1', '2017 Q2', '2017 Q3'];
                quarters = [['2017 Q1'], ['2017 Q2'], ['2017 Q3']];
                mockY = [
                    [{
                        budgetAuthority: 60000,
                        obligated: 40000,
                        unobligated: 20000,
                        outlay: 30000
                    }],
                    [{
                        budgetAuthority: 70000,
                        obligated: 63000,
                        unobligated: 20000,
                        outlay: 42000
                    }],
                    [{
                        budgetAuthority: 30000,
                        obligated: 22000,
                        unobligated: 10000,
                        outlay: 44000
                    }]
                ];
            }
            else {
                // Visualization period is years
                years = ['2015', '2016', '2017'];
                quarters = [['2017 Q1'], ['2017 Q2'], ['2017 Q3']];
                mockY = [
                    [{
                        budgetAuthority: 50000,
                        obligated: 30000,
                        unobligated: 20000,
                        outlay: 25000
                    }],
                    [{
                        budgetAuthority: 70000,
                        obligated: 63000,
                        unobligated: 20000,
                        outlay: 73000
                    }],
                    [{
                        budgetAuthority: 30000,
                        obligated: 20000,
                        unobligated: 10000,
                        outlay: 22000
                    }]
                ];
            }
        }

        const groups = [];
        const xSeries = [];
        const ySeries = [];
        const allY = [];

        years.forEach((year, index) => {
            groups.push(`${year}`);
            xSeries.push(quarters[index]);

            ySeries.push(mockY[index]);

            mockY[index].forEach((balances) => {
                // adjust the yMin and yMax to be the min and max value of any balance
                Object.keys(balances).forEach((key) => {
                    const balance = balances[key];
                    allY.push(balance);
                });
            });
        });

        this.setState({
            groups,
            xSeries,
            ySeries,
            allY,
            loading: false
        });
    }

    render() {
        return (
            <AccountTimeVisualizationSection
                data={this.state}
                visualizationPeriod={this.state.visualizationPeriod}
                changePeriod={this.changePeriod}
                hasFilteredObligated={this.state.hasFilteredObligated} />
        );
    }
}

AccountTimeVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.account.filters,
        account: state.account.account
    }),
    (dispatch) => bindActionCreators(accountFilterActions, dispatch)
)(AccountTimeVisualizationSectionContainer);
