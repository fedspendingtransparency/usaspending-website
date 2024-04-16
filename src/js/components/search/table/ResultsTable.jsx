/**
  * ResultsTable.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import { isAwardAggregate } from 'helpers/awardSummaryHelper';
import { awardTableColumnTypes } from 'dataMapping/search/awardTableColumnTypes';

import IBTable from 'components/sharedComponents/IBTable/IBTable';

import ResultsTableHeaderCell from './cells/ResultsTableHeaderCell';
import ResultsTableFormattedCell from './cells/ResultsTableFormattedCell';
import ResultsTableLinkCell from './cells/ResultsTableLinkCell';
import FeatureFlag from "../../sharedComponents/FeatureFlag";

const rowHeight = 40;
// setting the table height to a partial row prevents double bottom borders and also clearly
// indicates when there's more data
const tableHeight = 29.5 * rowHeight;
const headerHeight = 68; // tall enough for two lines of text since allowing subtitles

export default class ResultsTable extends React.Component {
    static propTypes = {
        results: PropTypes.array,
        columns: PropTypes.object,
        visibleWidth: PropTypes.number,
        loadNextPage: PropTypes.func,
        subaward: PropTypes.bool,
        tableInstance: PropTypes.string,
        sort: PropTypes.object,
        updateSort: PropTypes.func,
        awardIdClick: PropTypes.func,
        subAwardIdClick: PropTypes.func,
        page: PropTypes.number,
        setPage: PropTypes.func,
        total: PropTypes.number
    };

    constructor(props) {
        super(props);

        this.state = {
            currentRows: [],
            cols: this.prepareDTUIColumns()
        };
        this.headerCellRender = this.headerCellRender.bind(this);
        this.bodyCellRender = this.bodyCellRender.bind(this);
        this.prepareDTUIColumns = this.prepareDTUIColumns.bind(this);
        this.prepareDTUIRows = this.prepareDTUIRows.bind(this);
        this.prepareTable = this.prepareTable.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.tableInstance !== this.props.tableInstance) {
            // table type has changed, reset the scroll
            if (this.tableComponent) {
                this.tableComponent.reloadTable();
            }
        }
    }

    headerCellRender(columnIndex) {
        const columnId = this.props.columns.visibleOrder[columnIndex];
        const column = this.props.columns.data[columnId];
        const isLast = (columnIndex + 1) === this.props.columns.visibleOrder.length;
        let isActive = this.props.sort.field === column.columnName;

        if (!isActive && column.columnName === 'Action Date' && this.props.sort.field === 'Sub-Award Date') {
            isActive = true;
        }
        return (
            <ResultsTableHeaderCell
                isLast={isLast}
                isActive={isActive}
                title={column.columnName}
                displayName={column.displayName}
                subtitle={column.subtitle}
                background={column.background}
                defaultDirection={column.defaultDirection}
                currentSort={this.props.sort}
                updateSort={this.props.updateSort}
                headerHeight={headerHeight} />
        );
    }

    bodyCellRender(columnIndex, rowIndex) {
        const columnId = this.props.columns.visibleOrder[columnIndex];
        const column = this.props.columns.data[columnId];
        let cellClass = ResultsTableFormattedCell;
        const props = {
            rowIndex,
            columnIndex,
            value: this.props.results[rowIndex][columnId],
            dataType: awardTableColumnTypes[columnId]
        };

        if (column.columnName === 'Award ID') {
            cellClass = ResultsTableLinkCell;
            props.id = this.props.results[rowIndex].generated_internal_id;
            props.column = 'award';
            if (this.props.awardIdClick) {
                props.onClick = () => this.props.awardIdClick(props.id);
            }
        }
        else if (column.columnName === 'Total Outlays') {
            if (!this.props.results[rowIndex]['Total Outlays']) {
                props.value = '--';
            }
        }
        else if ((column.columnName === 'Sub-Award ID') && this.props.subaward) {
            const row = this.props.results[rowIndex];
            cellClass = ResultsTableLinkCell;
            props.column = 'award';
            props.id = row.prime_award_generated_internal_id;
            props.onClick = this.props.subAwardIdClick.bind(null, `${row['Sub-Award ID']} (${props.id})`);
        }
        else if ((column.columnName === 'Action Date') && this.props.subaward) {
            props.value = this.props.results[rowIndex]['Sub-Award Date'];
        }
        else if (column.columnName === 'Recipient Name' && this.props.results[rowIndex].recipient_id) {
            cellClass = ResultsTableLinkCell;
            props.id = this.props.results[rowIndex].recipient_id;
            props.column = 'recipient';
        }
        else if (column.columnName === 'Prime Recipient Name' && this.props.results[rowIndex].prime_award_recipient_id) {
            // for Sub-Awards
            cellClass = ResultsTableLinkCell;
            props.id = this.props.results[rowIndex].prime_award_recipient_id;
            props.column = 'recipient';
        }
        else if (column.columnName === 'Awarding Agency' && this.props.results[rowIndex].awarding_agency_id) {
            cellClass = ResultsTableLinkCell;
            props.id = this.props.results[rowIndex].agency_slug || this.props.results[rowIndex].awarding_agency_id;
            props.column = 'agency';
        }
        else if (column.columnName === 'Prime Award ID') {
            const primeAwardId = this.props.results[rowIndex].prime_award_generated_internal_id;
            if (primeAwardId) {
                cellClass = ResultsTableLinkCell;
                props.id = primeAwardId;
                props.column = 'award';
                props.value = isAwardAggregate(primeAwardId)
                    ? primeAwardId
                    : props.value;
            }
            else {
                // primeAwardId null case
                props.value = '- -';
            }
        }
        else if (
            (column.columnName === 'COVID-19 Obligations' || column.columnName === 'COVID-19 Outlays')
            && !this.props.results[rowIndex][column.columnName] && this.props.results[rowIndex][column.columnName] !== 0) {
            props.value = '--';
        }
        else if (column.columnName === 'def_codes') {
            if (!this.props.results[rowIndex].def_codes) {
                props.value = '--';
            }
            else {
                props.value = this.props.results[rowIndex].def_codes.join(", ");
            }
        }
        else if (column.columnName === 'Description') {
            if (!this.props.results[rowIndex].Description) {
                props.value = '--';
            }
            else {
                props.value = this.props.results[rowIndex].Description;
            }
        }
        else if (column.columnName === 'Infrastructure Obligations' || column.columnName === 'Infrastructure Outlays') {
            if (!this.props.results[rowIndex][column.columnName] && this.props.results[rowIndex][column.columnName] !== 0) {
                props.value = '--';
            }
        }
        return React.createElement(
            cellClass,
            props
        );
    }

    prepareTable() {
        let totalWidth = 0;

        const columnOrder = this.props.columns.visibleOrder;
        const columns = columnOrder.map((columnTitle) => {
            const column = this.props.columns.data[columnTitle];
            const columnX = totalWidth;
            totalWidth += column.width;

            return {
                x: columnX,
                width: column.width
            };
        });

        return {
            columns,
            width: totalWidth
        };
    }

    prepareDTUIColumns() {
        const columnOrder = this.props.columns.visibleOrder;
        const columns = columnOrder.map((columnTitle) => {
            const column = this.props.columns.data[columnTitle];
            return column;
        });

        return columns;
    }

    prepareDTUIRows() {
        console.debug("this.props: ", this.props);
        // limit = 10
        // page = 1, need 0-9
        // page = 2, need 10 - 19 etc
        // (page * limit) - 1 end
        // (page - 1) * limit start
        const arrayOfObjects = this.props.limitedResults;
        let values = null;
        if (!this.props.subaward) {
            values = arrayOfObjects.map((obj) => {
                const value = [];
                value.push(
                    <a target="_blank" rel="noopener noreferrer" href={`/award/${obj.generated_internal_id}`}>{obj['Award ID']}</a> || '--',
                    <a target="_blank" rel="noopener noreferrer" href={`/recipient/${obj.recipient_id}`}>{obj['Recipient Name']}</a> || '--',
                    obj['Start Date'] || '--',
                    obj['End Date'] || '--',
                    obj['Award Amount'] || '--',
                    obj['Total Outlays'] || '--',
                    obj.Description || '--',
                    obj.def_codes || '--',
                    obj['COVID-19 Obligations'] || '--',
                    obj['COVID-19 Outlays'] || '--',
                    obj['Infrastructure Obligations'] || '--',
                    obj['Infrastructure Outlays'] || '--',
                    <a target="_blank" rel="noopener noreferrer" href={`/agency/${obj.agency_slug}`}>{obj['Awarding Agency']}</a> || '--',
                    obj['Awarding Sub Agency'] || '--',
                    obj['Contract Award Type'] || '--'
                );

                return value;
            });
            return values;
        }

        values = arrayOfObjects.map((obj) => {
            const value = [];
            value.push(
                <a target="_blank" rel="noopener noreferrer" href={`/award/${obj.generated_internal_id}`}>{obj['Sub-Award ID']}</a> || '--',
                <a target="_blank" rel="noopener noreferrer" href={`/recipient/${obj.recipient_id}`}>{obj['Sub-Awardee Name']}</a> || '--',
                obj['Action Date'] || '--',
                obj['Sub-Award Amount'] || '--',
                <a target="_blank" rel="noopener noreferrer" href={`/agency/${obj.agency_slug}`}>{obj['Awarding Agency']}</a> || '--',
                obj['Awarding Sub Agency'] || '--',
                obj['Prime Award ID'] || '--',
                obj['Prime Recipient Name'] || '--'
            );

            return value;
        });
        return values;
    }

    render() {
        console.debug("PROPS: ", this.props.page, this.state.total);
        const calculatedValues = this.prepareTable();
        let noResultsClass = '';
        if (this.props.results.length === 0) {
            // remove duplicated bottom border
            noResultsClass = ' no-results';
        }
        const variableBodyHeight = Math.min(tableHeight, rowHeight * this.props.results.length);

        const cols = this.prepareDTUIColumns();
        const limitedRows = this.prepareDTUIRows();
        console.debug(this.total);
        return (
            <>
                <div className={`award-results-table${noResultsClass}`}>
                    <IBTable
                        rowHeight={rowHeight}
                        rowCount={this.props.results.length}
                        headerHeight={headerHeight}
                        contentWidth={calculatedValues.width}
                        bodyWidth={this.props.visibleWidth}
                        bodyHeight={variableBodyHeight}
                        columns={calculatedValues.columns}
                        headerCellRender={this.headerCellRender}
                        bodyCellRender={this.bodyCellRender}
                        onReachedBottom={this.props.loadNextPage}
                        topScroller
                        ref={(table) => {
                            this.tableComponent = table;
                        }} />
                </div>
                <FeatureFlag>
                    <>
                        <div style={{ width: "auto", overflowX: "scroll" }}>
                            <Table
                                stickyFirstColumn
                                columns={cols}
                                rows={limitedRows}
                                currentSort={this.props.sort}
                                updateSort={this.props.updateSort} />
                        </div>
                        <Pagination
                            resultsText
                            currentPage={this.props.page}
                            changePage={this.props.loadNextPage}
                            totalItems={this.props.total} />
                    </>
                </FeatureFlag>
            </>
        );
    }
}
