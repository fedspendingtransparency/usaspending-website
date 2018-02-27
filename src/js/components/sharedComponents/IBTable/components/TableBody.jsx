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

        this._currentlyFocused = false;

        this._tableScrolled = this._tableScrolled.bind(this);

        // bindings for accessibility users
        this._tableFocused = this._tableFocused.bind(this);
        this._tableBlurred = this._tableBlurred.bind(this);
        this._keyPressed = this._keyPressed.bind(this);
    }

    componentDidMount() {
        this._scrollListener = ScrollManager.subscribe(this._tableScrolled);
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
    }

    reloadTable() {
        this.setState({
            visibleRange: ''
        }, () => {
            this._generateAllCells();
        });
    }

    _tableFocused(e) {
        e.stopPropagation();
        if (!this._currentlyFocused) {
            document.addEventListener('keydown', this._keyPressed);
        }

        console.log(e.target);

        this._currentlyFocused = true;
    }

    _tableBlurred() {
        console.log('blurred');
        this._currentlyFocused = false;
        document.removeEventListener('keydown', this._keyPressed);
    }

    _keyPressed(e) {
        if (!this._currentlyFocused || arrowKeys.indexOf(e.key) === -1) {
            return;
        }

        e.preventDefault();

        switch (e.key) {
            case 'ArrowDown':
                break;
            case 'ArrowUp':
                break;
            case 'ArrowLeft':
                break;
            case 'ArrowRight':
                break;
            default:
                return;
        }
    }

    _tableScrolled(scroll) {
        const visibleCoords = this._calculateVisibleCells(scroll.x, scroll.y);
        if (!visibleCoords || visibleCoords.length === 0) {
            // there is no data so there's nothing to show
            return;
        }

        const visibleRange = visibleCoords.range;

        this._lastX = scroll.x;
        this._lastY = scroll.y;

        if (visibleRange !== this.state.visibleRange) {
            // cells changed
            this._visibleCells = visibleCoords.cells.map((coord) => this._cellCache[coord]);

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

    _calculateVisibleCells(x, y) {
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

        const visibleCells = [];

        for (let i = topRow; i <= bottomRow; i++) {
            if (i === topRow) {
                // ensure the last column of the first row is included for accessibility purposes
                if (visibleColumns[visibleColumns.length - 1] !== this.props.columns.length - 1) {
                    visibleCells.push(`${this.props.columns.length - 1},${topRow}`);
                }
            }
            else if (i === bottomRow) {
                // ensure the first column of the last row is included for accessibility purposes
                if (visibleColumns[0] !== 0) {
                    visibleCells.push(`0,${bottomRow}`);
                }
            }

            visibleColumns.forEach((col) => {
                visibleCells.push(`${col},${i}`);
            });
        }

        return {
            cells: visibleCells,
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
                        tabIndex={0}
                        onFocus={this._tableFocused}
                        onBlur={this._tableBlurred}
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
                style={style}>
                <div className="ibt-table-body">
                    {this._visibleCells}
                </div>
            </div>
        );
    }
}

TableBody.propTypes = propTypes;
