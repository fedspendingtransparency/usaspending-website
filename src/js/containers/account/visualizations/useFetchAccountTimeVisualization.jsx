import {useMemo, useRef} from "react";
import { useQueries } from "@tanstack/react-query";
import { Iterable, Record } from "immutable";
import { is as immutableIs } from "immutable/dist/immutable";
import { isEqual } from "lodash-es";

import AccountSearchBalanceOperation from "../../../models/v1/account/queries/AccountSearchBalanceOperation";
import {
    balanceFields,
    balanceFieldsFiltered,
    balanceFieldsNonfiltered
} from "../../../dataMapping/accounts/accountFields";
import { fetchTasBalanceTotals, fetchTasCategoryTotals } from "../../../helpers/accountQuartersHelper";
import { initialState } from "../../../redux/reducers/account/accountReducer"
import AccountSearchCategoryOperation from "../../../models/v1/account/queries/AccountSearchCategoryOperation";

const group = [
    'submission__reporting_fiscal_year',
    'submission__reporting_fiscal_quarter'
];

const order = ['submission__reporting_fiscal_year'];

const aggregate = 'sum';

const valuesAreEqual = (a, b) => {

    if(Iterable.isIterable(a) || Iterable.isIterable(b)) {
        return immutableIs(a, b);
    }

    return isEqual(a, b);
}

const responseHasData = (res) => res.some(({ data }) => data);

const areFiltersEmpty = (filters = initialState.filters, filterReference = initialState.filters) => {
    if (!filterReference && filters) return false;

    const referenceObject = {...filterReference};
    const comparisonObject = {...filters};

    // we need to iterate through each of the filter Redux keys in order to perform equality
    // comparisons on Immutable children (via the Immutable is() function)
    const immutableFilterKeys = Object
        .keys(comparisonObject)

    for (const key of immutableFilterKeys) {
        const unfilteredValue = comparisonObject[key];
        const currentValue = referenceObject[key];
        if (!valuesAreEqual(unfilteredValue, currentValue)) {
            return false;
        }
    }

    return true;
};

const VisData = Record({
    xSeries: [],
    ySeries: [],
    allY: [],
    stacks: []
});

const parseBalances = (res, visualizationPeriod, hasFilteredObligated, ref) => {
    const xSeries = [];
    const ySeries = [];
    const allY = [];
    const yData = {};
    const groupLabels = [];

    if (!responseHasData(res)) return new VisData();

    res.forEach(({ data, type }) => {
        data?.results.forEach((group) => {
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

    if (ref.current === null) {
        ref.current = Object.fromEntries(groupLabels
            .map((key) => [key.replace(/\s/g, ''), 0]));
    }

    groupLabels.forEach((group) => {
        xSeries.push(`${group}`);
        if (hasFilteredObligated) {
            const { unobligated, obligatedFiltered, outlay, budgetAuthority } = yData[group];

            // Calculate Obligated (Other)
            const totalObligations = budgetAuthority - unobligated;

            const obligatedOther = budgetAuthority - obligatedFiltered - unobligated;

            const period = {
                obligatedFiltered: {
                    bottom: 0,
                    top: obligatedFiltered,
                    value: obligatedFiltered,
                    description: 'Obligations Incurred (Filtered)'
                },
                obligatedOther: {
                    bottom: obligatedFiltered,
                    top: totalObligations,
                    value: obligatedOther,
                    description: 'Obligations Incurred (Other)'
                },
                unobligated: {
                    bottom: totalObligations,
                    top: totalObligations + unobligated,
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

            if (ref.current?.[group.replace(/\s/g, '')]) {
                ref.current[group.replace(/\s/g, '')] = {
                    budgetAuthority: yData[group].budgetAuthority,
                    totalObligations: yData[group].obligated
                };
            }
            else {
                ref.current = {
                    ...ref.current,
                    [group.replace(/\s/g, '')]: {
                        budgetAuthority: yData[group].budgetAuthority,
                        totalObligations: yData[group].obligated
                    }
                };
            }

            ySeries.push(period);
            allY.push(yData[group].obligated);
        }
        let baToPush = yData[group].budgetAuthority;
        if (ref.current) {
            baToPush = ref.current[group.replace(/\s/g, '')]?.budgetAuthority;
        }
        allY.push(yData[group].outlay);
        allY.push(baToPush);
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
    return new VisData({
        xSeries,
        ySeries,
        allY,
        stacks
    })
};

export default  (id, reduxFilters, visualizationPeriod, hasFilteredObligated) => {
    const searchOperation = new AccountSearchBalanceOperation(id);
    searchOperation.fromState(reduxFilters);
    const balanceFilters = searchOperation.toParams();

    const categorySearchOperation = new AccountSearchCategoryOperation(id);
    categorySearchOperation.fromState(reduxFilters);
    const categoryFilters = categorySearchOperation.toParams();

    const quarterCategory = useQueries({
        queries: Object.keys(balanceFieldsFiltered).map((balanceType) => {
            return {
                queryKey: [
                    'fetchTasCategoryTotals',
                    balanceType,
                    hasFilteredObligated,
                    visualizationPeriod,
                    categoryFilters
                ],
                queryFn: () => fetchTasCategoryTotals({
                    filters: categoryFilters,
                    group,
                    field: balanceFieldsFiltered[balanceType],
                    aggregate,
                    order,
                    auditTrail: `Spending over Time (quarters) - obligated filter - ${balanceType}`
                }).promise,
                enabled: visualizationPeriod === 'quarter' && !emptyFilters && hasFilteredObligated
            }
        }),
        combine: (result) => ({
            result: result.map((query, i) => ({
                data: query.data?.data,
                type: Object.keys(balanceFieldsFiltered)[i]
            })),
            isLoading: result.some((query) => query.isLoading),
            isError: result.some((query) => query.isError)
        })
    })

    const emptyFilters = areFiltersEmpty(reduxFilters);

    const quarterFields = hasFilteredObligated ? balanceFieldsNonfiltered : balanceFields;

    const quarterBalance = useQueries({
        queries: Object.keys(quarterFields).map((balanceType) => {
            return {
                queryKey: [
                    'fetchTasBalanceTotals',
                    balanceType,
                    visualizationPeriod,
                    hasFilteredObligated,
                    balanceFilters
                ],
                queryFn: () => fetchTasBalanceTotals({
                    filters: balanceFilters,
                    group,
                    field: quarterFields[balanceType],
                    aggregate,
                    order,
                    auditTrail: `Spending over Time (quarters) - ${
                        hasFilteredObligated ? '' : 'non-'
                    }obligated filter - ${balanceType}`
                }).promise,
                enabled: visualizationPeriod === 'quarter' && !emptyFilters
            }
        }),
        combine: (result) => ({
            result: result.map((query, i) => ({
                data: query.data?.data,
                type: Object.keys(quarterFields)[i]
            })),
            isLoading: result.some((query) => query.isLoading),
            isError: result.some((query) => query.isError)
        })
    })

    const ref = useRef(null);

    const result = useMemo(() => {
        let combinedResult = [];

        if (responseHasData(quarterCategory.result)) combinedResult = [...quarterCategory.result];
        if (responseHasData(quarterBalance.result)) combinedResult = [...combinedResult, ...quarterBalance.result];

        return parseBalances(combinedResult, visualizationPeriod, hasFilteredObligated, ref);
    }, [quarterCategory.result, quarterBalance.result, visualizationPeriod, hasFilteredObligated]);
    
    const loading = useMemo(() => {
        return quarterCategory.isLoading || quarterBalance.isLoading
    }, [quarterBalance.isLoading, quarterCategory.isLoading])
    
    const error = useMemo(() => {
        return quarterCategory.isError || quarterBalance.isError
    },  [quarterBalance.isError, quarterCategory.isError])

    return { result, loading, error };
}