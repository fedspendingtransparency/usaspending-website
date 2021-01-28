/**
 * AgencyDetailsContainer.jsx
 */

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { Table, Pagination } from 'data-transparency-ui';
import { throttle } from 'lodash';

import { fetchAgency } from 'helpers/aboutTheDataHelper';
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
        field: 'current_total_budget_authority_amount',
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
                rowData._unlinkedContracts !== 0 ? (
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
                        }} />
                ) : (
                    <div className="generic-cell-content">{rowData.unlinkedContracts}</div>
                ),
                rowData._unlinkedAssistance !== 0 ? (
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
                        }} />
                ) : (
                    <div className="generic-cell-content">{rowData.unlinkedAssistance}</div>
                ),
                <div className="generic-cell-content">
                    <AgencyDownloadLinkCell file={rowData.assuranceStatement} />
                </div>
            ];
        });

    const fetchTableData = () => {
        if (tableRequest.current) {
            tableRequest.current.cancel();
        }
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
    };

    useEffect(() => {
        // Reset to the first page
        if (currentPage === 1) {
            fetchTableData();
        }
        else {
            changeCurrentPage(1);
        }
    }, [agencyCode, sortStatus, pageSize]);

    useEffect(() => {
        fetchTableData();
    }, [currentPage]);

    return (
        <>
            <div className="table-container" ref={tableRef} onScroll={handleScroll}>
                <Table
                    rows={rows}
                    classNames={`usda-table-w-grid ${verticalStickyClass} ${horizontalStickyClass}`}
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
