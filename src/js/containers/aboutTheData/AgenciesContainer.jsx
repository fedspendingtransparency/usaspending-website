import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'data-transparency-ui';
import { throttle } from 'lodash';

import DrilldownCell from 'components/aboutTheData/DrilldownCell';
import CellWithModal from 'components/aboutTheData/CellWithModal';
import { agenciesTableColumns, mockAPI } from 'dataMapping/aboutTheData/agencyTables.jsx';

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
            obligation_difference: differenceInFileAAndB
        }) => [
            // TODO: handle agencies with no code
            (<DrilldownCell data={`${name} (${abbreviation})`} id={code} />),
            (<div className="generic-cell-content">{ total }</div>),
            (<CellWithModal data={publicationDate} openModal={openModal} modalType="publicationDates" agencyName={name} />),
            (<CellWithModal data={GtasNotInFileA} openModal={openModal} modalType="missingAccountBalance" agencyName={name} />),
            (<div className="generic-cell-content">% placeholder</div>),
            (<div className="generic-cell-content">{differenceInFileAAndB}</div>)
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
                    currentSort={sortStatus} />
            )}
            {activeTab === 'dates' && (
                <Table
                    rows={dateRows}
                    classNames={`usda-table-w-grid ${verticalStickyClass} ${horizontalStickyClass}`}
                    columns={agenciesTableColumns[activeTab]}
                    updateSort={handleUpdateSort}
                    currentSort={sortStatus} />
            )}
        </div>
    );
};

AgenciesContainer.propTypes = propTypes;
export default AgenciesContainer;
