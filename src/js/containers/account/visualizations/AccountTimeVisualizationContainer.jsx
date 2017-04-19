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
            visualizationPeriod: 'year'
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

        const hasFilteredObligated = (this.props.reduxFilters.objectClass.count() > 0);

        if (hasFilteredObligated) {
            const categorySearchOperation = new AccountSearchCategoryOperation(this.props.account.id);
            categorySearchOperation.fromState(this.props.reduxFilters);
            const categoryFilters = categorySearchOperation.toParams();

            if (this.state.visualizationPeriod === 'quarter') {
                Object.keys(balanceFieldsFiltered).forEach((balanceType) => {
                    // generate API call using helper for quarters
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
                this.balanceRequests = requests;
            }
            else if (this.state.visualizationPeriod === 'year') {
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
                this.balanceRequests = requests;
            }
        }
        else if (this.state.visualizationPeriod === 'quarter') {
            // Does not have filtered obligated
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
                    order: ['submission__reporting_fiscal_year']
                });

                request.type = balanceType;
                requests.push(request);
                promises.push(request.promise);
            });

            this.balanceRequests = requests;
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
        const hasFilteredObligated = (this.props.reduxFilters.objectClass.count() > 0);

        if (hasFilteredObligated) {
            if (this.state.visualizationPeriod === 'quarter') {
                const quarters = [];
                const yData = {};
                data.forEach((balance, balanceIndex) => {
                    const type = this.balanceRequests[balanceIndex].type;
                    balance.data.results.forEach((group) => {
                        const quarter = `${group.item} Q${group.submission__reporting_fiscal_quarter}`;
                        if (!yData[quarter]) {
                            quarters.push(quarter);
                            yData[quarter] = {
                                obligatedFiltered: 0,
                                outlay: 0,
                                budgetAuthority: 0,
                                unobligated: 0
                            };
                        }
                        yData[quarter][type] = parseFloat(group.aggregate);
                    });
                });

                quarters.forEach((quarter) => {
                    groups.push(`${quarter}`);
                    xSeries.push([`${quarter}`]);
                    const budgetAuthority = yData[quarter].budgetAuthority;
                    const unobligated = yData[quarter].unobligated;
                    const obligatedFiltered = yData[quarter].obligatedFiltered;
                    // Calculate Obligated (Other)
                    const obligatedOther = budgetAuthority - unobligated - obligatedFiltered;
                    yData[quarter].obligatedOther = obligatedOther;
                    // Calculate Obligation Total
                    yData[quarter].obligationTotal = obligatedFiltered + obligatedOther;
                    ySeries.push([yData[quarter]]);
                });

                ySeries.forEach((quarter) => {
                    allY.push(quarter[0].obligatedFiltered);
                    allY.push(quarter[0].outlay);
                    allY.push(quarter[0].budgetAuthority);
                    allY.push(quarter[0].unobligated);
                });
            }
            else {
                // Visualization period is years
                const years = [];
                const yData = [];
                data.forEach((balance, balanceIndex) => {
                    const type = this.balanceRequests[balanceIndex].type;
                    balance.data.results.forEach((group) => {
                        const year = `${group.item}`;
                        if (!yData[year]) {
                            years.push(year);
                            yData[year] = {
                                obligatedFiltered: 0,
                                outlay: 0,
                                budgetAuthority: 0,
                                unobligated: 0
                            };
                        }
                        yData[year][type] = parseFloat(group.aggregate);
                    });
                });

                years.forEach((year) => {
                    groups.push(`${year}`);
                    xSeries.push([`${year}`]);
                    const budgetAuthority = yData[year].budgetAuthority;
                    const unobligated = yData[year].unobligated;
                    const obligatedFiltered = yData[year].obligatedFiltered;
                    // Calculate Obligated (Other)
                    const obligatedOther = budgetAuthority - unobligated - obligatedFiltered;
                    yData[year].obligatedOther = obligatedOther;
                    // Calculate Obligation Total
                    yData[year].obligationTotal = obligatedFiltered + obligatedOther;
                    ySeries.push([yData[year]]);
                });

                ySeries.forEach((year) => {
                    allY.push(year[0].obligatedFiltered);
                    allY.push(year[0].outlay);
                    allY.push(year[0].budgetAuthority);
                    allY.push(year[0].unobligated);
                });
            }
        }
        else if (this.state.visualizationPeriod === 'quarter') {
            // does not have filtered obligated
            const quarters = [];
            const yData = [];
            data.forEach((balance, balanceIndex) => {
                balance.data.results.forEach((group, groupIndex) => {
                    const type = this.balanceRequests[balanceIndex].type;
                    if (balanceIndex === 0) {
                        // only push the group once
                        quarters.push(`${group.item} Q${group.submission__reporting_fiscal_quarter}`);
                        yData.push({});
                    }
                    yData[groupIndex][type] = parseFloat(group.aggregate);
                    allY.push(parseFloat(group.aggregate));
                });
            });
            quarters.forEach((quarter, index) => {
                groups.push(`${quarter}`);
                xSeries.push([`${quarter}`]);
                ySeries.push([yData[index]]);
            });
        }
        else {
            // Visualization period is years
            const years = [];
            const yData = [];
            data.forEach((balance, balanceIndex) => {
                balance.data.results.forEach((group, groupIndex) => {
                    const type = this.balanceRequests[balanceIndex].type;
                    if (balanceIndex === 0) {
                        // only push the group once
                        years.push(group.item);
                        yData.push({});
                    }
                    yData[groupIndex][type] = parseFloat(group.aggregate);
                    allY.push(parseFloat(group.aggregate));
                });
            });

            years.forEach((year, index) => {
                groups.push(`${year}`);
                xSeries.push([`${year}`]);
                ySeries.push([yData[index]]);
            });
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
                reduxFilters={this.props.reduxFilters} />
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
