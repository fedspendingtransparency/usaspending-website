// eslint-disable-next-line no-unused-vars
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { intersection, uniqueId } from 'lodash-es';

import {
    performSpendingByAwardSearch, performSpendingBySubawardGrouped
} from "helpers/searchHelper";
import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import {
    awardTypeGroups, subawardTypeGroups
} from 'dataMapping/search/awardType';
import { apiFieldByTableColumnName } from 'dataMapping/search/awardTableColumns';

const getAwardTypeGroup = (spendingLevel, tableType, awardType) => {
    // generate an array of award type codes representing the current table tab we're showing
    // and use a different mapping if we're showing a subaward table vs a prime award table
    const awardTypeGroup = spendingLevel === "subawards" ?
        subawardTypeGroups[tableType] :
        awardTypeGroups[tableType];

    if (awardType.size === 0) {
        return awardTypeGroup;
    }

    let intersectingTypes = intersection(awardTypeGroup, awardType);
    if (!intersectingTypes || intersectingTypes.length === 0) {
        // the filtered types and the table type do not align
        // in this case, send an array of non-existent types because the endpoint requires
        // an award type parameter
        intersectingTypes = ['no intersection'];
    }
    return intersectingTypes;
};

const getFields = (tableType, columns) => {
    const fields = [];

    // Request fields for visible columns only
    const columnVisibility = columns[tableType]?.visibleOrder;
    if (!columnVisibility) {
        return null;
    }

    columnVisibility.forEach((field) => {
        if (!fields.includes(field) && field !== "Action Date") {
            // Prevent duplicates in the list of fields to request
            if (Object.keys(apiFieldByTableColumnName).includes(field)) {
                fields.push(apiFieldByTableColumnName[field]);
            }
            else {
                fields.push(field);
            }
        }
        else if (field === "Action Date") {
            fields.push('Sub-Award Date');
        }
    });

    fields.push('recipient_id', 'prime_award_recipient_id');

    return fields;
};

const getSortOrder = (searchOrder, grouped) => {
    // parse the redux search order into the API-consumable format
    let sort = searchOrder?.field;
    let order = searchOrder?.direction;

    if (!order) order = 'desc';

    if (sort === 'Action Date') sort = 'Sub-Award Date';

    if (grouped) sort = 'award_id';

    return { sort, order };
};

const useResultsTableSearch = (
    searchFilters, tableType, spendingLevel, limit, searchOrder, grouped, page, columns
) => {
    const fields = getFields(tableType, columns);

    const { sort, order } = getSortOrder(searchOrder, grouped);

    const filtersTemp = new SearchAwardsOperation();

    // get initial searchParams from state
    filtersTemp.fromState(searchFilters);

    // if subawards is true, newAwardsOnly cannot be true, so we remove
    // dateType for this request; also has to be done for the tabCounts request
    if (spendingLevel === "subaward" && filtersTemp.dateType) {
        delete filtersTemp.dateType;
    }

    filtersTemp.awardType = getAwardTypeGroup(
        spendingLevel, tableType, searchFilters.awardType
    );

    const filters = filtersTemp.toParams();

    const params = {
        auditTrail: 'Results Table - Spending by award search',
        filters,
        limit,
        order,
        page,
        sort
    };

    const {
        isPending, error, data
    } = useQuery({
        queryKey: [
            'resultsTableData',
            limit,
            page,
            sort,
            order,
            spendingLevel,
            grouped,
            tableType,
            searchFilters
        ],
        queryFn: () => {
            if (grouped) {
                return performSpendingBySubawardGrouped(params).promise;
            }

            return performSpendingByAwardSearch({
                ...params,
                fields,
                spending_level: spendingLevel
            }).promise;
        },
        staleTime: 60000,
        refetchOnWindowFocus: false,
        enabled: !!filtersTemp.awardType
    });

    const results = data?.data ?
        data?.data.results.map((result) => ({
            ...result,
            generated_internal_id: encodeURIComponent(result.generated_internal_id)
        })) :
        [];

    return {
        isLoading: isPending,
        error,
        results,
        total: results?.length,
        tableInstance: uniqueId(),
        page: data?.data?.page_metadata.page,
        lastPage: !data?.data?.page_metadata.hasNext
    };
};

export default useResultsTableSearch;
