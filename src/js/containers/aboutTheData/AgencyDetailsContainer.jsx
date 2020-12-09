/**
 * AgencyDetailsContainer.jsx
 */

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, TooltipComponent, TooltipWrapper } from 'data-transparency-ui';
import { throttle } from 'lodash';

import { fetchAgency } from 'helpers/aboutTheDataHelper';
import BaseReportingPeriodRow from 'models/v2/aboutTheData/BaseReportingPeriodRow';
import AgencyDownloadLinkCell from 'components/aboutTheData/AgencyDownloadLinkCell';
import CellWithModal from 'components/aboutTheData/CellWithModal';

const Tooltip = ({ title }) => (
    <TooltipComponent title={title}>
        <p>Place holder for tooltip component.</p>
    </TooltipComponent>
);

Tooltip.propTypes = {
    title: PropTypes.string.isRequired
};

const columns = [
    {
        title: "fiscal_year",
        displayName: "Reporting Period"
    },
    {
        title: "current_total_budget_authority_amount",
        displayName: "Percent of Total Federal Budget",
        icon: (
            <TooltipWrapper
                icon="info"
                tooltipComponent={<Tooltip title="Percent of Total Federal Budget" />} />
        )
    },
    {
        title: "recent_publication_date",
        displayName: "Most Recent Update",
        icon: (
            <TooltipWrapper
                icon="info"
                tooltipComponent={<Tooltip title="Most Recent Update" />} />
        )
    },
    {
        title: "missing_tas_accounts_count",
        displayName: "Number of TASs Missing from Account Balance Data",
        icon: (
            <TooltipWrapper
                icon="info"
                tooltipComponent={<Tooltip title="TASs Missing from Account Balance Data" />} />
        )
    },
    {
        title: "obligation_difference",
        displayName: "Reporting Difference in Obligations",
        icon: (
            <TooltipWrapper
                icon="info"
                tooltipComponent={<Tooltip title="Reporting Difference in Obligations" />} />
        )
    },
    {
        title: "unlinked_cont_award_count",
        displayName: "Number of Unlinked Contract Awards",
        icon: (
            <TooltipWrapper
                icon="info"
                tooltipComponent={<Tooltip title="Number of Unlinked Contract Awards" />} />
        )
    },
    {
        title: "unlinked_asst_award_count",
        displayName: "Number of Unlinked Assistance Awards",
        icon: (
            <TooltipWrapper
                icon="info"
                tooltipComponent={<Tooltip title="Number of Unlinked Assistance Awards" />} />
        )
    },
    {
        title: "assurance_statements",
        displayName: "Assurance Statements",
        icon: (
            <TooltipWrapper
                icon="info"
                tooltipComponent={<Tooltip title="Assurance Statements" />} />
        )
    }
];

const propTypes = {
    agencyName: PropTypes.string,
    modalClick: PropTypes.func,
    agencyCode: PropTypes.string
};

const AgencyDetailsContainer = ({ modalClick, agencyName, agencyCode }) => {
    const [sortStatus, updateSort] = useState({ field: '', direction: 'asc' });
    const [{ vertical: isVertialSticky, horizontal: isHorizontalSticky }, setIsSticky] = useState({ vertical: false, horizontal: false });
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
                (<CellWithModal data={rowData.mostRecentUpdate} openModal={modalClick} modalType="publicationDates" agencyName={agencyName} />),
                (<CellWithModal data={rowData.missingTAS} openModal={modalClick} modalType="missingAccountBalance" agencyName={agencyName} />),
                (<div className="generic-cell-content">{ rowData.obligationDifference }</div>),
                (<div className="generic-cell-content">Todo</div>),
                (<div className="generic-cell-content">Todo</div>),
                (<div className="generic-cell-content"><AgencyDownloadLinkCell file="placeholder" /></div>)
            ]);
        })
    );

    useEffect(() => {
        const getTableData = async () => {
            tableRequest.current = fetchAgency(agencyCode);
            try {
                const { data } = await tableRequest.current.promise;
                // TODO - remove mock federal budget
                setRows(parseRows(data.results, 10000000000000));
                setLoading(false);
            }
            catch (err) {
                console.error(err);
                setErrorMessage(err.message);
                setLoading(false);
                setError(true);
            }
        };
        getTableData();
        tableRequest.current = null;
        return () => {
            if (tableRequest.current) {
                tableRequest.cancel();
            }
        };
    }, [agencyCode]);

    return (
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
    );
};

AgencyDetailsContainer.propTypes = propTypes;
export default AgencyDetailsContainer;
