/**
 * AgencyDetailsContainer.jsx
 */

import React, { useCallback, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { Table, Pagination } from 'data-transparency-ui';
import { throttle, isNull } from 'lodash';

import { fetchAgency } from 'apis/agencyReporting';
import BaseReportingPeriodRow from 'models/v2/aboutTheData/BaseReportingPeriodRow';
import AgencyDownloadLinkCell from 'components/aboutTheData/AgencyDownloadLinkCell';
import CellWithModal from 'components/aboutTheData/CellWithModal';
import { agencyDetailsColumns } from './AgencyTableMapping';

const propTypes = {
    agencyName: PropTypes.string,
    modalClick: PropTypes.func,
    agencyCode: PropTypes.string
};

const AgencyDetailsContainer = ({ modalClick, agencyName, agencyCode }) => {
    const [sortStatus, updateSort] = useState({
        field: 'fiscal_year',
        direction: 'desc'
    });
    const [{ vertical: isVertialSticky, horizontal: isHorizontalSticky }, setIsSticky] = useState({
        vertical: false,
        horizontal: false
    });
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentPage, changeCurrentPage] = useState(1);
    const [pageSize, changePageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const tableRef = useRef(null);
    const tableRequest = useRef(null);
    const prevPageRef = useRef(null);
    const { current: prevPage } = prevPageRef;

    const handleScroll = throttle(() => {
        const { scrollLeft: horizontal, scrollTop: vertical } = tableRef.current;
        setIsSticky({ vertical, horizontal });
    }, 100);

    const handleUpdateSort = (field, direction) => {
        updateSort({ field, direction });
    };

    const verticalStickyClass = isVertialSticky ? 'sticky-y-table' : '';
    const horizontalStickyClass = isHorizontalSticky ? 'sticky-x-table' : '';

    const parseRows = (results) =>
        results.map((row) => {
            const rowData = Object.create(BaseReportingPeriodRow);
            rowData.populate(row);
            return [
                <div className="generic-cell-content">{rowData.reportingPeriod}</div>,
                <div className="generic-cell-content">{rowData.percentOfBudget}</div>,
                !rowData._mostRecentPublicationDate ?
                    <div className="generic-cell-content">{rowData.mostRecentPublicationDate}</div> :
                    <CellWithModal
                        data={rowData.mostRecentPublicationDate}
                        openModal={modalClick}
                        modalType="publicationDates"
                        agencyData={{
                            fiscalYear: rowData.fiscalYear,
                            fiscalPeriod: rowData.fiscalPeriod,
                            agencyName,
                            agencyCode
                        }} />,
                isNull(rowData._discrepancyCount) ?
                    <div className="generic-cell-content">{rowData.discrepancyCount}</div> :
                    <CellWithModal
                        data={rowData.discrepancyCount}
                        openModal={modalClick}
                        modalType="missingAccountBalance"
                        agencyData={{
                            fiscalYear: rowData.fiscalYear,
                            fiscalPeriod: rowData.fiscalPeriod,
                            agencyName,
                            agencyCode,
                            gtasObligationTotal: rowData._gtasObligationTotal
                        }} />,
                isNull(rowData._obligationDifference) ?
                    <div className="generic-cell-content">{rowData.obligationDifference}</div> :
                    <CellWithModal
                        data={rowData.obligationDifference}
                        openModal={modalClick}
                        modalType="reportingDifferences"
                        agencyData={{
                            fiscalYear: rowData.fiscalYear,
                            fiscalPeriod: rowData.fiscalPeriod,
                            agencyName,
                            agencyCode
                        }} />,
                isNull(rowData._unlinkedContracts) ?
                    <div className="generic-cell-content">{rowData.unlinkedContracts}</div> :
                    <CellWithModal
                        data={rowData.unlinkedContracts}
                        openModal={modalClick}
                        modalType="unlinkedData"
                        agencyData={{
                            agencyName,
                            agencyCode,
                            fiscalYear: rowData.fiscalYear,
                            fiscalPeriod: rowData.fiscalPeriod,
                            type: 'Contract'
                        }} />,
                isNull(rowData._unlinkedAssistance) ?
                    <div className="generic-cell-content">{rowData.unlinkedAssistance}</div> :
                    <CellWithModal
                        data={rowData.unlinkedAssistance}
                        openModal={modalClick}
                        modalType="unlinkedData"
                        agencyData={{
                            agencyName,
                            agencyCode,
                            fiscalYear: rowData.fiscalYear,
                            fiscalPeriod: rowData.fiscalPeriod,
                            type: 'Assistance'
                        }} />,
                <div className="generic-cell-content">
                    <AgencyDownloadLinkCell file={rowData.assuranceStatement} />
                </div>
            ];
        });

    const fetchTableData = useCallback(() => {
        if (tableRequest.current) {
            tableRequest.current.cancel();
        }
        setError(false);
        setLoading(true);
        const params = {
            limit: pageSize,
            page: currentPage,
            sort: sortStatus.field,
            order: sortStatus.direction
        };
        tableRequest.current = fetchAgency(agencyCode, params);
        tableRequest.current.promise
            .then((res) => {
                setRows(parseRows(res.data.results));
                setTotalItems(res.data.page_metadata.total);
                setLoading(false);
            }).catch((err) => {
                if (!isCancel(err)) {
                    setError(true);
                    setErrorMessage(err);
                    setLoading(false);
                    tableRequest.current = null;
                    console.error(err);
                }
            });
    });

    useEffect(() => {
        prevPageRef.current = currentPage;
    }, [currentPage]);

    useEffect(() => {
        if (currentPage === 1 && !prevPage) {
            // only true on first render
            fetchTableData();
        }
        else if (currentPage === 1 && currentPage === prevPage) {
            // only true when sort, agency-code, or page-size changed
            fetchTableData();
        }
        else if (currentPage !== 1 && currentPage === prevPage) {
            // only true when sort, agency-code, or page-size changed
            changeCurrentPage(1);
        }
    }, [currentPage, agencyCode, sortStatus, pageSize]);

    useEffect(() => {
        if (prevPage !== currentPage && prevPage) {
            // only true when page changes.
            fetchTableData();
        }
    }, [currentPage]);

    return (
        <>
            <div className="table-container" ref={tableRef} onScroll={handleScroll}>
                <Table
                    rows={rows}
                    classNames={`${verticalStickyClass} ${horizontalStickyClass}`}
                    columns={agencyDetailsColumns}
                    updateSort={handleUpdateSort}
                    currentSort={sortStatus}
                    loading={loading}
                    error={error}
                    errorMessage={errorMessage} />
            </div>
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

AgencyDetailsContainer.propTypes = propTypes;
export default AgencyDetailsContainer;
