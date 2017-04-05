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
        this.setState({
            visualizationPeriod: period
        });
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
        Object.keys(balanceFields).forEach((balanceType) => {
             // generate an API call
            const request = AccountHelper.fetchTasBalanceTotals({
                filters,
                group: 'reporting_period_start',
                field: balanceFields[balanceType],
                aggregate: 'sum',
                order: ['reporting_period_start']
            });
            //if (this.state.visualizationPeriod === 'quarter') {
            //    const request = AccountQuartersHelper.fetchTasBalanceTotals({
            //        filters,
            //        group: 'reporting_period_start',
            //        field: balanceFields[balanceType],
            //        aggregate: 'sum',
            //        order: ['reporting_period_start']
            //    });
            //}
            //else {
            //    const request = AccountHelper.fetchTasBalanceTotals({
            //        filters,
            //        group: 'reporting_period_start',
            //        field: balanceFields[balanceType],
            //        aggregate: 'sum',
            //        order: ['reporting_period_start']
            //    });
            //}

            request.type = balanceType;

            requests.push(request);
            promises.push(request.promise);
        });

        this.balanceRequests = requests;

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
        // const years = [];

        // const balances = {};
        // data.forEach((item, i) => {
        //     const type = this.balanceRequests[i].type;
        //     const values = {};

        //     item.data.results.forEach((group) => {
        //         const date = moment(group.item, 'YYYY-MM-DD');
        //         const fy = FiscalYearHelper.convertDateToFY(date);
        //         if (_.indexOf(years, fy) === -1) {
        //             years.push(fy);
        //         }
        //         values[fy] = group.aggregate;
        //     });

        //     balances[type] = values;
        // });


        const years = ['2017', '2016', '2015'];
        const quarters = [['2017 Q1'], ['2017 Q2'], ['2017 Q3']];
        const mockY = [
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
                changePeriod={this.changePeriod} />
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
