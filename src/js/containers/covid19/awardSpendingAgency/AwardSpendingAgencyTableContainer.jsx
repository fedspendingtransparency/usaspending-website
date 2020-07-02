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
import { awardSpendingAgencyTableColumns, awardSpendingAgencyTableColumnFieldMapping, awardSpendingAgencyTableTabs } from 'dataMapping/covid19/awardSpendingAgency/awardSpendingAgencyTableTabs';
import { fetchAwardSpendingByAgency, fetchFaceValueOfLoansByAgency } from 'helpers/disasterHelper';
import BaseAwardSpendingByAgencyRow from 'models/covid19/awardSpendingAgency/BaseAwardSpendingByAgencyRow';


const propTypes = {
    type: PropTypes.string.isRequired
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
            const awardSpendingByAgencyRow = Object.create(BaseAwardSpendingByAgencyRow);
            awardSpendingByAgencyRow.populate(item);

            let rowChildren = [];
            if (item.children && item.children.length > 0) {
                rowChildren = item.children.map((childItem) => {
                    const awardSpendingByAgencyChildRow = Object.create(BaseAwardSpendingByAgencyRow);
                    awardSpendingByAgencyChildRow.populate(childItem);
                    return awardSpendingByAgencyChildRow;
                });
            }

            if (rowChildren && rowChildren.length > 0) {
                Object.defineProperty(awardSpendingByAgencyRow, "children", {
                    value: rowChildren
                });
            }


            let link = awardSpendingByAgencyRow.name;
            const code = awardSpendingByAgencyRow.code;
            if (link && code) {
                link = (
                    <a
                        className="agency-profile__link"
                        href={`#/agency/${code}`}>
                        {awardSpendingByAgencyRow.name}
                    </a>
                );
            }

            return {
                obligation: awardSpendingByAgencyRow.obligation,
                outlay: awardSpendingByAgencyRow.outlay,
                count: awardSpendingByAgencyRow.count,
                faceValueOfLoan: awardSpendingByAgencyRow.faceValueOfLoan,
                ...awardSpendingByAgencyRow,
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
            faceValueOfLoansRequest = fetchFaceValueOfLoansByAgency(faceValueOfLoansParams);
        }


        if (faceValueOfLoansRequest) {
            const request = fetchAwardSpendingByAgency(params);

            // merge request arrays with face_value_of_loan data
            Promise.all([request.promise, faceValueOfLoansRequest.promise]).then((res) => {
                const result = res[0].data.results.filter((awardResult) =>
                    res[1].data.results.some((loanResult) =>
                        awardResult.id === loanResult.id
                    )
                ).map((combinedResult) => {
                    const faceValueOfLoan = res[1].data.results.filter((item) => combinedResult.id === item.id)[0].face_value_of_loan;
                    return { ...combinedResult, face_value_of_loan: faceValueOfLoan };
                });
                parseAwardSpendingByAgency(result);
                setTotalItems(res[0].data.page_metadata.total);
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
                <Pagination
                    currentPage={currentPage}
                    changePage={changeCurrentPage}
                    changeLimit={changePageSize}
                    limitSelector
                    resultsText
                    pageSize={pageSize}
                    totalItems={totalItems} />
            </>
        );
    }

    return (
        <>
            <Table
                expandable
                rows={results}
                columns={awardSpendingAgencyTableColumns(awardSpendingAgencyTableTabs.filter((tab) => tab.internal === props.type)[0].columnName)}
                currentSort={{ field: sort, direction: order }}
                updateSort={updateSort} />
            <Pagination
                currentPage={currentPage}
                changePage={changeCurrentPage}
                changeLimit={changePageSize}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />
        </>
    );
};

AwardSpendingAgencyTableContainer.propTypes = propTypes;
export default AwardSpendingAgencyTableContainer;
