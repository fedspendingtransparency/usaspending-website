/**
  * ResultsTable.jsx
  * Created by Kevin Li 11/8/16
  **/

import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Pagination, Table } from 'data-transparency-ui';
import BaseLoanRow from 'models/v2/search/resultsTable/BaseLoanRow';
import BaseDirectPaymentRow from 'models/v2/search/resultsTable/BaseDirectPaymentRow';
import BaseGrantRow from 'models/v2/search/resultsTable/BaseGrantRow';
import BaseContractRow from 'models/v2/search/resultsTable/BaseContractRow';
import BaseTransactionContractRow from 'models/v2/search/resultsTable/BaseTransactionContractRow';
import BaseTransactionDefaultRow from 'models/v2/search/resultsTable/BaseTransactionDefaultRow';
import BaseSubcontractRow from 'models/v2/search/resultsTable/BaseSubcontractRow';
import BaseSubawardDefaultRow from 'models/v2/search/resultsTable/BaseSubawardDefaultRow';

const propTypes = {
    results: PropTypes.array,
    columns: PropTypes.object,
    visibleWidth: PropTypes.number,
    loadNextPage: PropTypes.func,
    spendingLevel: PropTypes.string,
    tableInstance: PropTypes.string,
    sort: PropTypes.object,
    updateSort: PropTypes.func,
    awardIdClick: PropTypes.func,
    subAwardIdClick: PropTypes.func,
    page: PropTypes.number,
    setPage: PropTypes.func,
    setResultLimit: PropTypes.func,
    total: PropTypes.number,
    isMobile: PropTypes.bool,
    federalAccountPage: PropTypes.bool
};

const ResultsTable = ({
    results,
    columns,
    spendingLevel,
    sort,
    updateSort,
    page,
    setPage,
    setResultLimit,
    isMobile,
    federalAccountPage,
    currentType,
    columnType,
    resultsCount,
    resultsLimit
}) => {
    const isNLSearchActive = useSelector((state) => state.sidebar.isSearchActive);

    // // eslint-disable-next-line no-unused-vars
    // const [windowHeight, setWindowHeight] = useState(0);
    // // eslint-disable-next-line no-unused-vars
    // const [tableHeight, setTableHeight] = useState(0);

    // eslint-disable-next-line no-unused-vars
    const [activateRightFade, setActivateRightFade] = useState(!isMobile);
    //
    // const measureHeight = () => {
    //     const tableHeightlocal = document.getElementById('advanced-search__table-wrapper').offsetHeight;
    //     setTableHeight(tableHeightlocal);
    //     setWindowHeight(window.innerHeight);
    // };

    const prepareDTUIColumns = () => {
        const columnOrder = columns.visibleOrder;
        const orderedColumns = columnOrder.map((columnTitle) => columns.data[columnTitle]);

        // the columns passed in don't have the right properties, if we
        // don't do this sort won't work
        return orderedColumns.map((col) => ({
            title: col.columnName,
            displayName: col.displayName,
            columnWidth: col.width,
            right: col.right || false
        }));
    };

    const getRowModel = () => {
        // prime awards
        if (spendingLevel === 'awards' || federalAccountPage === true) {
            if (currentType === 'loans') return BaseLoanRow;
            if (currentType === 'direct_payments') return BaseDirectPaymentRow;
            if (currentType === 'grants' || currentType === 'other') return BaseGrantRow;
            // contracts and contract idvs
            return BaseContractRow;
        }

        if (spendingLevel === 'transactions') {
            if (
                currentType === 'transaction_contracts' ||
                currentType === 'transaction_idvs' ||
                currentType === 'contracts'
            ) {
                return BaseTransactionContractRow;
            }
            return BaseTransactionDefaultRow;
        }

        // subaward
        // TODO: i have a feeling this will need to be adjusted in the future for some group by options for subawards
        // the same may be true for transactions
        if (
            currentType === 'subcontracts' ||
            (
                columnType === 'subawards' &&
                (currentType === 'contracts' || currentType === 'idvs')
            )
        ) {
            return BaseSubcontractRow;
        }
        return BaseSubawardDefaultRow;
    };

    const rows = useMemo(() => {
        const RowModel = getRowModel();
        return results.map((obj) => {
            const row = Object.create(RowModel);
            row.populate(obj, isNLSearchActive);
            return Object.values(row);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [results, spendingLevel, currentType, columnType, federalAccountPage, isNLSearchActive]);

    // useEffect(() => {
    //     measureHeight();
    //     window.addEventListener('resize', measureHeight);
    //     return () => window.removeEventListener('resize', measureHeight);
    // }, []);

    useEffect(() => {
        if (isMobile) {
            setActivateRightFade(false);
        }
        else {
            setActivateRightFade(true);
        }
    }, [isMobile]);

    // for table height take the height of the viewport
    // subtract the sticky header part on the top of the page
    // tab height for the tables
    // 16 pixel space between the tabs
    // pagination on the bottom, so you can actually see the pages

    return (
        <>
            <div
                className="advanced-search__table-wrapper"
                id="advanced-search__table-wrapper">
                <Table
                    classNames="table-for-new-search-page award-results-table-dtui"
                    stickyFirstColumn={!isMobile}
                    columns={prepareDTUIColumns()}
                    rows={rows}
                    rowHeight={isMobile ? null : 58}
                    headerRowHeight={45}
                    highlightedColumns={spendingLevel === 'subawards' ?
                        {
                            standardColumns: 9,
                            highlightedColumns: currentType === 'subcontracts' ? 7 : 6
                        } :
                        null}
                    currentSort={sort}
                    updateSort={updateSort}
                    isMobile={isMobile}
                    isStacked
                    newMobileView />

            </div>
            <Pagination
                resultsText
                limitSelector
                hideLast={resultsCount >= 50000}
                currentPage={page}
                pageSize={resultsLimit}
                changePage={setPage}
                changeLimit={setResultLimit}
                totalItems={resultsCount} />
        </>
    );
};

ResultsTable.propTypes = propTypes;
export default ResultsTable;
