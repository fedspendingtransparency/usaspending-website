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
    bodyCellRender: PropTypes.func
};

const defaultProps = {
    contentWidth: 0,
    bodyWidth: 0,
    bodyHeight: 0,
    headerHeight: 0,
    rowHeight: 0,
    rowCount: 0,
    columns: []
};

const scrollbarHeight = 10;

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this._restorePointerTimer = null;

        this._headerComponent = null;
        this._bodyComponent = null;

        this._tableWrapper = null;
        this._internalDiv = null;
        this._tableId = `${uniqueId()}`;

        this._scrolledTable = this._scrolledTable.bind(this);
        this._scrolledHeader = this._scrolledHeader.bind(this);
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

    scrollTo(x, y) {
        const scrollOperation = {
            operation: () => {
                if (!this._tableWrapper || !this._headerWrapper) {
                    return;
                }

                this._tableWrapper.scrollLeft = x;
                this._tableWrapper.scrollTop = y;
                this._headerWrapper.scrollLeft = 0;
            },
            type: 'overrideScroll',
            isSingle: true,
            args: []
        };

        RenderQueue.addWrite(scrollOperation);
    }

    _scrolledHeader() {
        // The header can only scroll through the use of accessibility hooks.
        // Because there are two scrolling elements (the transform offset + the scroll offset), we
        // need to combine them into a single scroll offset.
        const scrollOperation = {
            operation: () => {
                const realX = this._headerWrapper.scrollLeft + this._headerComponent.currentX;
                const x = realX;
                const y = this._tableWrapper.scrollTop;
                ScrollManager.update({
                    x,
                    y
                });

                // Scroll events in the table body will be applied as transforms while native
                // header scrolls via accessibility hooks, so we need to reset the header scrollLeft
                // to 0 and apply the full horizontal offset via transforms.
                // By calling the scrollTo function, we will apply the full horizontal offset to the
                // table body while simultaneously resetting the header scrollLeft to 0. The table
                // body's scrollLeft change will trigger the same scroll event that occurs from
                // native mouse scrolls in the table body (_scrolledTable). _scrolledTable will
                // synchronize the horizontal offset in the header entirely via transforms.
                this.scrollTo(x, y);
            },
            type: 'scroll',
            isSingle: true,
            args: []
        };

        RenderQueue.addRead(scrollOperation);
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

        return (
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
                    style={headerStyle}
                    onScroll={this._scrolledHeader}
                    ref={(div) => {
                        this._headerWrapper = div;
                    }}>
                    <HeaderRow
                        tableId={this._tableId}
                        contentWidth={this.props.contentWidth}
                        headerHeight={this.props.headerHeight}
                        columns={this.props.columns}
                        headerCellRender={this.props.headerCellRender}
                        ref={(component) => {
                            this._headerComponent = component;
                        }} />
                </div>
                <div
                    className="ibt-table-body-section"
                    role="presentation"
                    style={bodyStyle}
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
        );
    }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
