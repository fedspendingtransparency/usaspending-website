/**
 * AccountTimeVisualizationContainer.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { Record } from 'immutable';

import { isEqual } from 'lodash';

import AccountTimeVisualizationSection from
    'components/account/visualizations/time/AccountTimeVisualizationSection';

import * as AccountHelper from 'apis/account';
import * as AccountQuartersHelper from 'helpers/accountQuartersHelper';
import * as accountFilterActions from 'redux/actions/account/accountFilterActions';

import AccountSearchBalanceOperation from 'models/v1/account/queries/AccountSearchBalanceOperation';
import AccountSearchCategoryOperation from 'models/v1/account/queries/AccountSearchCategoryOperation';
import { balanceFields, balanceFieldsFiltered, balanceFieldsNonfiltered } from
    'dataMapping/accounts/accountFields';

const propTypes = {
    reduxFilters: PropTypes.object,
    account: PropTypes.object
};

// create an Immuatable Record object to guarantee the existance of required visualization fields
export const VisData = Record({
    xSeries: [],
    ySeries: [],
    allY: [],
    stacks: []
});

export class AccountTimeVisualizationSectionContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: new VisData(),
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
        if (!isEqual(prevProps.reduxFilters, this.props.reduxFilters) || !isEqual(prevProps.account.id, this.props.account.id)) {
            this.setUpdateStateAndFetch(this.props);
        }
    }

    setUpdateStateAndFetch(props) {
        this.setState({
            hasFilteredObligated: (((props.reduxFilters.objectClass.count() > 0)
            || (props.reduxFilters.programActivity.count() > 0)))
        }, () => {
            this.fetchData();
        });
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
                        order: ['submission__reporting_fiscal_year'],
                        auditTrail: `Spending over Time (quarters) - obligated filter - ${balanceType}`
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
                        order: ['submission__reporting_fiscal_year'],
                        auditTrail: `Spending over Time (quarters) - obligated filter - ${balanceType}`
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
                        order: ['submission__reporting_fiscal_year'],
                        auditTrail: `Spending over Time (quarters) - non-obligated filter - ${balanceType}`
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
                        group: ['submission__reporting_fiscal_year', 'submission__reporting_fiscal_quarter'],
                        field: balanceFieldsFiltered[balanceType],
                        aggregate: '',
                        order: ['submission__reporting_fiscal_year', 'submission__reporting_fiscal_quarter'],
                        auditTrail: `Spending over Time (years) - obligated filter - ${balanceType}`
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
                        group: ['submission__reporting_fiscal_year', 'submission__reporting_fiscal_quarter'],
                        field: balanceFieldsNonfiltered[balanceType],
                        aggregate: '',
                        order: ['submission__reporting_fiscal_year', 'submission__reporting_fiscal_quarter'],
                        auditTrail: `Spending over Time (years) - obligated filter - ${balanceType}`
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
                        group: ['submission__reporting_fiscal_year', 'submission__reporting_fiscal_quarter'],
                        field: balanceFields[balanceType],
                        aggregate: '',
                        order: ['submission__reporting_fiscal_year', 'submission__reporting_fiscal_quarter'],
                        auditTrail: `Spending over Time (years) - non-obligated filter - ${balanceType}`
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
        const xSeries = [];
        const ySeries = [];
        const allY = [];
        const yData = {};
        const groupLabels = [];

        data.forEach((balance, balanceIndex) => {
            const type = this.balanceRequests[balanceIndex].type;
            balance.data.results.forEach((group) => {
                let groupLabel = `${group.item}`;
                if (this.state.visualizationPeriod === 'quarter') {
                    groupLabel = `${group.item} Q${group.submission__reporting_fiscal_quarter}`;
                }
                if (!yData[groupLabel]) {
                    groupLabels.push(groupLabel);
                    if (this.state.hasFilteredObligated) {
                        yData[groupLabel] = {
                            obligatedFiltered: 0,
                            outlay: 0,
                            budgetAuthority: 0,
                            unobligated: 0
                        };
                    }
                    else {
                        yData[groupLabel] = {
                            obligated: 0,
                            outlay: 0,
                            budgetAuthority: 0,
                            unobligated: 0
                        };
                    }
                }
                yData[groupLabel][type] = parseFloat(group.aggregate);
            });
        });

        // Ensure the group labels are in chronological order
        groupLabels.sort();

        groupLabels.forEach((group) => {
            xSeries.push(`${group}`);
            if (this.state.hasFilteredObligated) {
                const budgetAuthority = yData[group].budgetAuthority;
                const unobligated = yData[group].unobligated;
                const obligatedFiltered = yData[group].obligatedFiltered;
                const outlay = yData[group].outlay;
                // Calculate Obligated (Other)
                const obligatedOther = budgetAuthority - unobligated - obligatedFiltered;

                const period = {
                    obligatedFiltered: {
                        bottom: 0,
                        top: obligatedFiltered,
                        value: obligatedFiltered,
                        description: 'Obligations Incurred (Filtered)'
                    },
                    obligatedOther: {
                        bottom: obligatedFiltered,
                        top: obligatedFiltered + obligatedOther,
                        value: obligatedOther,
                        description: 'Obligations Incurred (Other)'
                    },
                    unobligated: {
                        bottom: budgetAuthority - unobligated,
                        top: budgetAuthority,
                        value: unobligated,
                        description: 'Unobligated Balance'
                    },
                    outlay: {
                        bottom: outlay,
                        top: outlay,
                        value: outlay,
                        description: 'Outlay'
                    }
                };
                ySeries.push(period);
                allY.push(obligatedFiltered);
            }
            else {
                const period = {
                    obligated: {
                        bottom: 0,
                        top: yData[group].obligated,
                        value: yData[group].obligated,
                        description: 'Obligations Incurred'
                    },
                    unobligated: {
                        bottom: yData[group].obligated,
                        top: yData[group].unobligated + yData[group].obligated,
                        value: yData[group].unobligated,
                        description: 'Unobligated Balance'
                    },
                    outlay: {
                        bottom: yData[group].outlay,
                        top: yData[group].outlay,
                        value: yData[group].outlay,
                        description: 'Outlay'
                    }
                };

                ySeries.push(period);
                allY.push(yData[group].obligated);
            }
            allY.push(yData[group].outlay);
            allY.push(yData[group].budgetAuthority);
            allY.push(yData[group].unobligated);
        });

        // determine the bar stacks to display and their order
        let stacks = [
            {
                name: 'outlay',
                type: 'line',
                color: '#fba302'
            },
            {
                name: 'obligated',
                type: 'bar',
                color: '#5c7480'
            },
            {
                name: 'unobligated',
                type: 'bar',
                color: '#a0bac4'
            }
        ];
        if (this.state.hasFilteredObligated) {
            stacks = [
                {
                    name: 'outlay',
                    type: 'line',
                    color: '#fba302'
                },
                {
                    name: 'obligatedFiltered',
                    type: 'bar',
                    color: '#2c4452'
                },
                {
                    name: 'obligatedOther',
                    type: 'bar',
                    color: '#5c7480'
                },
                {
                    name: 'unobligated',
                    type: 'bar',
                    color: '#a0bac4'
                }
            ];
        }

        // combine all the visualization chart data into a single Immutable object
        const visualizationData = new VisData({
            xSeries,
            ySeries,
            allY,
            stacks
        });

        this.setState({
            data: visualizationData,
            loading: false
        });
    }

    render() {
        return (
            <AccountTimeVisualizationSection
                data={this.state.data}
                loading={this.state.loading}
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
