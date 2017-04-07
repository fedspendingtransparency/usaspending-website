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
        if (prevPeriod != period) {
            this.setState({visualizationPeriod: period}, () => { this.fetchData(); });
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
                Object.keys(balanceFields).forEach((balanceType) => {
                    // generate API call using helper for quarters
                    const request = AccountQuartersHelper.fetchTasBalanceTotals({
                        filters,
                        group: ['submission__reporting_fiscal_year', 'submission__reporting_fiscal_quarter'],
                        field: balanceFields[balanceType],
                        aggregate: 'sum',
                        order: ['submission__reporting_period_start']
                    });

                    request.type = balanceType;

                    requests.push(request);
                    promises.push(request.promise);
                });

                this.balanceRequests = requests;
            }
            else {
                // visualization period is year
                Object.keys(balanceFields).forEach((balanceType) => {
                    // generate API call
                    const request = AccountHelper.fetchTasBalanceTotals({
                        filters,
                        group: 'submission__reporting_fiscal_year',
                        field: balanceFields[balanceType],
                        aggregate: 'sum',
                        order: ['submission__reporting_period_start']
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
        const groups = [];
        const xSeries = [];
        const ySeries = [];
        const allY = [];

        data.forEach((item) => {
            item.data.results.forEach((group) => {
                console.log(group);
                groups.push(group.item);
                xSeries.push([group.item]);
                ySeries.push([parseFloat(group.aggregate)]);
            });
        });


        if (this.state.hasFilteredObligated) {
            
        }
        else {
            // does not have filtered obligated
            if (this.state.visualizationPeriod === 'quarter') {

            }
            else {
                // Visualization period is years
                //years.forEach((year, index) => {
                //    groups.push(`${year}`);
                //    xSeries.push(quarters[index]);
                //
                //    ySeries.push(mockY[index]);
                //
                //    mockY[index].forEach((balances) => {
                //        // adjust the yMin and yMax to be the min and max value of any balance
                //        Object.keys(balances).forEach((key) => {
                //            const balance = balances[key];
                //            allY.push(balance);
                //        });
                //    });
                //});
            }
        }

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
