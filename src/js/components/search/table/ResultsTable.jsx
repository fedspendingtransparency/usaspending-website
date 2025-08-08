/**
  * ResultsTable.jsx
  * Created by Kevin Li 11/8/16
  **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import ResultsTableRow from '../../../models/v2/search/ResultsTableRow';

const propTypes = {
    results: PropTypes.array,
    columns: PropTypes.object,
    visibleWidth: PropTypes.number,
    loadNextPage: PropTypes.func,
    subaward: PropTypes.bool,
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

const ResultsTable = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [windowHeight, setWindowHeight] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [tableHeight, setTableHeight] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [activateRightFade, setActivateRightFade] = useState(!props.isMobile);

    const measureHeight = () => {
        const tableHeightlocal = document.getElementById("advanced-search__table-wrapper").offsetHeight;
        setTableHeight(tableHeightlocal);
        setWindowHeight(window.innerHeight);
    };
    const prepareDTUIColumns = () => {
        const columnOrder = props.columns.visibleOrder;
        const orderedColumns = columnOrder.map((columnTitle) => {
            const column = props.columns.data[columnTitle];
            return column;
        });

        // the columns passed in don't have the right properties, if we
        // don't do this sort won't work
        const columns = orderedColumns.map((col) => ({
            title: col.columnName,
            displayName: col.displayName,
            columnWidth: col.width,
            right: col.right || false
        }));
        return columns;
    };
    const prepareDTUIRows = () => {
        // limit = 10
        // page = 1, need 0-9
        // page = 2, need 10 - 19 etc
        // (page * limit) - 1 end
        // (page - 1) * limit start
        const arrayOfObjects = props.results;
        let values = null;

        // check for prime awards && loans
        if (
            props.spendingLevel === 'awards' ||
            props.federalAccountPage === true
        ) {
            if (props.currentType === "loans") {
                values = arrayOfObjects.map((obj) => {
                    const loanrow = Object.create(ResultsTableRow);
                    loanrow.populateLoan(obj);
                    return Object.values(loanrow);
                });
                return values;
            }
            else if (props.currentType === "direct_payments") {
                values = arrayOfObjects.map((obj) => {
                    const directPaymentRow = Object.create(ResultsTableRow);
                    directPaymentRow.populateDirectPayment(obj);
                    return Object.values(directPaymentRow);
                });
                return values;
            }

            // grants and other
            else if (props.currentType === "grants" || props.currentType === "other") {
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
        else if (props.spendingLevel === 'transactions') {
            // check for contract or contract idv
            if (props.currentType === "transaction_contracts" || props.currentType === "transaction_idvs" || props.currentType === "contracts") {
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
        if (props.currentType === "subcontracts" || (props.columnType === "subawards" && (props.currentType === "contracts" || props.currentType === "idvs"))) {
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
        if (props.isMobile) {
            setActivateRightFade(false);
        }
        else {
            setActivateRightFade(true);
        }
    }, [props.isMobile]);
    const cols = prepareDTUIColumns();
    const limitedRows = prepareDTUIRows();
    // for table height take the height of the viewport
    // subtract the sticky header part on the top of the page
    // tab height for the tables
    // 16 pixel space between the tabs
    // pagination on the bottom, so you can actually see the pages
    return (
        <>
            <div
                className="advanced-search__table-wrapper"
                id="advanced-search__table-wrapper"
                style={props.resultsCount >= props.resultsLimit ? { height: '638px' } : {}}>
                <Table
                    classNames="table-for-new-search-page award-results-table-dtui"
                    stickyFirstColumn={!props.isMobile}
                    columns={cols}
                    rows={limitedRows}
                    rowHeight={props.isMobile ? null : 58}
                    headerRowHeight={45}
                    highlightedColumns={props.subaward ? {
                        standardColumns: 9,
                        highlightedColumns: props.currentType === "subcontracts" ? 7 : 6
                    } : null}
                    currentSort={props.sort}
                    updateSort={props.updateSort}
                    isMobile={props.isMobile}
                    isStacked
                    newMobileView />

            </div>
            <Pagination
                resultsText
                limitSelector
                hideLast={props.resultsCount >= 50000}
                currentPage={props.page}
                pageSize={props.resultsLimit}
                changePage={props.setPage}
                changeLimit={props.setResultLimit}
                totalItems={props.resultsCount} />
        </>
    );
};

ResultsTable.propTypes = propTypes;
export default ResultsTable;
