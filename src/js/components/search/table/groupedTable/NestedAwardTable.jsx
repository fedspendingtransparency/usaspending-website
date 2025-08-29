/**
 * NestedTanStackTable.jsx
 * Created by JD House July 2, 2025
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { throttle } from 'lodash-es';
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
    const getSubData = async () => {
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

        searchRequest = await getNestedTableData(
            props.columnType,
            props.awardId,
            props.filters,
            paramsOptions
        );

        return searchRequest.promise
            .then((res) => {
                const parsedResults = res.data.results.map((result) => ({
                    ...result,
                    generated_internal_id: encodeURIComponent(result.generated_internal_id)
                }));

                // request is done
                searchRequest = null;
                setSubPage(res.data.page_metadata.page);
                setSubData(parsedResults);
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

    const formattedSubSort = () => {
        const formattedSort = subSort;
        if (formattedSort?.field === 'Sub-Award Date') {
            formattedSort.field = "Action Date";
        }

        return formattedSort;
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
                sort={formattedSubSort()}
                page={subPage}
                setPage={setSubPage}
                resultsLimit={subResultsLimit}
                setResultLimit={setSubResultsLimit} />
        </>
    );
};

NestedAwardTable.propTypes = propTypes;

export default NestedAwardTable;

