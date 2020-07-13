/**
 * AwardSpendingAgencyTableContainer.jsx
 * Created by James Lee 6/24/20
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { awardSpendingAgencyTableColumnFieldMapping, awardSpendingAgencyTableTabs } from 'dataMapping/covid19/awardSpendingAgency/awardSpendingAgencyTableTabs';
import { fetchAwardSpendingByAgency, fetchLoansByAgency } from 'helpers/disasterHelper';
import CoreSpendingTableRow from 'models/v2/covid19/CoreSpendingTableRow';

const propTypes = {
    type: PropTypes.string.isRequired,
    subHeading: PropTypes.string
};

const awardSpendingAgencyTableColumns = (type) => {
    if (type === 'Loan') {
        return (
            [
                {
                    title: 'name',
                    displayName: 'Agency Name'
                },
                {
                    title: 'faceValueOfLoan',
                    displayName: (
                        <>
                            <div>Face Value</div>
                            <div>of Loans</div>
                        </>
                    ),
                    right: true
                },
                {
                    title: 'obligation',
                    displayName: (
                        <>
                            <div>Award Obligations</div>
                            <div>(Loan Subsidy Cost)</div>
                        </>
                    ),
                    right: true
                },
                {
                    title: 'outlay',
                    displayName: (
                        <>
                            <div>Award Outlays</div>
                            <div>(Loan Subsidy Cost)</div>
                        </>
                    ),
                    right: true
                },
                {
                    title: 'count',
                    displayName: (
                        <>
                            <div>Number</div>
                            <div>of Awards</div>
                        </>
                    ),
                    right: true
                }
            ]);
    }
    return (
        [
            {
                title: 'name',
                displayName: 'Agency Name'
            },
            {
                title: 'obligation',
                displayName: 'Award Obligations',
                right: true
            },
            {
                title: 'outlay',
                displayName: 'Award Outlays',
                right: true
            },
            {
                title: 'count',
                displayName: (
                    <>
                        <div>Number</div>
                        <div>of Awards</div>
                    </>
                ),
                right: true
            }
        ]);
};

const AwardSpendingAgencyTableContainer = (props) => {
    const [currentPage, changeCurrentPage] = useState(1);
    const [pageSize, changePageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [sort, setSort] = useState('obligation');
    const [order, setOrder] = useState('desc');
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const defCodes = useSelector((state) => state.covid19.defCodes);

    const parseAwardSpendingByAgency = (data) => {
        const parsedData = data.map((item) => {
            const awardSpendingByAgencyRow = Object.create(CoreSpendingTableRow);
            awardSpendingByAgencyRow.populateCore(item);

            let rowChildren = [];
            if (item.children && item.children.length > 0) {
                rowChildren = item.children.map((childItem) => {
                    const awardSpendingByAgencyChildRow = Object.create(CoreSpendingTableRow);
                    awardSpendingByAgencyChildRow.populateCore(childItem);
                    return awardSpendingByAgencyChildRow;
                });
            }

            if (rowChildren && rowChildren.length > 0) {
                Object.defineProperty(awardSpendingByAgencyRow, "children", {
                    value: rowChildren
                });
            }

            let link = awardSpendingByAgencyRow.description;
            const id = awardSpendingByAgencyRow.id;
            if (link && id) {
                link = (
                    <a
                        className="agency-profile__link"
                        href={`#/agency/${id}`}>
                        {awardSpendingByAgencyRow.description}
                    </a>
                );
            }

            return {
                obligation: awardSpendingByAgencyRow.obligation,
                outlay: awardSpendingByAgencyRow.outlay,
                count: awardSpendingByAgencyRow.count,
                faceValueOfLoan: awardSpendingByAgencyRow.faceValueOfLoan,
                ...awardSpendingByAgencyRow,
                children: awardSpendingByAgencyRow.children,
                name: link
            };
        });
        setResults(parsedData);
    };

    const fetchSpendingByCategoryCallback = useCallback(() => {
        setLoading(true);

        let params = {};

        // if active tab is all, default to all award type codes
        if (props.type === 'all') {
            params = {
                filter: {
                    def_codes: defCodes.map((defc) => defc.code)
                },
                pagination: {
                    limit: pageSize,
                    page: currentPage,
                    sort: awardSpendingAgencyTableColumnFieldMapping[sort],
                    order
                },
                spending_type: 'award'
            };
        } else {
            params = {
                filter: {
                    def_codes: defCodes.map((defc) => defc.code),
                    award_type_codes: awardTypeGroups[props.type]
                },
                pagination: {
                    limit: pageSize,
                    page: currentPage,
                    sort: awardSpendingAgencyTableColumnFieldMapping[sort],
                    order
                },
                spending_type: 'award'
            };
        }

        let faceValueOfLoansRequest;
        if (props.type === 'loans') {
            const faceValueOfLoansParams = {
                filter: {
                    def_codes: defCodes.map((defc) => defc.code)
                },
                pagination: {
                    limit: pageSize,
                    page: currentPage,
                    sort: awardSpendingAgencyTableColumnFieldMapping[sort],
                    order
                },
                spending_type: 'award'
            };
            faceValueOfLoansRequest = fetchLoansByAgency(faceValueOfLoansParams);
        }


        if (faceValueOfLoansRequest) {
            faceValueOfLoansRequest.promise
                .then((res) => {
                    parseAwardSpendingByAgency(res.data.results);
                    setTotalItems(res.data.page_metadata.total);
                    setLoading(false);
                    setError(false);
                }).catch((err) => {
                    setError(true);
                    setLoading(false);
                    console.error(err);
                });
        } else {
            const request = fetchAwardSpendingByAgency(params);
            request.promise
                .then((res) => {
                    parseAwardSpendingByAgency(res.data.results);
                    setTotalItems(res.data.page_metadata.total);
                    setLoading(false);
                    setError(false);
                }).catch((err) => {
                    setError(true);
                    setLoading(false);
                    console.error(err);
                });
        }
    });

    useEffect(() => {
        // Reset to the first page
        changeCurrentPage(1);
        fetchSpendingByCategoryCallback();
    }, [props.type, pageSize, sort, order, defCodes]);

    useEffect(() => {
        fetchSpendingByCategoryCallback();
    }, [currentPage]);

    let message = null;
    if (loading) {
        message = (
            <div className="results-table-message-container">
                <ResultsTableLoadingMessage />
            </div>
        );
    } else if (error) {
        message = (
            <div className="results-table-message-container">
                <ResultsTableErrorMessage />
            </div>
        );
    }

    if (message) {
        return (
            <>
                <CSSTransitionGroup
                    transitionName="table-message-fade"
                    transitionLeaveTimeout={225}
                    transitionEnterTimeout={195}
                    transitionLeave>
                    {message}
                </CSSTransitionGroup>
            </>
        );
    }

    return (
        <div className="table-wrapper">
            <Table
                expandable
                rows={results}
                columns={awardSpendingAgencyTableColumns(awardSpendingAgencyTableTabs.filter((tab) => tab.internal === props.type)[0].columnName)}
                currentSort={{ field: sort, direction: order }}
                updateSort={updateSort}
                divider={props.subHeading} />
            <Pagination
                currentPage={currentPage}
                changePage={changeCurrentPage}
                changeLimit={changePageSize}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />
        </div>
    );
};

AwardSpendingAgencyTableContainer.propTypes = propTypes;
export default AwardSpendingAgencyTableContainer;
