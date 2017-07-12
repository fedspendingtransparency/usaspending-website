/**
  * TableBody.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';
import { max, min } from 'lodash';
import TableRow from './TableRow';

const propTypes = {
    rowHeight: React.PropTypes.number.isRequired,
    rowCount: React.PropTypes.number.isRequired,
    maxWidth: React.PropTypes.number.isRequired,
    maxHeight: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    columns: React.PropTypes.array.isRequired,
    dataHash: React.PropTypes.string,
    onScrollEnd: React.PropTypes.func,
    syncScrollPosition: React.PropTypes.func
};

export default class TableBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleRows: [],
            horizontalScrollbar: 0
        };

        // scroll position is used for reference only
        // setting it outside of state keeps it from triggering render cycles
        this.scrollPosition = {
            x: 0,
            y: 0
        };

        this.scrollHolder = {
            x: 0,
            y: 0
        };

        this.lastRender = '';
        this.scrollEndEvent = null;
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.prepareCellsForDisplay();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rowCount !== this.props.rowCount) {
            // the row count changed, indicating a new page of data was appended
            this.prepareCellsForDisplay();
        }
        else if (prevProps.dataHash !== this.props.dataHash) {
            // the data hash changed, indicating the table data needs to be updated
            this.prepareCellsForDisplay();
        }
        else if (prevProps.maxWidth !== this.props.maxWidth) {
            // the container width changed (likely due to window resize)
            // this will require recalculation
            this.prepareCellsForDisplay();
        }
    }

    handleScroll(e) {
        const xScroll = e.target.scrollLeft;
        const yScroll = e.target.scrollTop;

        let positionChanged = false;

        if (xScroll !== this.scrollPosition.x) {
            // we have scrolled left or right
            // even though the vertical header won't be visible for during a horizontal scroll
            // we need to keep its position in sync so when it reappears for vertical scrolls it is
            // in the correct position
            this.props.syncScrollPosition(xScroll, 0);
            positionChanged = true;
        }

        if (yScroll !== this.scrollPosition.y) {
            // we have scrolled up or down
            positionChanged = true;
            // this.syncHorizontalScrollPosition(yScroll);
        }

        this.scrollPosition = {
            x: xScroll,
            y: yScroll
        };

        if (positionChanged) {
            this.prepareCellsForDisplay();
        }

        // cancel any previous scrollEnd timers
        if (this.scrollEndEvent) {
            window.clearTimeout(this.scrollEndEvent);
            this.scrollEndEvent = null;
        }
        // trigger a scroll event in 300ms unless another scroll event is issued
        this.scrollEndEvent = window.setTimeout(() => {
            this.scrollDidEnd();
        }, 300);
    }

    scrollDidEnd() {
        // execute the prop function associated with scroll end if it exists
        if (this.props.onScrollEnd) {
            this.props.onScrollEnd(this.scrollPosition.x, this.scrollPosition.y);
        }
    }

    syncHorizontalScrollPosition(y) {
        // directly modify the DOM CSS element rather than trigger re-renders via prop changes
        this.headerRow.updateScrollPosition(0, y);
    }

    resetScroll() {
        this.setState({
            x: 0,
            y: 0
        }, () => {
            this.containerDiv.scrollTop = 0;
            this.containerDiv.scrollLeft = 0;
        });
    }

    isColumnVisible(columnLeft, columnRight, visibleLeft, visibleRight) {
        // check if the left side is inside the bounds
        if (columnLeft >= visibleLeft && columnLeft <= visibleRight) {
            // if the left edge of the column is within the visible bounds, then the column is
            // visible
            return true;
        }
        else if (columnRight >= visibleLeft && columnRight <= visibleRight) {
            // this is a partially obscured column, where the left side is out of bounds
            // however, it is still in view if the right side is inside the bounds
            return true;
        }
        else if (columnLeft <= visibleLeft && columnRight >= visibleRight) {
            // a final edge case for a very wide column/narrow table, where the left side is
            // left of the visible bounds but the right side is also right of the visible bounds
            // aka, it extends beyond both edges (the middle is visible)
            return true;
        }
        // otherwise, it's not in view
        return false;
    }

    isHorizontalScrollbarVisible() {
        if (!this.containerDiv) {
            // nothing has been rendered to screen yet
            return 0;
        }

        // measure how much vertical space is inside the container
        const containerInternalHeight = this.containerDiv.clientHeight;
        // measure how much vertical space the container takes up on the page
        const containerExternalHeight = this.containerDiv.offsetHeight;

        if (containerInternalHeight < containerExternalHeight) {
            // the internal height is less than the external height, this means that some of the
            // internal height height is being blocked by a horizontal scrollbar (which takes up
            // vertical space)
            return containerExternalHeight - containerInternalHeight;
        }

        // otherwise assume no scrollbar
        return 0;
    }


    prepareCellsForDisplay() {
        // only render the rows and columns that are visible within the current table bounds
        const rows = [];
        const columns = [];

        if (this.props.rowCount < 1) {
            // no rows to show
            // set the state to show no rows
            this.setState({
                visibleRows: []
            });
            return;
        }

        // determine the first visible row
        // add one row as a bonus padding row unless we're at the top
        const topRowIndex = max([0,
            Math.floor(this.scrollPosition.y / this.props.rowHeight) - 1]);

        // determine the last possible row index for the given row count
        const finalRowIndex = this.props.rowCount - 1;
        // determine what the row index would be if the current view is vertically full
        // add one row as a bonus padding row
        const viewBottomIndex = topRowIndex +
            Math.ceil(this.props.maxHeight / this.props.rowHeight) + 1;
        // the bottom row of the current view is the lesser of the two
        const bottomRowIndex = min([viewBottomIndex, finalRowIndex]);

        // determine which columns are in view
        let tableXPos = 0;
        let firstCol;
        let lastCol;

        this.props.columns.forEach((col) => {
            const column = col;
            const columnRightEdge = tableXPos + column.width;
            if (this.isColumnVisible(tableXPos, columnRightEdge, this.scrollPosition.x,
                    this.scrollPosition.x + this.props.maxWidth)) {
                // the column is in view
                column.left = tableXPos;
                columns.push(column);

                if (!firstCol) {
                    firstCol = column.columnId;
                }
                else {
                    lastCol = column.columnId;
                }
            }

            // move onto the next column
            tableXPos += column.width;
        });

        // generate a string representation of the visible cell coordinates
        const renderCoords =
            `${topRowIndex}-${bottomRowIndex}_${firstCol}-${lastCol}-${this.props.dataHash}`;

        // don't re-render if the render coords are the same and the underlying data hasn't changed
        if (this.lastRender === renderCoords) {
            return;
        }

        this.lastRender = renderCoords;

        for (let i = topRowIndex; i <= bottomRowIndex; i++) {
            const row = (<TableRow
                {...this.props}
                rowIndex={i}
                visibleCoords={`${firstCol}-${lastCol}`}
                visibleColumns={columns}
                key={`row-${i}`} />);
            rows.push(row);
        }

        this.setState({
            visibleRows: rows,
            horizontalScrollbar: this.isHorizontalScrollbarVisible()
        });
    }

    render() {
        const totalHeight = (this.props.rowCount * this.props.rowHeight);

        const visibleHeight = min([this.props.maxHeight, totalHeight]);
        const visibleWidth = min([this.props.maxWidth, this.props.width]);

        const style = {
            minHeight: visibleHeight,
            maxHeight: visibleHeight + this.state.horizontalScrollbar,
            width: visibleWidth
        };

        const internalStyle = {
            height: totalHeight,
            width: this.props.width
        };

        return (
            <div
                className="ibt-table-body-container"
                style={style}
                onScroll={this.handleScroll}
                ref={(div) => {
                    this.containerDiv = div;
                }}>
                <div className="ibt-table-body" style={internalStyle}>
                    {this.state.visibleRows}
                </div>
            </div>
        );
    }
}

TableBody.propTypes = propTypes;
