/**
 * MapList.jsx
 * Created by Kevin Li 5/22/17
 */

import React from 'react';
import _ from 'lodash';

import IBTable from 'components/sharedComponents/IBTable/IBTable';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import { tableColumns } from 'dataMapping/homepage/mapTable';
import ResultsTableGenericCell from 'components/search/table/cells/ResultsTableGenericCell';

import MapListHeaderCell from './cells/MapListHeaderCell';

const propTypes = {
    loading: React.PropTypes.bool,
    data: React.PropTypes.array
};

const rowHeight = 40;
// setting the table height to a partial row prevents double bottom borders and also clearly
// indicates when there's more data
const tableHeight = 14.5 * rowHeight;

export default class MapList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableWidth: 0,
            tableLeft: 0,
            tableRight: 0,
            columns: [],
            contentWidth: 0,
            sort: {
                field: 'state',
                direction: 'asc'
            },
            sortedData: [],
            renderHash: ''
        };

        this.setTableWidth = this.setTableWidth.bind(this);
        this.rowClassName = this.rowClassName.bind(this);
        this.changeSearchOrder = this.changeSearchOrder.bind(this);
    }

    componentDidMount() {
        // set the initial table width
        this.setTableWidth();
        this.prepareTable(this.props.data);
        // watch the window for size changes
        window.addEventListener('resize', this.setTableWidth);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.prepareTable(nextProps.data);
        }
    }

    componentWillUnmount() {
        // stop watching for size changes
        window.removeEventListener('resize', this.setTableWidth);
    }

    setTableWidth() {
        const tableWidth = this.tableWidthController.clientWidth;
        const windowWidth = window.innerWidth;

        const margin = (windowWidth - tableWidth) / 2;

        this.setState({
            tableWidth,
            tableLeft: margin,
            tableRight: margin
        });
    }

    rowClassName(index) {
        let evenOdd = 'odd';
        if ((index + 1) % 2 === 0) {
            evenOdd = 'even';
        }
        return `homepage-map-table-row ${evenOdd}`;
    }

    sortData(data) {
        return _.orderBy(data, [this.state.sort.field], [this.state.sort.direction]);
    }

    prepareTable(data) {
        // prepare the data
        const sortedData = this.sortData(data);
        const renderHash = `map-list-sort-${_.uniqueId()}`;

        // prepare the columns
        let contentWidth = 0;
        const columns = [];

        tableColumns.order.forEach((column, index) => {
            contentWidth += tableColumns.widths[column];

            let isLast = false;
            if (index + 1 === tableColumns.order.length) {
                isLast = true;
            }

            const tableCol = {
                width: tableColumns.widths[column],
                name: column,
                columnId: column,
                rowClassName: this.rowClassName,
                header: (
                    <MapListHeaderCell
                        label={tableColumns.labels[column]}
                        column={column}
                        defaultDirection={tableColumns.defaultDirection[column]}
                        isLastColumn={isLast}
                        order={this.state.sort}
                        changeSearchOrder={this.changeSearchOrder} />
                ),
                cell: (rowIndex) => {
                    let formattedValue = `${sortedData[rowIndex][column]}`;
                    if (column === 'amount' || column === 'capita') {
                        formattedValue = MoneyFormatter.formatMoney(sortedData[rowIndex][column]);
                    }

                    return (<ResultsTableGenericCell
                        key={`cell-${column}-${rowIndex}`}
                        rowIndex={rowIndex}
                        data={formattedValue}
                        dataHash={renderHash}
                        column={column.columnName}
                        isLastColumn={isLast} />);
                }
            };

            columns.push(tableCol);
        });

        this.setState({
            columns,
            contentWidth,
            sortedData,
            renderHash
        });
    }

    changeSearchOrder(field, direction) {
        // update the state
        this.setState({
            sort: {
                field,
                direction
            }
        }, () => {
            // update the table
            this.prepareTable(this.props.data);
        });
    }
    render() {
        let inFlightClass = 'loaded-table';
        if (this.props.loading) {
            inFlightClass = 'loading-table';
        }

        return (
            <div className="homepage-map-list">
                <div
                    className="map-table-width-master"
                    ref={(div) => {
                        // this is an empty div that scales via CSS
                        // the results table width will follow this div's width
                        this.tableWidthController = div;
                    }} />
                <div
                    className={`map-table ${inFlightClass}`}
                    style={{
                        marginLeft: this.state.tableLeft,
                        marginRight: this.state.tableRight
                    }}>
                    <IBTable
                        dataHash={`${this.state.renderHash}-${this.state.tableWidth}`}
                        resetHash={this.state.renderHash}
                        rowHeight={rowHeight}
                        rowCount={this.props.data.length}
                        headerHeight={50}
                        width={this.state.contentWidth}
                        maxWidth={this.state.tableWidth}
                        maxHeight={tableHeight}
                        columns={this.state.columns} />
                </div>
                <div className="map-list-citation">
                    <p>Sources: US. Census Bureau, Population Division</p>
                    <p>The World Factbook 2013-14. Washington, DC: Central Intelligence Agency, 2013</p>
                </div>
            </div>
        );
    }
}

MapList.propTypes = propTypes;
