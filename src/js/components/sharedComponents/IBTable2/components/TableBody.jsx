/**
 * TableBody.jsx
 * Created by Kevin Li 12/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ScrollManager from './ScrollManager';

const propTypes = {
    rowCount: PropTypes.number,
    rowHeight: PropTypes.number,
    bodyHeight: PropTypes.number,
    bodyWidth: PropTypes.number,
    contentWidth: PropTypes.number,
    onReachedBottom: PropTypes.func
};

const watchedProps = ['rowCount', 'rowHeight', 'bodyHeight'];

export default class TableBody extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            visibleCoords: ''
        };

        this.lastX = 0;
        this.lastY = 0;

        this.columns = [];

        this.cellCache = {};
        this.visibleCells = [];
        this.memoizedCells = {};

        this.scrollListener = null;

        this.tableScrolled = this.tableScrolled.bind(this);
    }

    componentDidMount() {
        this.scrollListener = ScrollManager.subscribe(this.tableScrolled);
    }

    componentDidUpdate(prevProps) {
        for (const prop of watchedProps) {
            if (prevProps[prop] !== this.props[prop]) {
                this.generateAllCells();
                break;
            }
        }
    }

    componentWillUnmount() {
        if (this.scrollListener) {
            ScrollManager.unsubscribe(this.scrollListener);
        }
    }

    updateColumns(columns) {
        this.columns = columns;
        this.generateAllCells();
    }

    updateRows() {
        this.setState({
            visibleCoords: ''
        }, () => {
            this.generateAllCells();
        });
    }

    tableScrolled(scroll) {
        const visibleCells = this.calculateVisibleCells(scroll.x, scroll.y);
        if (!visibleCells) {
            // there is no data so there's nothing to show
            return;
        }

        const visibleCoords = `${visibleCells[0]}-${visibleCells[visibleCells.length - 1]}`;

        this.lastX = scroll.x;
        this.lastY = scroll.y;

        if (visibleCoords !== this.state.visibleCoords) {
            // cells changed
            this.visibleCells = null;
            this.visibleCells = visibleCells;
            this.setState({
                visibleCoords
            }, () => {
                if (this.isAtBottom() && this.props.rowCount > 0) {
                    this.props.onReachedBottom();
                }
            });
        }
    }

    calculateVisibleCells(x, y) {
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

        for (let i = 0; i < this.columns.length; i++) {
            const column = this.columns[i];
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
                if (visibleColumns[visibleColumns.length - 1] !== this.columns.length - 1) {
                    visibleCells.push(`${this.columns.length - 1},${topRow}`);
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

    isAtBottom() {
        const visibleBottom = this.lastY + this.props.bodyHeight;
        // allow a half row buffer at the bottom
        const contentBottom = (this.props.rowCount * this.props.rowHeight) -
            (this.props.rowHeight / 2);
        if (visibleBottom >= contentBottom) {
            return true;
        }
        return false;
    }

    clearMemory() {
        this.cellCache = null;
        this.visibleCells = null;
    }

    generateAllCells() {
        const cellCache = {};
        for (let i = 0; i < this.props.rowCount; i++) {
            this.columns.forEach((column, columnIndex) => {
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

        this.cellCache = cellCache;

        this.tableScrolled({
            x: this.lastX,
            y: this.lastY
        });
    }

    render() {
        const cells = this.visibleCells.map((coord) => this.cellCache[coord]);

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
