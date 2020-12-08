import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'data-transparency-ui';
import { throttle } from 'lodash';

import DrilldownCell from 'components/aboutTheData/DrilldownCell';
import CellWithModal from 'components/aboutTheData/CellWithModal';
import { agenciesTableColumns, mockAPI } from './AgencyTableMapping';

const dateRows = mockAPI.dates.results
    .map(({
        name,
        abbreviation,
        code,
        current_total_budget_authority_amount: total,
        periods
    }) => ([
        (<DrilldownCell data={`${name} (${abbreviation})`} id={code} />),
        (<div className="generic-cell-content">{total}</div>),
        ...periods.map(({ date }) => (<div className="generic-cell-content">{date}</div>))
    ]));

const propTypes = {
    openModal: PropTypes.func.isRequired,
    activeTab: PropTypes.oneOf(['dates', 'details'])
};

const AgenciesContainer = ({ activeTab, openModal }) => {
    const [sortStatus, updateSort] = useState({ field: '', direction: 'asc' });
    const [{ vertical: isVertialSticky, horizontal: isHorizontalSticky }, setIsSticky] = useState({ vertical: false, horizontal: false });
    const [loading] = useState(false);
    const [error] = useState(false);
    const tableRef = useRef(null);
    const handleScroll = throttle(() => {
        const { scrollLeft: horizontal, scrollTop: vertical } = tableRef.current;
        setIsSticky({ vertical, horizontal });
    }, 100);

    const handleUpdateSort = (field, direction) => {
        updateSort({ field, direction });
    };

    const verticalStickyClass = isVertialSticky ? 'sticky-y-table' : '';
    const horizontalStickyClass = isHorizontalSticky ? 'sticky-x-table' : '';

    // TODO - create a data model for agency row
    const rows = mockAPI.details.results.map(
        ({
            name,
            abbreviation,
            code,
            current_total_budget_authority_amount: total,
            recent_publication_date: publicationDate,
            discrepancy_count: GtasNotInFileA,
            obligation_difference: obligationDiff,
            tas_account_discrepancies_totals: tasTotals
        }) => [
            // TODO: handle agencies with no code
            (<DrilldownCell data={`${name} (${abbreviation})`} id={code} />),
            (<div className="generic-cell-content">{ total }</div>),
            (<CellWithModal data={publicationDate} openModal={openModal} modalType="publicationDates" agencyData={{ agencyName: `${name} (${abbreviation})` }} />),
            (<CellWithModal data={GtasNotInFileA} openModal={openModal} modalType="missingAccountBalance" agencyData={{ agencyName: `${name} (${abbreviation})`, gtasObligationTotal: tasTotals.gtas_obligation_total }} />),
            (<div className="generic-cell-content">% placeholder</div>),
            (<CellWithModal data={obligationDiff} openModal={openModal} modalType="reportingDifferences" agencyData={{ agencyName: `${name} (${abbreviation})` }} />)
        ]
    );

    return (
        <div className="table-container" ref={tableRef} onScroll={handleScroll}>
            {activeTab === 'details' && (
                <Table
                    rows={rows}
                    classNames={`usda-table-w-grid ${verticalStickyClass} ${horizontalStickyClass}`}
                    columns={agenciesTableColumns[activeTab]}
                    updateSort={handleUpdateSort}
                    currentSort={sortStatus}
                    error={error}
                    loading={loading} />
            )}
            {activeTab === 'dates' && (
                <Table
                    rows={dateRows}
                    classNames={`usda-table-w-grid ${verticalStickyClass} ${horizontalStickyClass}`}
                    columns={agenciesTableColumns[activeTab]}
                    updateSort={handleUpdateSort}
                    currentSort={sortStatus}
                    error={error}
                    loading={loading} />
            )}
        </div>
    );
};

AgenciesContainer.propTypes = propTypes;
export default AgenciesContainer;
