/**
 * NestedTanStackTable.jsx
 * Created by JD House July 2, 2025
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import { isCancel } from 'axios';
import * as SearchHelper from 'helpers/searchHelper';
import { performKeywordSearch } from 'helpers/keywordHelper';
import { subawardTypeGroups, transactionTypeGroups } from 'dataMapping/search/awardType';
import { uniqueId, throttle } from 'lodash';
import { ErrorMessage, LoadingMessage, NoResultsMessage } from "data-transparency-ui";
import ResultsTable from '../ResultsTable';

const propTypes = {
    columnType: PropTypes.string,
    awardId: PropTypes.string,
    filters: PropTypes.object,
    screenReaderCaption: PropTypes.string,
    highlightedColumns: PropTypes.object
};

const NestedTanStackTable = (props) => {
    const [subData, setSubData] = useState([]);
    const [subColumns, setSubColumns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [subSort, setSubSort] = useState({
        field: props.columnType === "subawards" ? "Sub-Award Amount" : "Transaction Amount",
        direction: 'desc'
    });
    const [subPage, setSubPage] = useState(props.page);
    const [subResultsLimit, setSubResultsLimit] = useState(props.resultsLimit);
    let columnSubType = props.currentType;
    let searchRequest = null;

    // consider pull out to helper fileor up to Container lv
    const getSubData = () => {
        if (searchRequest) {
            // a request is currently in-flight, cancel it
            searchRequest.cancel();
        }

        // get searchParams from state
        const searchParamsTemp = new SearchAwardsOperation();
        searchParamsTemp.fromState(props.filters);

        // indicate the request is about to start
        setIsLoading(true);
        setError(false);

        const requestFields = [
            "Sub-Award ID",
            "Sub-Awardee Name",
            "Sub-Award Amount",
            "Sub-Award Date",
            "Sub-Award Description",
            "Sub-Recipient UEI",
            "Sub-Recipient Location",
            "Sub-Award Primary Place of Performance",
            "Sub-Award Type",
            "Prime Award ID",
            "Prime Recipient Name",
            "Prime Award Recipient UEI",
            "Awarding Agency",
            "Awarding Sub Agency",
            "NAICS",
            "PSC",
            "recipient_id",
            "prime_award_recipient_id"
        ];

        // needs to be dynamic but for now we will go with defaults
        searchParamsTemp.awardType = props.columnType === "subawards" ?
            subawardTypeGroups.subcontracts :
            transactionTypeGroups.transaction_contracts;

        const newFilters = searchParamsTemp;
        if (!Object.prototype.hasOwnProperty.call(newFilters, "selectedAwardIDs")) {
            newFilters.selectedAwardIDs = [];
        }
        newFilters.selectedAwardIDs.push(props.awardId);

        const params = {
            filters: newFilters.toParams(),
            fields: requestFields,
            page: subPage,
            limit: subResultsLimit,
            sort: subSort.field,
            order: subSort.direction,
            subawards: true,
            auditTrail: 'Results Table - Spending by award search'
        };

        // Set the params needed for download API call
        if (!params.filters.award_type_codes) {
            return null;
        }

        if (props.columnType === "transactions") {
            params.fields = [
                "Award ID",
                "Mod",
                "Recipient Name",
                "Transaction Amount",
                "Action Date",
                "Transaction Description",
                "Action Type",
                "Award Type",
                "Recipient UEI",
                "Recipient Location",
                "Primary Place of Performance",
                "Awarding Agency",
                "awarding_agency_id",
                "recipient_id",
                "Awarding Sub Agency",
                "NAICS",
                "PSC",
                "Assistance Listing"
            ];

            searchRequest = performKeywordSearch(params);
        }
        else {
            searchRequest = SearchHelper.performSpendingByAwardSearch(params);
        }

        return searchRequest.promise
            .then((res) => {
                const newState = {
                    inFlight: false
                };

                const parsedResults = res.data.results.map((result) => ({
                    ...result,
                    generated_internal_id: encodeURIComponent(result.generated_internal_id)
                }));

                // don't clear records if we're appending (not the first page)
                newState.tableInstance = `${uniqueId()}`;
                newState.results = parsedResults;

                // request is done
                searchRequest = null;
                newState.page = res.data.page_metadata.page;
                newState.lastPage = !res.data.page_metadata.hasNext;
                setSubPage(newState.page);
                setSubData(newState.results);
                setIsLoading(false);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    setError(true);
                    setIsLoading(false);
                    console.log(err);
                }
            });
    };

    // need to pull out of here to helper or up to Container lv
    const updateSort = (field, direction) => {
        if (field === 'Action Date' && props.columnType !== 'transactions') {
            setSubSort(Object.assign({
                field: 'Sub-Award Date',
                direction
            }));
        }
        else {
            setSubSort(Object.assign({
                field,
                direction
            }));
        }
    };

    useEffect(throttle(() => {
        // need to pull out of here to helper or up to Container lv
        if (props.columnType === "subawards") {
            if (props.currentType === "grants") {
                columnSubType = 'subgrants';
            }
            columnSubType = 'subcontracts';
        }
        else {
            columnSubType = [`transaction_${props.currentType}`];
        }
        setSubColumns(props.subColumnOptions[columnSubType]);
        getSubData();

        return () => {
            if (searchRequest) {
                // a request is currently in-flight, cancel it
                searchRequest.cancel();
            }
        };
    }, 400), [props.awardId, subSort, subPage, subResultsLimit]);

    if (isLoading) {
        return <LoadingMessage />;
    }
    else if (error) {
        return <ErrorMessage />;
    }
    else if (subData.length <= 0) {
        return <NoResultsMessage />;
    }

    return (
        <>
            <span className="table-title">{props.awardId}</span>
            <br />
            <span className="table-subTitle">{`${props.columnType === "subawards" ? 'Subawards' : 'Transacitions'} that match search criteria`}</span>

            <ResultsTable
                {...props}
                results={subData}
                currentType={columnSubType}
                spendingLevel={props.columnType}
                columns={subColumns}
                isLoading={isLoading}
                error={error}
                resultsCount={props.resultsCount}
                updateSort={updateSort}
                sort={subSort}
                page={subPage}
                setPage={setSubPage}
                resultsLimit={subResultsLimit}
                setResultLimit={setSubResultsLimit} />
        </>
    );
};

NestedTanStackTable.propTypes = propTypes;

export default NestedTanStackTable;

