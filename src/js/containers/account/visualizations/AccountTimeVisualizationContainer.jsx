/**
 * AccountTimeVisualizationContainer.jsx
 * Created by Kevin Li 3/20/17
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { Record } from 'immutable';

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

// create an Immutable Record object to guarantee the existence of required visualization fields
export const VisData = Record({
    xSeries: [],
    ySeries: [],
    allY: [],
    stacks: []
});

const AccountTimeVisualizationSectionContainer = ({ reduxFilters, account }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(new VisData());
    const [visualizationPeriod, setVisualizationPeriod] = useState('quarter');
    const [hasFilteredObligated, setHasFilteredObligated] = useState(false);

    const balanceRequests = useRef([]);

    const setUpdateStateAndFetch = () => {
        setHasFilteredObligated((
            (reduxFilters.objectClass.count() > 0) ||
            (reduxFilters.programActivity.count() > 0)
        ));
    };

    const changePeriod = (period) => {
        if (visualizationPeriod !== period) {
            setVisualizationPeriod(period);
        }
    };

    const parseBalances = (res) => {
        const xSeries = [];
        const ySeries = [];
        const allY = [];
        const yData = {};
        const groupLabels = [];

        res.forEach((balance, balanceIndex) => {
            const type = balanceRequests.current[balanceIndex].type;
            balance.data.results.forEach((group) => {
                let groupLabel = `${group.item}`;
                if (visualizationPeriod === 'quarter') {
                    groupLabel = `${group.item} Q${group.submission__reporting_fiscal_quarter}`;
                }
                if (!yData[groupLabel]) {
                    groupLabels.push(groupLabel);
                    if (hasFilteredObligated) {
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
            if (hasFilteredObligated) {
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
        if (hasFilteredObligated) {
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

        setData(visualizationData);
        setLoading(false);
    };

    const fetchData = () => {
        if (balanceRequests.current.length > 0) {
            // cancel all previous requests
            balanceRequests.current.forEach((request) => {
                request.cancel();
            });
            balanceRequests.current = [];
        }

        setLoading(true);
        const searchOperation = new AccountSearchBalanceOperation(account.id);
        searchOperation.fromState(reduxFilters);
        const balanceFilters = searchOperation.toParams();
        let filters = balanceFilters;

        const requests = [];
        const promises = [];

        const categorySearchOperation = new AccountSearchCategoryOperation(account.id);
        categorySearchOperation.fromState(reduxFilters);
        const categoryFilters = categorySearchOperation.toParams();

        if (visualizationPeriod === 'quarter') {
            if (hasFilteredObligated) {
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
        else if (visualizationPeriod === 'year') {
            if (hasFilteredObligated) {
                Object.keys(balanceFieldsFiltered).forEach((balanceType) => {
                    // generate API call using helper for quarters
                    filters = categoryFilters;
                    const request = AccountHelper.fetchTasCategoryTotals({
                        filters,
                        group: [
                            'submission__reporting_fiscal_year',
                            'submission__reporting_fiscal_quarter'
                        ],
                        field: balanceFieldsFiltered[balanceType],
                        aggregate: '',
                        order: [
                            'submission__reporting_fiscal_year',
                            'submission__reporting_fiscal_quarter'
                        ],
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
                        group: [
                            'submission__reporting_fiscal_year',
                            'submission__reporting_fiscal_quarter'
                        ],
                        field: balanceFieldsNonfiltered[balanceType],
                        aggregate: '',
                        order: [
                            'submission__reporting_fiscal_year',
                            'submission__reporting_fiscal_quarter'
                        ],
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
                        group: [
                            'submission__reporting_fiscal_year',
                            'submission__reporting_fiscal_quarter'
                        ],
                        field: balanceFields[balanceType],
                        aggregate: '',
                        order: [
                            'submission__reporting_fiscal_year',
                            'submission__reporting_fiscal_quarter'
                        ],
                        auditTrail: `Spending over Time (years) - non-obligated filter - ${balanceType}`
                    });

                    request.type = balanceType;
                    requests.push(request);
                    promises.push(request.promise);
                });
            }
        }
        balanceRequests.current = requests;

        Promise.all(promises)
            .then((res) => {
                parseBalances(res);

                setLoading(false);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    setLoading(false);
                    console.log(err);
                }
            });
    };

    useEffect(() => {
        setUpdateStateAndFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduxFilters, account.id]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasFilteredObligated, visualizationPeriod, reduxFilters]);

    return (
        <AccountTimeVisualizationSection
            data={data}
            loading={loading}
            visualizationPeriod={visualizationPeriod}
            changePeriod={changePeriod}
            hasFilteredObligated={hasFilteredObligated} />
    );
};

AccountTimeVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.account.filters,
        account: state.account.account
    }),
    (dispatch) => bindActionCreators(accountFilterActions, dispatch)
)(AccountTimeVisualizationSectionContainer);
