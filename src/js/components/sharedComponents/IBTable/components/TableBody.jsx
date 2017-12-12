/**
 * TableBody.jsx
 * Created by Kevin Li 12/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ScrollManager from '../managers/ScrollManager';

const propTypes = {
    rowCount: PropTypes.number,
    rowHeight: PropTypes.number,
    bodyHeight: PropTypes.number,
    bodyWidth: PropTypes.number,
    contentWidth: PropTypes.number,
    onReachedBottom: PropTypes.func
};

const watchedProps = ['rowCount', 'rowHeight', 'bodyHeight', 'contentWidth'];

export default class TableBody extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            visibleCoords: ''
        };

        this._lastX = 0;
        this._lastY = 0;

        this._columns = [];

        this._cellCache = {};
        this._visibleCells = [];

        this._scrollListener = null;

        this._tableScrolled = this._tableScrolled.bind(this);
    }

    componentDidMount() {
        this._scrollListener = ScrollManager.subscribe(this._tableScrolled);
    }

    componentDidUpdate(prevProps) {
        for (const prop of watchedProps) {
            if (prevProps[prop] !== this.props[prop]) {
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

    updateColumns(columns) {
        this._columns = columns;
        this._generateAllCells();
    }

    updateRows() {
        this.setState({
            visibleCoords: ''
        }, () => {
            this._generateAllCells();
        });
    }

    _tableScrolled(scroll) {
        const visibleCells = this._calculateVisibleCells(scroll.x, scroll.y);
        if (!visibleCells) {
            // there is no data so there's nothing to show
            return;
        }

        const visibleCoords = `${visibleCells[0]}-${visibleCells[visibleCells.length - 1]}`;

        this._lastX = scroll.x;
        this._lastY = scroll.y;

        if (visibleCoords !== this.state.visibleCoords) {
            // cells changed
            this._visibleCells = null;
            this._visibleCells = visibleCells;
            this.setState({
                visibleCoords
            }, () => {
                if (this.props.onReachedBottom && this._isAtBottom() && this.props.rowCount > 0) {
                    this.props.onReachedBottom();
                }
            });
        }
    }

    _calculateVisibleCells(x, y) {
        if (this.props.rowCount === 0) {
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

        for (let i = 0; i < this._columns.length; i++) {
            const column = this._columns[i];
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
                if (visibleColumns[visibleColumns.length - 1] !== this._columns.length - 1) {
                    visibleCells.push(`${this._columns.length - 1},${topRow}`);
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

        return visibleCells;
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
        const cellCache = {};
        for (let i = 0; i < this.props.rowCount; i++) {
            this._columns.forEach((column, columnIndex) => {
                const cellData = column.cell(i);

                const virtualCell = {
                    x: column.x,
                    y: i * this.props.rowHeight,
                    width: column.width,
                    height: this.props.rowHeight,
                    child: {
                        cellClass: cellData.cellClass,
                        props: Object.assign({}, cellData.additionalProps, {
                            columnIndex
                        })
                    }
                };
                const cellContent = React.createElement(
                    virtualCell.child.cellClass,
                    virtualCell.child.props
                );
                const coord = `${columnIndex},${i}`;
                const realCell = (
                    <div
                        key={coord}
                        className="ibt-table-cell"
                        style={{
                            top: virtualCell.y,
                            left: virtualCell.x,
                            height: virtualCell.height,
                            width: virtualCell.width
                        }}>
                        {cellContent}
                    </div>
                );
                cellCache[coord] = realCell;
            });
        }

        this._cellCache = cellCache;

        this._tableScrolled({
            x: this._lastX,
            y: this._lastY
        });
    }

    render() {
        const cells = this._visibleCells.map((coord) => this._cellCache[coord]);

        const style = {
            width: this.props.contentWidth,
            height: this.props.rowCount * this.props.rowHeight
        };

        return (
            <div
                className="ibt-table-body-container"
                style={style}>
                <div className="ibt-table-body">
                    {cells}
                </div>
            </div>
        );
    }
}

TableBody.propTypes = propTypes;
