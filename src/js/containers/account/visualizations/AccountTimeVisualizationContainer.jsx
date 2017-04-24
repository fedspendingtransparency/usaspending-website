/**
 * AccountTimeVisualizationContainer.jsx
 * Created by Kevin Li 3/20/17
 */


import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import _ from 'lodash';

import AccountTimeVisualizationSection from
    'components/account/visualizations/time/AccountTimeVisualizationSection';

import * as AccountHelper from 'helpers/accountHelper';
import * as AccountQuartersHelper from 'helpers/accountQuartersHelper';
import * as accountFilterActions from 'redux/actions/account/accountFilterActions';

import AccountSearchBalanceOperation from 'models/account/queries/AccountSearchBalanceOperation';
import AccountSearchCategoryOperation from 'models/account/queries/AccountSearchCategoryOperation';
import { balanceFields, balanceFieldsFiltered, balanceFieldsNonfiltered } from 'dataMapping/accounts/accountFields';

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

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.reduxFilters, this.props.reduxFilters)) {
            this.setState({
                hasFilteredObligated: (((nextProps.reduxFilters.objectClass.count() > 0)
                || (nextProps.reduxFilters.programActivity.count() > 0)))
            }, () => {
                this.fetchData();
            });
        }
    }

    changePeriod(period) {
        const prevPeriod = this.state.visualizationPeriod;
        if (prevPeriod !== period) {
            this.setState(
                {
                    visualizationPeriod: period
                },
                () => {
                    this.fetchData();
                }
            );
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
        // const filters = searchOperation.toParams();
        const balanceFilters = searchOperation.toParams();
        let filters = balanceFilters;

        const requests = [];
        const promises = [];

        const categorySearchOperation = new AccountSearchCategoryOperation(this.props.account.id);
        categorySearchOperation.fromState(this.props.reduxFilters);
        const categoryFilters = categorySearchOperation.toParams();

        if (this.state.visualizationPeriod === 'quarter') {
            if (this.state.hasFilteredObligated) {
                Object.keys(balanceFieldsFiltered).forEach((balanceType) => {
                    // generate API call using helper for quarters with category filters
                    filters = categoryFilters;
                    const request = AccountQuartersHelper.fetchTasCategoryTotals({
                        filters,
                        group: ['submission__reporting_fiscal_year',
                            'submission__reporting_fiscal_quarter'],
                        field: balanceFieldsFiltered[balanceType],
                        aggregate: 'sum',
                        order: ['submission__reporting_fiscal_year']
                    });
                    request.type = balanceType;
                    requests.push(request);
                    promises.push(request.promise);
                });
                Object.keys(balanceFieldsNonfiltered).forEach((balanceType) => {
                    // generate API call using helper for quarters
                    filters = balanceFilters;
                    const request = AccountQuartersHelper.fetchTasBalanceTotals({
                        filters,
                        group: ['submission__reporting_fiscal_year',
                            'submission__reporting_fiscal_quarter'],
                        field: balanceFieldsNonfiltered[balanceType],
                        aggregate: 'sum',
                        order: ['submission__reporting_fiscal_year']
                    });
                    request.type = balanceType;
                    requests.push(request);
                    promises.push(request.promise);
                });
            }
            else {
                Object.keys(balanceFields).forEach((balanceType) => {
                    // generate API call using helper for quarters
                    const request = AccountQuartersHelper.fetchTasBalanceTotals({
                        filters,
                        group: ['submission__reporting_fiscal_year',
                            'submission__reporting_fiscal_quarter'],
                        field: balanceFields[balanceType],
                        aggregate: 'sum',
                        order: ['submission__reporting_fiscal_year']
                    });

                    request.type = balanceType;
                    requests.push(request);
                    promises.push(request.promise);
                });
            }
        }
        else if (this.state.visualizationPeriod === 'year') {
            if (this.state.hasFilteredObligated) {
                Object.keys(balanceFieldsFiltered).forEach((balanceType) => {
                    // generate API call using helper for quarters
                    filters = categoryFilters;
                    const request = AccountHelper.fetchTasCategoryTotals({
                        filters,
                        group: ['submission__reporting_fiscal_year'],
                        field: balanceFieldsFiltered[balanceType],
                        aggregate: 'sum',
                        order: ['submission__reporting_fiscal_year']
                    });
                    request.type = balanceType;
                    requests.push(request);
                    promises.push(request.promise);
                });
                Object.keys(balanceFieldsNonfiltered).forEach((balanceType) => {
                    // generate API call using helper for quarters
                    filters = balanceFilters;
                    const request = AccountHelper.fetchTasBalanceTotals({
                        filters,
                        group: ['submission__reporting_fiscal_year'],
                        field: balanceFieldsNonfiltered[balanceType],
                        aggregate: 'sum',
                        order: ['submission__reporting_fiscal_year']
                    });
                    request.type = balanceType;
                    requests.push(request);
                    promises.push(request.promise);
                });
            }
            else {
                Object.keys(balanceFields).forEach((balanceType) => {
                    // generate API call
                    const request = AccountHelper.fetchTasBalanceTotals({
                        filters,
                        group: ['submission__reporting_fiscal_year'],
                        field: balanceFields[balanceType],
                        aggregate: 'sum',
                        order: ['submission__reporting_fiscal_year']
                    });

                    request.type = balanceType;
                    requests.push(request);
                    promises.push(request.promise);
                });
            }
        }
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
        const groups = [];
        const xSeries = [];
        const ySeries = [];
        const allY = [];
        const yData = {};
        const quartersYears = [];

        data.forEach((balance, balanceIndex) => {
            const type = this.balanceRequests[balanceIndex].type;
            balance.data.results.forEach((group) => {
                let quarterYear;
                if (this.state.visualizationPeriod === 'quarter') {
                    quarterYear = `${group.item} Q${group.submission__reporting_fiscal_quarter}`;
                }
                else if (this.state.visualizationPeriod === 'year') {
                    quarterYear = `${group.item}`;
                }
                if (!yData[quarterYear]) {
                    quartersYears.push(quarterYear);
                    if (this.state.hasFilteredObligated) {
                        yData[quarterYear] = {
                            obligatedFiltered: 0,
                            outlay: 0,
                            budgetAuthority: 0,
                            unobligated: 0
                        };
                    }
                    else {
                        yData[quarterYear] = {
                            obligated: 0,
                            outlay: 0,
                            budgetAuthority: 0,
                            unobligated: 0
                        };
                    }
                }
                yData[quarterYear][type] = parseFloat(group.aggregate);
            });
        });

        quartersYears.forEach((quarterYear) => {
            groups.push(`${quarterYear}`);
            xSeries.push([`${quarterYear}`]);
            if (this.state.hasFilteredObligated) {
                const budgetAuthority = yData[quarterYear].budgetAuthority;
                const unobligated = yData[quarterYear].unobligated;
                const obligatedFiltered = yData[quarterYear].obligatedFiltered;
                // Calculate Obligated (Other)
                const obligatedOther = budgetAuthority - unobligated - obligatedFiltered;
                yData[quarterYear].obligatedOther = obligatedOther;
                // Calculate Obligation Total
                yData[quarterYear].obligationTotal = obligatedFiltered + obligatedOther;
            }
            ySeries.push([yData[quarterYear]]);
        });

        ySeries.forEach((quarterYear) => {
            if (this.state.hasFilteredObligated) {
                allY.push(quarterYear[0].obligatedFiltered);
            }
            else {
                allY.push(quarterYear[0].obligated);
            }
            allY.push(quarterYear[0].outlay);
            allY.push(quarterYear[0].budgetAuthority);
            allY.push(quarterYear[0].unobligated);
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
