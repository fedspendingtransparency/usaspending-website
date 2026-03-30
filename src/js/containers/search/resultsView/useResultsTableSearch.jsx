import React from "react";
import { useQuery } from "@tanstack/react-query";
import { intersection } from 'lodash-es';

import { performSpendingByAwardSearch } from "helpers/searchHelper";
import { measureTableHeader } from 'helpers/textMeasurement';
import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import {
    awardTypeGroups, subawardTypeGroups
} from 'dataMapping/search/awardType';
import { tableTypes, subTypes, transactionTypes } from 'dataMapping/search/resultsView/table';
import { defaultColumns, apiFieldByTableColumnName } from 'dataMapping/search/awardTableColumns';

const getAwardTypeGroup = (spendingLevel, tableType, awardType) => {
    // generate an array of award type codes representing the current table tab we're showing
    // and use a different mapping if we're showing a subaward table vs a prime award table
    const awardTypeGroup = spendingLevel === "subaward" ?
        subawardTypeGroups[tableType] :
        awardTypeGroups[tableType];

    if (awardType.length === 0) {
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

const createColumn = (col) => {
    // create an object that integrates with the expected column data structure used by
    // the table component

    // BODGE: Temporarily only allow descending columns
    const direction = 'desc';
    const width = col.customWidth || measureTableHeader(col.displayName || col.title);

    return {
        columnName: col.title,
        displayName: col.displayName || col.title,
        subtitle: col.subtitle || '',
        width,
        background: col.background || '',
        defaultDirection: direction,
        right: col.right || false
    };
};

const getColumns = () => tableTypes
    .concat(subTypes)
    .concat(transactionTypes)
    .reduce((cols, type) => {
        const visibleColumns = defaultColumns(type.internal).map((data) => data.title);
        const parsedColumns = defaultColumns(type.internal)
            .reduce((parsedCols, data) => Object.assign({}, parsedCols, {
                [data.title]: createColumn(data)
            }), {});

        return Object.assign(cols, {
            [type.internal]: {
                visibleOrder: visibleColumns,
                data: parsedColumns
            }
        });
    }, {});

const getFields = (tableType) => {
    const columns = getColumns();
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

// const getSort = (searchOrder) => {
//     // parse the redux search order into the API-consumable format
//     let sort = searchOrder.field;
//     let order = searchOrder.direction;

//     if (!searchOrder.direction) {
//         order = 'desc';
//     }

//     if (searchOrder?.field === 'Action Date') {
//         sort = 'Sub-Award Date';
//     }

//     return { sort, order };
// };

const useResultsTableSearch = (filters, tableType, spendingLevel, page = 1, searchOrder) => {
    const searchFilters = new SearchAwardsOperation();

    // get initial searchParams from state
    searchFilters.fromState(filters);

    // if subawards is true, newAwardsOnly cannot be true, so we remove
    // dateType for this request; also has to be done for the tabCounts request
    if (spendingLevel === "subaward" && searchFilters.dateType) {
        delete searchFilters.dateType;
    }

    searchFilters.awardType = getAwardTypeGroup(spendingLevel, tableType, filters.awardType);

    const fields = getFields(tableType);

    // const { sort, order } = getSort(searchOrder);

    const params = {
        auditTrail: 'Results Table - Spending by award search',
        fields,
        filters: searchFilters.toParams(),
        limit: 10,
        order: "desc",
        page,
        sort: "Award Amount",
        spending_level: spendingLevel
    };

    const {
        data, isSuccess, isLoading, error
    } = useQuery({
        queryKey: ['resultsTableData'],
        queryFn: () => performSpendingByAwardSearch(params).promise,
        staleTime: 60000
    });

    return {
        data, isSuccess, isLoading, error
    };
};

export default useResultsTableSearch;
