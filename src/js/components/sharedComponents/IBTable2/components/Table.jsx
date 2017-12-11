import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import HeaderRow from './HeaderRow';
import TableBody from './TableBody';

import RenderQueue from './RenderQueue';
import ScrollManager from './ScrollManager';

const propTypes = {
    bodyWidth: PropTypes.number,
    bodyHeight: PropTypes.number,
    headerHeight: PropTypes.number,
    contentWidth: PropTypes.number,
    rowCount: PropTypes.number,
    rowHeight: PropTypes.number,
    columns: PropTypes.array,
    onReachedBottom: PropTypes.func
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


export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollbarHeight: 0
        };

        this.restorePointer = null;

        this.tableInstance = null;

        this.headerComponent = null;
        this.bodyComponent = null;

        this.scrolledTable = this.scrolledTable.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.columns, this.props.columns)) {
            this.updateColumns(this.props.columns);
        }
    }

    updateRows() {
        if (this.bodyComponent) {
            this.bodyComponent.updateRows();
        }
    }

    updateColumns(columns) {
        const scrollbarHeight = this.measureHorizontalScrollbar();
        this.setState({
            scrollbarHeight
        }, () => {
            if (this.bodyComponent) {
                this.bodyComponent.updateColumns(columns);
            }
        });
    }

    scrollTo(x, y) {
        const scrollOperation = {
            operation: () => {
                this.tableWrapper.scrollLeft = x;
                this.tableWrapper.scrollTop = y;
                ScrollManager.update({
                    x,
                    y
                });
            },
            type: 'overrideScroll',
            isSingle: true,
            args: []
        };

        RenderQueue.addWrite(scrollOperation);
    }

    scrolledTable() {
        const scrollOperation = {
            operation: () => {
                const x = this.tableWrapper.scrollLeft;
                const y = this.tableWrapper.scrollTop;
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
                if (this.restorePointer) {
                    window.clearTimeout(this.restorePointer);
                    this.restorePointer = null;
                }
                this.internalDiv.style.pointerEvents = 'none';
                this.restorePointer = window.setTimeout(() => {
                    this.internalDiv.style.pointerEvents = 'auto';
                }, 150);
            },
            type: 'pointer',
            isSingle: true,
            args: []
        };

        RenderQueue.addRead(scrollOperation);
        RenderQueue.addWrite(pointerOperation);
    }

    measureHorizontalScrollbar() {
        let scrollbarHeight = 0;
        // measure how much vertical space is inside the container
        const containerInternalHeight = this.tableWrapper.clientHeight;
        // measure how much vertical space the container takes up on the page
        const containerExternalHeight = this.tableWrapper.offsetHeight;

        if (containerInternalHeight < containerExternalHeight) {
            // the internal height is less than the external height, this means that some of the
            // internal height height is being blocked by a horizontal scrollbar (which takes up
            // vertical space)
            scrollbarHeight = containerExternalHeight - containerInternalHeight;
        }

        return scrollbarHeight;
    }

    render() {
        const style = {
            minWidth: this.props.bodyWidth,
            maxWidth: this.props.bodyWidth,
            maxHeight: this.props.bodyHeight + this.props.headerHeight + this.state.scrollbarHeight,
            minHeight: this.props.bodyHeight + this.props.headerHeight + this.state.scrollbarHeight
        };

        const headerStyle = {
            minWidth: this.props.bodyWidth,
            maxWidth: this.props.bodyWidth,
            maxHeight: this.props.headerHeight,
            minHeight: this.props.headerHeight
        };

        const bodyStyle = {
            minWidth: this.props.bodyWidth,
            maxWidth: this.props.bodyWidth,
            maxHeight: this.props.bodyHeight + this.state.scrollbarHeight,
            minHeight: this.props.bodyHeight + this.state.scrollbarHeight
        };

        const contentStyle = {
            width: this.props.contentWidth,
            height: (this.props.rowCount * this.props.rowHeight)
        };

        return (
            <div
                className="ibt-table-container"
                style={style}>
                <div
                    className="ibt-table-header-container"
                    style={headerStyle}>
                    <HeaderRow
                        contentWidth={this.props.contentWidth}
                        headerHeight={this.props.headerHeight}
                        columns={this.props.columns}
                        ref={(component) => {
                            this.headerComponent = component;
                        }} />
                </div>
                <div
                    className="ibt-table-body-section"
                    style={bodyStyle}
                    onScroll={this.scrolledTable}
                    ref={(div) => {
                        this.tableWrapper = div;
                    }}>
                    <div
                        className="ibt-table-content"
                        style={contentStyle}
                        ref={(div) => {
                            this.internalDiv = div;
                        }}>
                        <TableBody
                            contentWidth={this.props.contentWidth}
                            bodyWidth={this.props.bodyWidth}
                            bodyHeight={this.props.bodyHeight}
                            headerHeight={this.props.headerHeight}
                            rowHeight={this.props.rowHeight}
                            rowCount={this.props.rowCount}
                            onReachedBottom={this.props.onReachedBottom}
                            ref={(component) => {
                                this.bodyComponent = component;
                            }} />
                    </div>
                </div>
            </div>
        );
    }

}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
