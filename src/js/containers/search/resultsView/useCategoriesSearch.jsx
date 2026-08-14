import React from "react";
import { useQuery } from "@tanstack/react-query";

import { areFiltersEqual, performSpendingByCategorySearch } from "../../../helpers/searchHelper";
import SearchAwardsOperation from "../../../models/v1/search/SearchAwardsOperation";
import { categoryNames } from "../../../dataMapping/search/spendingByCategory";
import BaseSpendingByCategoryResult from "../../../models/v2/search/visualizations/rank/BaseSpendingByCategoryResult";

// TODO: replace getSpendingLevel with just spendingLevel once ready to release transactions
const getSpendingLevel = (spendingLevel) => {
    if (spendingLevel === "subawards") {
        return spendingLevel;
    }
    return "transactions";
};

// TODO: analytics
const onClickHandler = (linkName) => {
    // Analytics.event({
    //     category: `Section ${props.wrapperProps.sectionName}: ${props.wrapperProps.selectedDropdownOption}`,
    //     action: `Clicked ${linkName}`
    // });
};


const parseData = (data, scope, spendingLevel) => {
    const labelSeries = [];
    const dataSeries = [];
    const descriptions = [];
    const linkSeries = [];
    const tableData = [];

    if (!data) return {
        labelSeries,
        dataSeries,
        descriptions,
        linkSeries,
        tableData,
        next: '',
        previous: '',
        hasNextPage: false,
        hasPreviousPage: false
    }

    // iterate through each response object and break it up into groups, x series, and y series
    data.results.forEach((item) => {
        const tableDataRow = [];
        const result = Object.create(BaseSpendingByCategoryResult);
        result.populate(item);

        if (scope === 'awarding_agency' || scope === 'awarding_subagency') {
            result.nameTemplate = (code, name) => {
                if (code) {
                    return `${name} (${code})`;
                }
                return name;
            };
        }

        if (scope === 'recipient') {
            result.nameTemplate = (code, name) => name;
        }

        labelSeries.push(result.name);
        dataSeries.push(result._amount);

        if (scope === 'recipient' && spendingLevel !== 'subawards') {
            const recipientLink = result.recipientId ?
                `recipient/${result.recipientId}/latest`
                :
                '';

            linkSeries.push(recipientLink);

            if (recipientLink !== "") {
                tableDataRow.name = {
                    value: (
                        <a
                            href={recipientLink}
                            onClick={() => {
                                onClickHandler(result.name);
                            }}>
                            {result.name}
                        </a>
                    ),
                    title: result.name
                };
            }
            else {
                tableDataRow.name = (result.name);
            }
        }
        else if (scope === 'awarding_agency' && spendingLevel !== 'subawards') {
            const awardingLink = `agency/${result._agencySlug}`;
            linkSeries.push(awardingLink);
            tableDataRow.name = {
                value: (
                    <a
                        href={awardingLink}
                        onClick={() => {
                            onClickHandler(result.name);
                        }} >
                        {result.name}
                    </a>),
                title: result.name
            };
        }
        else {
            tableDataRow.name = {
                value: result.name,
                title: result.name
            };
        }

        tableDataRow.obligations = result._amount;
        const description = `Spending by ${result.name}: ${result.amount}`;
        descriptions.push(description);
        tableData.push(tableDataRow);
    });

    return {
        labelSeries,
        dataSeries,
        descriptions,
        linkSeries,
        tableData,
        next: data.page_metadata.next,
        previous: data.page_metadata.previous,
        hasNextPage: data.page_metadata.hasNext,
        hasPreviousPage: data.page_metadata.hasPrevious
    }
};

const useCategoriesSearch = (
    spendingBy,
    reduxFilters,
    spendingLevel,
    category,
    page
) => {
    const auditTrail = `${categoryNames[spendingBy]} Rank Visualization`;

    // Create Search Operation
    const operation = new SearchAwardsOperation();
    operation.fromState(reduxFilters);

    // if subawards is true, newAwardsOnly cannot be true, so we remove
    // dateType for this request
    if (spendingLevel === 'subawards' && operation.dateType) {
        delete operation.dateType;
    }

    const apiSearchParams = operation.toParams();

    // generate the API parameters
    const apiParams = {
        category,
        filters: apiSearchParams,
        limit: 10,
        page,
        auditTrail,
        spending_level: getSpendingLevel(spendingLevel)
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['performSpendingByCategorySearch', apiParams],
        queryFn: () => performSpendingByCategorySearch(apiParams).promise,
        enabled: !areFiltersEqual(reduxFilters)
    })

    const parsedData = parseData(data?.data, category, spendingLevel)

    return { loading: isLoading, error, ...parsedData };
}

export default useCategoriesSearch;
