/**
 * TableBody.jsx
 * Created by Kevin Li 12/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ScrollManager from '../managers/ScrollManager';

const propTypes = {
    tableId: PropTypes.string,
    columns: PropTypes.array,
    rowCount: PropTypes.number,
    rowHeight: PropTypes.number,
    bodyHeight: PropTypes.number,
    bodyWidth: PropTypes.number,
    contentWidth: PropTypes.number,
    onReachedBottom: PropTypes.func,
    bodyCellRender: PropTypes.func
};

const watchedProps = ['rowCount', 'rowHeight', 'bodyHeight', 'contentWidth', 'bodyWidth'];
const arrowKeys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];

export default class TableBody extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            visibleRange: ''
        };

        this._lastX = 0;
        this._lastY = 0;
        this._blockPagination = false;

        this._cellCache = {};
        this._visibleCells = [];

        this._scrollListener = null;

        this._tableScrolled = this._tableScrolled.bind(this);

        // bindings for accessibility users
        this._keyPressed = this._keyPressed.bind(this);
    }

    componentDidMount() {
        this._scrollListener = ScrollManager.subscribe(this._tableScrolled);
        // because we can't reliably detect focus/blur events on table children, we'll just listen
        // to all keypress events and only handle it when a cell is active and an arrow key is also
        // pressed
        document.addEventListener('keydown', this._keyPressed);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rowCount > this.props.rowCount) {
            // the total number of rows has been reduced, do not allow pagination until
            // regeneration is complete
            this._blockPagination = true;
        }

        for (const prop of watchedProps) {
            if (prevProps[prop] !== this.props[prop]) {
                // if any of the watched props change values, regenerate all the cells
                this._generateAllCells();
                break;
            }
        }
    }

    componentWillUnmount() {
        if (this._scrollListener) {
            ScrollManager.unsubscribe(this._scrollListener);
        }

        document.removeEventListener('keydown', this._keyPressed);
    }

    reloadTable() {
        this.setState({
            visibleRange: ''
        }, () => {
            this._generateAllCells();
        });
    }

    _findActiveCell(element) {
        if (!element || !this._tableDiv.contains(element)) {
            // no element was provided to compare or the element that was provided is not a child
            // of the table container (this prevents us from unnecessarily iterating through
            // unreleated DOM elements)
            return null;
        }

        // validate that the element is a cell in this table
        if (element.dataset.ibtTableElement === 'cell'
            && element.dataset.ibtTableOwner === this.props.tableId) {
            return element;
        }

        // it's not a cell, check its parent
        return this._findActiveCell(element.parentElement);
    }

    _keyPressed(e) {
    // check if a cell or a child of a cell is currently focused
        const activeElement = document.activeElement;
        if (!activeElement) {
            return;
        }
        const active = this._findActiveCell(activeElement);
        if (!active || arrowKeys.indexOf(e.key) === -1) {
            // no active cell is selected and/or a non-arrow key was pressed
            return;
        }

        // since an arrow key was pressed, override the default behavior
        e.preventDefault();

        switch (e.key) {
            case 'ArrowDown':
                this._focusDown(active);
                break;
            case 'ArrowUp':
                this._focusUp(active);
                break;
            case 'ArrowLeft':
                this._focusLeft(active);
                break;
            case 'ArrowRight':
                this._focusRight(active);
                break;
            // no default
        }
    }

    _focusRight(active) {
        const colIndex = parseInt(active.dataset.ibtColIndex, 10);
        const rowIndex = parseInt(active.dataset.ibtRowIndex, 10);
        // go to the next column
        let nextId = `${this.props.tableId}-cell-${colIndex + 1}-${rowIndex}`;
        if (colIndex + 1 >= this.props.columns.length) {
            // this is the last column, go the first column of the next row
            if (rowIndex + 1 < this.props.rowCount) {
                nextId = `${this.props.tableId}-cell-0-${rowIndex + 1}`;
            }
            else {
                // this is also the last row, so do nothing
                return;
            }
        }

        const nextCell = document.getElementById(nextId);
        if (nextCell) {
            nextCell.focus();
        }
    }

    _focusLeft(active) {
        const colIndex = parseInt(active.dataset.ibtColIndex, 10);
        const rowIndex = parseInt(active.dataset.ibtRowIndex, 10);
        // go to the previous column
        let nextId = `${this.props.tableId}-cell-${colIndex - 1}-${rowIndex}`;
        if (colIndex === 0) {
            // this is the first column, go the last column of the previous row
            if (rowIndex > 0) {
                nextId = `${this.props.tableId}-cell-${this.props.columns.length - 1}-${rowIndex - 1}`;
            }
            else {
                // this is also the first row, so do nothing
                return;
            }
        }

        const nextCell = document.getElementById(nextId);
        if (nextCell) {
            nextCell.focus();
        }
    }

    _focusUp(active) {
        const colIndex = parseInt(active.dataset.ibtColIndex, 10);
        const rowIndex = parseInt(active.dataset.ibtRowIndex, 10);
        // go to the previous row
        const nextId = `${this.props.tableId}-cell-${colIndex}-${rowIndex - 1}`;
        if (rowIndex === 0) {
            // this is also the first row, so do nothing
            return;
        }

        const nextCell = document.getElementById(nextId);
        if (nextCell) {
            nextCell.focus();
        }
    }

    _focusDown(active) {
        const colIndex = parseInt(active.dataset.ibtColIndex, 10);
        const rowIndex = parseInt(active.dataset.ibtRowIndex, 10);
        // go to the next row
        const nextId = `${this.props.tableId}-cell-${colIndex}-${rowIndex + 1}`;
        if (rowIndex + 1 >= this.props.rowCount) {
            // this is also the last row, so do nothing
            return;
        }

        const nextCell = document.getElementById(nextId);
        if (nextCell) {
            nextCell.focus();
        }
    }

    _tableScrolled(scroll) {
        const visibleCoords = this._calculateVisibleRows(scroll.x, scroll.y);
        if (!visibleCoords || visibleCoords.length === 0) {
            // there is no data so there's nothing to show
            return;
        }

        const visibleRange = visibleCoords.range;

        this._lastX = scroll.x;
        this._lastY = scroll.y;

        if (visibleRange !== this.state.visibleRange) {
            // cells changed
            this._visibleCells = visibleCoords.rows.reduce((cells, rowCoords, index) => {
                const rowCells = rowCoords.map((coord) => this._cellCache[coord]);
                const row = (
                    <div
                        className="ibt-table-row"
                        key={visibleCoords.firstRow + index}
                        aria-rowindex={visibleCoords.firstRow + index + 1}
                        role="row">
                        {rowCells}
                    </div>
                );
                cells.push(row);
                return cells;
            }, []);

            // handle pagination scroll events separately from state changes (which in turn renders
            // the visible cells to DOM)
            // this is because state changes are batched and this batching process causes delayed
            // pagination checks
            if (this.props.onReachedBottom && this._isAtBottom() && this.props.rowCount > 0) {
                if (this._blockPagination) {
                    this._blockPagination = false;
                    return;
                }

                this.props.onReachedBottom();
            }

            this.setState({
                visibleRange
            });
        }
    }

    _calculateVisibleRows(x, y) {
        if (this.props.rowCount === 0 || this.props.columns.length === 0) {
            // there's no data
            return null;
        }

        // allow a buffer of one out-of-view row above and below the visible area
        const mathematicalTopRow = Math.floor(y / this.props.rowHeight);
        const bottomY = y + this.props.bodyHeight;
        const mathematicalBottomRow = Math.ceil(bottomY / this.props.rowHeight);
        const topRow = Math.max(0, mathematicalTopRow - 1);
        const bottomRow = Math.min(this.props.rowCount - 1, mathematicalBottomRow + 1);

        // calculate the visible X range
        const leftX = x;
        const rightX = x + this.props.bodyWidth;

        const visibleColumns = [];
        let leadingColumn = null;
        let trailingColumn = null;

        for (let i = 0; i < this.props.columns.length; i++) {
            const column = this.props.columns[i];
            const columnStartX = column.x;
            const columnEndX = column.x + column.width;

            if (columnEndX < leftX) {
                // column is out of view and is to the left of the visible area
                // use it as a potential leading cell
                leadingColumn = i;
                continue;
            }
            else if (columnStartX > rightX) {
                // column is out of view and is to the right of the visible area
                // use it as a potential trailing cell and stop looping
                trailingColumn = i;
                break;
            }

            visibleColumns.push(i);
        }

        if (leadingColumn) {
            visibleColumns.unshift(leadingColumn);
        }
        if (trailingColumn) {
            visibleColumns.push(trailingColumn);
        }
        const visibleRows = [];

        for (let i = topRow; i <= bottomRow; i++) {
            const rowCells = [];

            for (let j = 0; j < this.props.columns.length; j++) {
                rowCells.push(`${j},${i}`);
            }

            visibleRows.push(rowCells);
        }

        return {
            rows: visibleRows,
            firstRow: topRow,
            lastRow: bottomRow,
            range: `${visibleColumns[0]},${topRow}-${visibleColumns[visibleColumns.length - 1]},${bottomRow}`
        };
    }

    _isAtBottom() {
        const visibleBottom = this._lastY + this.props.bodyHeight;
        // allow a half row buffer at the bottom
        const contentBottom = (this.props.rowCount * this.props.rowHeight) -
            (this.props.rowHeight / 2);

        if (visibleBottom >= contentBottom) {
            return true;
        }
        return false;
    }

    _generateAllCells() {
    // pre-generate all the cells the table will have when the data is initially loaded in
    // we'll pull these from the cache on-the-fly as they come into view

        /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
        // allow keyboard selection of the header cell
        const cellCache = {};
        for (let rowIndex = 0; rowIndex < this.props.rowCount; rowIndex++) {
            this.props.columns.forEach((column, columnIndex) => {
                const cellPositioning = {
                    x: column.x,
                    y: rowIndex * this.props.rowHeight,
                    width: column.width,
                    height: this.props.rowHeight
                };

                const cellContent = this.props.bodyCellRender(columnIndex, rowIndex);

                const coord = `${columnIndex},${rowIndex}`;
                const realCell = (
                    <div
                        key={coord}
                        id={`${this.props.tableId}-cell-${columnIndex}-${rowIndex}`}
                        className="ibt-table-cell"
                        role="gridcell"
                        aria-colindex={columnIndex + 1}
                        aria-rowindex={rowIndex + 1}
                        data-ibt-table-element="cell"
                        data-ibt-table-owner={this.props.tableId}
                        data-ibt-col-index={columnIndex}
                        data-ibt-row-index={rowIndex}
                        tabIndex={0}
                        style={{
                            top: cellPositioning.y,
                            left: cellPositioning.x,
                            height: cellPositioning.height,
                            width: cellPositioning.width
                        }}>
                        {cellContent}
                    </div>
                );
                cellCache[coord] = realCell;
            });
        }

        /* eslint-enable jsx-a11y/no-noninteractive-tabindex */

        this._cellCache = null; // try to explicitly release the previous cache from memory
        this._cellCache = cellCache;

        this._tableScrolled({
            x: this._lastX,
            y: this._lastY
        });
    }

    render() {
        const style = {
            width: this.props.contentWidth,
            height: this.props.rowCount * this.props.rowHeight
        };

        return (
            <div
                className="ibt-table-body-container"
                role="presentation"
                style={style}>
                <div
                    className="ibt-table-body"
                    role="presentation"
                    ref={(div) => {
                        this._tableDiv = div;
                    }}>
                    {this._visibleCells}
                </div>
            </div>
        );
    }
}

TableBody.propTypes = propTypes;
