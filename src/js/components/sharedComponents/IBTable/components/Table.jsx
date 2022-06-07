import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import HeaderRow from './HeaderRow';
import TableBody from './TableBody';

import RenderQueue from '../managers/RenderQueue';
import ScrollManager from '../managers/ScrollManager';

const propTypes = {
    bodyWidth: PropTypes.number,
    bodyHeight: PropTypes.number,
    headerHeight: PropTypes.number,
    contentWidth: PropTypes.number,
    rowCount: PropTypes.number,
    rowHeight: PropTypes.number,
    columns: PropTypes.array,
    onReachedBottom: PropTypes.func,
    headerCellRender: PropTypes.func,
    bodyCellRender: PropTypes.func,
    topScroller: PropTypes.bool
};

const defaultProps = {
    contentWidth: 0,
    bodyWidth: 0,
    bodyHeight: 0,
    headerHeight: 0,
    rowHeight: 0,
    rowCount: 0,
    columns: [],
    topScroller: false
};

const scrollbarHeight = 10;

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this._restorePointerTimer = null;
        this._bodyComponent = null;
        this._tableWrapper = null;
        this._internalDiv = null;
        this._tableId = `${uniqueId()}`;

        this._scrolledTable = this._scrolledTable.bind(this);
        this._scrolledTableTop = this._scrolledTableTop.bind(this);
        this._scrolledTableBottom = this._scrolledTableBottom.bind(this);
    }

    reloadTable() {
    // force the scroll back to the top of the page
        this._tableWrapper.scrollLeft = 0;
        this._tableWrapper.scrollTop = 0;

        // wait for the scroll to complete before changing the row counts (to prevent false
        // pagination)
        window.setTimeout(() => {
            if (this._bodyComponent) {
                this._bodyComponent.reloadTable();
            }
        }, 300);
    }

    _scrolledTableTop() {
        const topBar = document.getElementById("topBar");
        const bottomBar = document.getElementById("bottomBar");
        bottomBar.scrollLeft = topBar.scrollLeft;
        this._scrolledTable();
    }

    _scrolledTableBottom() {
        const topBar = document.getElementById("topBar");
        const bottomBar = document.getElementById("bottomBar");
        topBar.scrollLeft = bottomBar.scrollLeft;
        this._scrolledTable();
    }

    _scrolledTable() {
        const scrollOperation = {
            operation: () => {
                const x = this._tableWrapper.scrollLeft;
                const y = this._tableWrapper.scrollTop;
                ScrollManager.update({
                    x,
                    y
                });
            },
            type: 'scroll',
            isSingle: true,
            args: []
        };

        const pointerOperation = {
            operation: () => {
                if (this._restorePointerTimer) {
                    window.clearTimeout(this.restorePointer);
                    this._restorePointerTimer = null;
                }
                this._internalDiv.style.pointerEvents = 'none';
                this._restorePointerTimer = window.setTimeout(() => {
                    this._internalDiv.style.pointerEvents = 'auto';
                }, 150);
            },
            type: 'pointer',
            isSingle: true,
            args: []
        };

        RenderQueue.addRead(scrollOperation);
        RenderQueue.addWrite(pointerOperation);
    }


    render() {
        const needsVerticalScroll = (this.props.rowCount * this.props.rowHeight) > this.props.bodyHeight;
        const visibleWidth = Math.min(this.props.bodyWidth, this.props.contentWidth);
        const visibleHeight = Math.min(this.props.bodyHeight, this.props.rowCount * this.props.rowHeight);
        const headerStyle = {
            minWidth: visibleWidth,
            maxWidth: visibleWidth,
            maxHeight: this.props.headerHeight,
            minHeight: this.props.headerHeight
        };
        const style = {
            minWidth: visibleWidth,
            maxWidth: visibleWidth,
            minHeight: visibleHeight + this.props.headerHeight
        };
        const topScrollerStyle = {
            minWidth: visibleWidth,
            maxWidth: visibleWidth,
            minHeight: this.props.headerHeight
        };
        const bodyStyle = {
            minWidth: visibleWidth,
            maxWidth: visibleWidth,
            height: needsVerticalScroll ? visibleHeight : visibleHeight + scrollbarHeight
        };

        if (needsVerticalScroll) {
            style.maxHeight = visibleHeight + this.props.headerHeight;
            bodyStyle.maxHeight = visibleHeight;
        }

        const contentStyle = {
            width: this.props.contentWidth,
            height: (this.props.rowCount * this.props.rowHeight)
        };

        let accessibleDescription = `${this.props.columns.length} column`;
        if (this.props.columns.length !== 1) {
            accessibleDescription += 's';
        }
        accessibleDescription += ` and ${this.props.rowCount} row`;
        if (this.props.rowCount !== 1) {
            accessibleDescription += 's';
        }

        const body = (
            <>
                <div
                    className="ibt-table-container"
                    role="grid"
                    aria-rowcount={-1}
                    aria-colcount={this.props.columns.length}
                    aria-label={`This is a table with ${accessibleDescription}. Use your arrow keys to navigate through cells.`}
                    style={style}>
                    <div
                        className="ibt-table-header-container"
                        role="presentation"
                        style={headerStyle}>
                        <HeaderRow
                            tableId={this._tableId}
                            contentWidth={this.props.contentWidth}
                            headerHeight={this.props.headerHeight}
                            columns={this.props.columns}
                            headerCellRender={this.props.headerCellRender} />
                    </div>
                    <div
                        className="ibt-table-body-section"
                        role="presentation"
                        style={bodyStyle}
                        id="bottomBar"
                        onScroll={this._scrolledTable}
                        ref={(div) => {
                            this._tableWrapper = div;
                        }}>
                        <div
                            className="ibt-table-content"
                            role="presentation"
                            style={contentStyle}
                            ref={(div) => {
                                this._internalDiv = div;
                            }}>
                            <TableBody
                                tableId={this._tableId}
                                columns={this.props.columns}
                                contentWidth={this.props.contentWidth}
                                bodyWidth={visibleWidth}
                                bodyHeight={visibleHeight}
                                rowHeight={this.props.rowHeight}
                                rowCount={this.props.rowCount}
                                bodyCellRender={this.props.bodyCellRender}
                                onReachedBottom={this.props.onReachedBottom}
                                ref={(component) => {
                                    this._bodyComponent = component;
                                }} />
                        </div>
                    </div>
                </div>
            </>
        );

        const bodyWithTopScroller = (
            <>
                <div
                    className="ibt-table-container"
                    role="grid"
                    aria-rowcount={-1}
                    aria-colcount={this.props.columns.length}
                    aria-label={`This is a table with ${accessibleDescription}. Use your arrow keys to navigate through cells.`}
                    style={topScrollerStyle}>
                    <div
                        className="ibt-table__top-scroller"
                        id="topBar"
                        onScroll={this._scrolledTableTop}>
                        <div className="ibt-table__scroller" style={contentStyle} />
                    </div>
                    <div
                        className="ibt-table-header-container"
                        role="presentation"
                        style={headerStyle}>
                        <HeaderRow
                            tableId={this._tableId}
                            contentWidth={this.props.contentWidth}
                            headerHeight={this.props.headerHeight}
                            columns={this.props.columns}
                            headerCellRender={this.props.headerCellRender} />
                    </div>
                    <div
                        className="ibt-table-body-section"
                        role="presentation"
                        style={bodyStyle}
                        id="bottomBar"
                        onScroll={this._scrolledTableBottom}
                        ref={(div) => {
                            this._tableWrapper = div;
                        }}>
                        <div
                            className="ibt-table-content"
                            role="presentation"
                            style={contentStyle}
                            ref={(div) => {
                                this._internalDiv = div;
                            }}>
                            <TableBody
                                tableId={this._tableId}
                                columns={this.props.columns}
                                contentWidth={this.props.contentWidth}
                                bodyWidth={visibleWidth}
                                bodyHeight={visibleHeight}
                                rowHeight={this.props.rowHeight}
                                rowCount={this.props.rowCount}
                                bodyCellRender={this.props.bodyCellRender}
                                onReachedBottom={this.props.onReachedBottom}
                                ref={(component) => {
                                    this._bodyComponent = component;
                                }} />
                        </div>
                    </div>
                </div>
            </>
        );

        return (
            <div>
                {this.props.topScroller ? bodyWithTopScroller : body}
            </div>
        );
    }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
