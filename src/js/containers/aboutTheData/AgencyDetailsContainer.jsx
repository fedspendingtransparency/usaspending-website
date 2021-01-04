/**
 * AgencyDetailsContainer.jsx
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { Table, TooltipComponent, TooltipWrapper, Pagination } from 'data-transparency-ui';
import { throttle } from 'lodash';

import { fetchAgency } from 'helpers/aboutTheDataHelper';
import BaseReportingPeriodRow from 'models/v2/aboutTheData/BaseReportingPeriodRow';
import AgencyDownloadLinkCell from 'components/aboutTheData/AgencyDownloadLinkCell';
import CellWithModal from 'components/aboutTheData/CellWithModal';
import { columnTooltips } from 'components/aboutTheData/dataMapping/tooltipContentMapping';

const Tooltip = ({ title, position = "right" }) => (
    <TooltipWrapper
        icon="info"
        tooltipPosition={position}
        tooltipComponent={(
            <TooltipComponent title={title}>
                {columnTooltips[title]}
            </TooltipComponent>
        )} />
);

Tooltip.propTypes = {
    title: PropTypes.string.isRequired,
    position: PropTypes.oneOf(['left', 'right'])
};

const columns = [
    {
        title: "fiscal_year",
        displayName: "Reporting Period"
    },
    {
        title: "current_total_budget_authority_amount",
        displayName: "Percent of Total Federal Budget"
    },
    {
        title: "recent_publication_date",
        displayName: "Most Recent Update",
        icon: (<Tooltip title="Most Recent Update" />)
    },
    {
        title: "missing_tas_accounts_count",
        displayName: "Number of TASs Missing from Account Balance Data",
        icon: (
            <Tooltip title="Number of TASs Missing in Account Balance Data" />
        )
    },
    {
        title: "obligation_difference",
        displayName: "Reporting Difference in Obligations",
        icon: (
            <Tooltip title="Reporting Difference in Obligations" />
        )
    },
    {
        title: "unlinked_cont_award_count",
        displayName: "Number of Unlinked Contract Awards",
        icon: (
            <Tooltip title="Number of Unlinked Contract Awards" />
        )
    },
    {
        title: "unlinked_asst_award_count",
        displayName: "Number of Unlinked Assistance Awards",
        icon: (
            <Tooltip title="Number of Unlinked Assistance Awards" />
        )
    },
    {
        title: "assurance_statements",
        displayName: "Assurance Statements",
        icon: (
            <Tooltip title="Agency Disclosures" position="left" />
        )
    }
];

const propTypes = {
    agencyName: PropTypes.string,
    modalClick: PropTypes.func,
    agencyCode: PropTypes.string
};

const AgencyDetailsContainer = ({ modalClick, agencyName, agencyCode }) => {
    const [sortStatus, updateSort] = useState({ field: 'current_total_budget_authority_amount', direction: 'desc' });
    const [{ vertical: isVertialSticky, horizontal: isHorizontalSticky }, setIsSticky] = useState({ vertical: false, horizontal: false });
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

    const parseRows = (results, federalBudget) => (
        results.map((row) => {
            const rowData = Object.create(BaseReportingPeriodRow);
            rowData.populate(row, federalBudget);
            return ([
                (<div className="generic-cell-content">{ rowData.reportingPeriod }</div>),
                (<div className="generic-cell-content">{ rowData.percentOfBudget }</div>),
                (<CellWithModal data={rowData.mostRecentPublicationDate} openModal={modalClick} modalType="publicationDates" agencyData={{ agencyName, agencyCode }} />),
                (<CellWithModal
                    data={rowData.missingTASCount}
                    openModal={modalClick}
                    modalType="missingAccountBalance"
                    agencyData={{ agencyName, agencyCode, gtasObligationTotal: rowData._gtasObligationTotal }} />),
                (<CellWithModal data={rowData.obligationDifference} openModal={modalClick} modalType="reportingDifferences" agencyData={{ agencyName, agencyCode }} />),
                (<div className="generic-cell-content">--</div>),
                (<div className="generic-cell-content">--</div>),
                (<div className="generic-cell-content"><AgencyDownloadLinkCell file="placeholder" /></div>)
            ]);
        })
    );

    const fetchTableData = useCallback(() => {
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
                // TODO - remove mock federal budget
                setRows(parseRows(res.data.results, 10000000000000));
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
                    columns={columns}
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
