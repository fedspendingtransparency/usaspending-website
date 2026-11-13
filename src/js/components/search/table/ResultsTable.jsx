/**
  * ResultsTable.jsx
  * Created by Kevin Li 11/8/16
  **/

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination, Table } from 'data-transparency-ui';
import ResultsTableRow from 'models/v2/search/ResultsTableRow';

const propTypes = {
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
    federalAccountPage: PropTypes.bool,
    referenceData: PropTypes.array
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
    // eslint-disable-next-line no-unused-vars
    const [windowHeight, setWindowHeight] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [tableHeight, setTableHeight] = useState(0);

    // eslint-disable-next-line no-unused-vars
    const [activateRightFade, setActivateRightFade] = useState(!isMobile);

    const measureHeight = () => {
        const tableHeightlocal = document.getElementById("advanced-search__table-wrapper").offsetHeight;
        setTableHeight(tableHeightlocal);
        setWindowHeight(window.innerHeight);
    };

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

    const prepareDTUIRows = () => {
        // limit = 10
        // page = 1, need 0-9
        // page = 2, need 10 - 19 etc
        // (page * limit) - 1 end
        // (page - 1) * limit start
        const arrayOfObjects = results;
        let values;

        // check for prime awards && loans
        if (
            spendingLevel === 'awards' ||
            federalAccountPage === true
        ) {
            if (currentType === "loans") {
                values = arrayOfObjects.map((obj) => {
                    const loanrow = Object.create(ResultsTableRow);
                    loanrow.populateLoan(obj);
                    return Object.values(loanrow);
                });
                return values;
            }
            else if (currentType === "direct_payments") {
                values = arrayOfObjects.map((obj) => {
                    const directPaymentRow = Object.create(ResultsTableRow);
                    directPaymentRow.populateDirectPayment(obj);
                    return Object.values(directPaymentRow);
                });
                return values;
            }

            // grants and other
            else if (currentType === "grants" || currentType === "other") {
                values = arrayOfObjects.map((obj) => {
                    const grantRow = Object.create(ResultsTableRow);
                    grantRow.populateGrant(obj);
                    return Object.values(grantRow);
                });

                return values;
            }

            // contracts and contract idvs
            values = arrayOfObjects.map((obj) => {
                const contractRow = Object.create(ResultsTableRow);
                contractRow.populateContract(obj);
                return Object.values(contractRow);
            });
            return values;
        }

        // check for transactions
        else if (spendingLevel === 'transactions') {
            // check for contract or contract idv
            if (
                currentType === "transaction_contracts" ||
                currentType === "transaction_idvs" ||
                currentType === "contracts"
            ) {
                values = arrayOfObjects.map((obj) => {
                    const transactionContractRow = Object.create(ResultsTableRow);
                    transactionContractRow.populateTransactionContract(obj);
                    return Object.values(transactionContractRow);
                });
            }
            else {
                values = arrayOfObjects.map((obj) => {
                    const transactionContractRow = Object.create(ResultsTableRow);
                    transactionContractRow.populateTransactionDefault(obj);
                    return Object.values(transactionContractRow);
                });
            }

            return values;
        }

        // subaward
        // TODO: i have a feeling this will need to be adjusted in the future for some group by options for subawards
        // the same may be true for transactions
        if (
            currentType === "subcontracts" ||
            (
                columnType === "subawards" &&
                (
                    currentType === "contracts" || currentType === "idvs"
                )
            )) {
            values = arrayOfObjects.map((obj) => {
                const subcontractRow = Object.create(ResultsTableRow);
                subcontractRow.populateSubcontract(obj);
                return Object.values(subcontractRow);
            });
        }

        else {
            values = arrayOfObjects.map((obj) => {
                const defaultRow = Object.create(ResultsTableRow);
                defaultRow.populateDefault(obj);
                return Object.values(defaultRow);
            });
        }

        return values;
    };

    useEffect(() => {
        measureHeight();
        window.addEventListener('resize', measureHeight);
        return () => window.removeEventListener('resize', measureHeight);
    }, []);

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
                    rows={prepareDTUIRows()}
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
