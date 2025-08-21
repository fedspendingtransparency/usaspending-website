/**
 * NestedTanStackTable.jsx
 * Created by JD House July 2, 2025
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { uniqueId, throttle } from 'lodash';
import { ErrorMessage, LoadingMessage, NoResultsMessage } from "data-transparency-ui";
import ResultsTable from '../ResultsTable';
import { getNestedTableData } from '../../../../helpers/search/table/tableUtilsHelper';

const propTypes = {
    columnType: PropTypes.string,
    awardId: PropTypes.string,
    filters: PropTypes.object,
    screenReaderCaption: PropTypes.string,
    highlightedColumns: PropTypes.object
};

const NestedAwardTable = (props) => {
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

        // indicate the request is about to start
        setIsLoading(true);
        setError(false);

        const paramsOptions = {
            subSort,
            subPage,
            subResultsLimit
        };

        searchRequest = getNestedTableData(props.columnType, props.awardId, props.filters, paramsOptions);

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
            {props.title && <span className="table-title">{props.title}</span>}
            {props.subTitle && (
                <>
                    <br />
                    <span className="table-subTitle">{props.subTitle}</span>
                </>
            )}
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

NestedAwardTable.propTypes = propTypes;

export default NestedAwardTable;

