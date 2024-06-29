/**
  * ResultsTable.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import { isAwardAggregate } from 'helpers/awardSummaryHelper';
import { awardTableColumnTypes } from 'dataMapping/search/awardTableColumnTypes';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import ResultsTableHeaderCell from './cells/ResultsTableHeaderCell';
import ResultsTableFormattedCell from './cells/ResultsTableFormattedCell';
import ResultsTableLinkCell from './cells/ResultsTableLinkCell';
import ReadMore from '../../../components/sharedComponents/ReadMore';
import { stickyHeaderHeight } from '../../../dataMapping/stickyHeader/stickyHeader';


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
        setResultLimit: PropTypes.func,
        total: PropTypes.number,
        isMobile: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.state = {
            currentRows: [],
            cols: this.prepareDTUIColumns(),
            windowHeight: 0,
            tableHeight: 0,
            activateRightFade: true
        };
        this.headerCellRender = this.headerCellRender.bind(this);
        this.bodyCellRender = this.bodyCellRender.bind(this);
        this.prepareDTUIColumns = this.prepareDTUIColumns.bind(this);
        this.prepareDTUIRows = this.prepareDTUIRows.bind(this);
        this.prepareTable = this.prepareTable.bind(this);
        this.measureHeight = this.measureHeight.bind(this);
        this.checkToAddRightFade = this.checkToAddRightFade.bind(this);
    }

    componentDidMount() {
        this.measureHeight();
        window.addEventListener('resize', this.measureHeight);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tableInstance !== this.props.tableInstance) {
            // table type has changed, reset the scroll
            if (this.tableComponent) {
                this.tableComponent.reloadTable();
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureHeight);
    }

    measureHeight() {
        const tableHeight = document.getElementById("advanced-search__table-wrapper").offsetHeight;
        this.setState({
            tableHeight,
            windowHeight: window.innerHeight
        });
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
        const orderedColumns = columnOrder.map((columnTitle) => {
            const column = this.props.columns.data[columnTitle];
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
    }

    prepareDTUIRows() {
        // limit = 10
        // page = 1, need 0-9
        // page = 2, need 10 - 19 etc
        // (page * limit) - 1 end
        // (page - 1) * limit start
        const arrayOfObjects = this.props.results;
        let values = null;
        // check for not subaward && loans
        if (!this.props.subaward) {
            if (this.props.currentType === "loans") {
                values = arrayOfObjects.map((obj) => {
                    const value = [];
                    value.push(
                        <a target="_blank" rel="noopener noreferrer" href={`/award/${obj.generated_internal_id}`}>{obj['Award ID']}</a> || '--',
                        <a target="_blank" rel="noopener noreferrer" href={`/recipient/${obj.recipient_id}`}>{obj['Recipient Name']}</a> || '--',
                        MoneyFormatter.formatMoneyWithPrecision(obj['Subsidy Cost'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['Loan Value'], 2, "--"),
                        <ReadMore
                            text={obj.Description || '--'}
                            limit={40} />,
                        obj['Contract Award Type'] || obj['Award Type'] || '--',
                        obj.def_codes || '--',
                        MoneyFormatter.formatMoneyWithPrecision(obj['COVID-19 Obligations'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['COVID-19 Outlays'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['Infrastructure Obligations'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['Infrastructure Outlays'], 2, "--"),
                        <a target="_blank" rel="noopener noreferrer" href={`/agency/${obj.agency_slug}`}>{obj['Awarding Agency']}</a> || '--',
                        obj['Awarding Sub Agency'] || '--',
                        obj['Issued Date'] || '--'
                    );

                    return value;
                });
                return values;
            }
            else if (this.props.currentType === "direct_payments") {
                values = arrayOfObjects.map((obj) => {
                    const value = [];
                    value.push(
                        <a target="_blank" rel="noopener noreferrer" href={`/award/${obj.generated_internal_id}`}>{obj['Award ID']}</a> || '--',
                        <a target="_blank" rel="noopener noreferrer" href={`/recipient/${obj.recipient_id}`}>{obj['Recipient Name']}</a> || '--',
                        MoneyFormatter.formatMoneyWithPrecision(obj['Award Amount'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['Total Outlays'], 2, "--"),
                        <ReadMore
                            text={obj.Description || '--'}
                            limit={40} />,
                        <ReadMore
                            text={obj['Contract Award Type'] || obj['Award Type'] || '--'}
                            limit={65} />,
                        obj.def_codes || '--',
                        MoneyFormatter.formatMoneyWithPrecision(obj['COVID-19 Obligations'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['COVID-19 Outlays'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['Infrastructure Obligations'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['Infrastructure Outlays'], 2, "--"),
                        <a target="_blank" rel="noopener noreferrer" href={`/agency/${obj.agency_slug}`}>{obj['Awarding Agency']}</a> || '--',
                        obj['Awarding Sub Agency'] || '--',
                        obj['Start Date'] || '--',
                        obj['End Date'] || '--'
                    );

                    return value;
                });
                return values;
            }

            // not loans or direct payments
            values = arrayOfObjects.map((obj) => {
                const value = [];
                value.push(
                    <a target="_blank" rel="noopener noreferrer" href={`/award/${obj.generated_internal_id}`}>{obj['Award ID']}</a> || '--',
                    <a target="_blank" rel="noopener noreferrer" href={`/recipient/${obj.recipient_id}`}>{obj['Recipient Name']}</a> || '--',
                    MoneyFormatter.formatMoneyWithPrecision(obj['Award Amount'], 2, "--"),
                    MoneyFormatter.formatMoneyWithPrecision(obj['Total Outlays'], 2, "--"),
                    <ReadMore
                        text={obj.Description || '--'}
                        limit={40} />,
                    obj['Contract Award Type'] || obj['Award Type'] || '--',
                    obj.def_codes || '--',
                    MoneyFormatter.formatMoneyWithPrecision(obj['COVID-19 Obligations'], 2, "--"),
                    MoneyFormatter.formatMoneyWithPrecision(obj['COVID-19 Outlays'], 2, "--"),
                    MoneyFormatter.formatMoneyWithPrecision(obj['Infrastructure Obligations'], 2, "--"),
                    MoneyFormatter.formatMoneyWithPrecision(obj['Infrastructure Outlays'], 2, "--"),
                    <a target="_blank" rel="noopener noreferrer" href={`/agency/${obj.agency_slug}`}>{obj['Awarding Agency']}</a> || '--',
                    obj['Awarding Sub Agency'] || '--',
                    obj['Start Date'] || '--',
                    obj['End Date'] || obj['Last Date to Order'] || '--'
                );

                return value;
            });
            return values;
        }

        // subaward
        values = arrayOfObjects.map((obj) => {
            const value = [];
            value.push(
                <a target="_blank" rel="noopener noreferrer" href={`/award/${obj.prime_award_generated_internal_id}`}>{obj['Sub-Award ID']}</a> || '--',
                obj['Sub-Awardee Name'] || '--',
                MoneyFormatter.formatMoneyWithPrecision(obj['Sub-Award Amount'], 2, "--"),
                obj['Sub-Award Date'] || '--',
                <a target="_blank" rel="noopener noreferrer" href={`/award/${obj.prime_award_generated_internal_id}`}>{obj['Prime Award ID']}</a> || '--',
                <a target="_blank" rel="noopener noreferrer" href={`/recipient/${obj.prime_award_recipient_id}`}>{obj['Prime Recipient Name']}</a> || '--',
                obj['Awarding Agency'] || '--',
                obj['Awarding Sub Agency'] || '--'
            );

            return value;
        });
        return values;
    }

    checkToAddRightFade(isScrolledLeft, isScrolledRight) {
        if (!isScrolledLeft) {
            this.setState({
                activateRightFade: true
            });
        }
        if (isScrolledRight) {
            this.setState({
                activateRightFade: false
            });
        }
    }

    render() {
        const cols = this.prepareDTUIColumns();
        const limitedRows = this.prepareDTUIRows();
        // for table height take the height of the viewport
        // subtract the sticky header part on the top of the page
        // tab height for the tables
        // 16 pixel space between the tabs
        // pagination on the bottom so you can actually see the pages
        return (
            <>
                <div
                    className={`advanced-search__table-wrapper ${this.state.activateRightFade ? 'activate-right-fade' : ''} `}
                    id="advanced-search__table-wrapper"
                    style={this.state.tableHeight > this.state.windowHeight ? { height: this.state.windowHeight - stickyHeaderHeight - 16 - 40 - 57 } : null}>
                    <Table
                        classNames="table-for-new-search-page award-results-table-dtui"
                        stickyFirstColumn
                        checkToAddRightFade={this.checkToAddRightFade}
                        columns={cols}
                        rows={limitedRows}
                        rowHeight={58}
                        headerRowHeight={45}
                        subAward={this.props.subaward}
                        currentSort={this.props.sort}
                        updateSort={this.props.updateSort} />
                </div>
                <Pagination
                    resultsText
                    limitSelector
                    hideLast={this.props.resultsCount >= 50000}
                    currentPage={this.props.page}
                    pageSize={this.props.resultsLimit}
                    changePage={this.props.setPage}
                    changeLimit={this.props.setResultLimit}
                    totalItems={this.props.resultsCount} />
            </>
        );
    }
}
