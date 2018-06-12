/**
 * HeaderRow.jsx
 * Created by Kevin Li 12/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ScrollManager from '../managers/ScrollManager';
import RenderQueue from '../managers/RenderQueue';

const propTypes = {
    tableId: PropTypes.string,
    contentWidth: PropTypes.number,
    headerHeight: PropTypes.number,
    columns: PropTypes.array,
    headerCellRender: PropTypes.func
};

export default class HeaderRow extends React.Component {
    constructor(props) {
        super(props);

        this._scrollListener = null;
        this._lastX = 0;
        this._headerDiv = null;

        this._tableScrolled = this._tableScrolled.bind(this);
    }

    componentDidMount() {
        this._scrollListener = ScrollManager.subscribe(this._tableScrolled);
    }

    componentWillUnmount() {
        if (this._scrollListener) {
            ScrollManager.unsubscribe(this._scrollListener);
        }
    }

    get currentX() {
        return this._lastX;
    }

    _tableScrolled(scroll) {
        if (scroll.x !== this._lastX) {
            const headerOperation = {
                operation: () => {
                    if (this._headerDiv) {
                        this._headerDiv.style.transform = `translate(${-1 * scroll.x}px, 0px)`;
                    }
                },
                type: 'header',
                isSingle: true,
                args: []
            };

            RenderQueue.addWrite(headerOperation);

            this._lastX = scroll.x;
        }
    }

    render() {
        const style = {
            width: this.props.contentWidth,
            height: this.props.headerHeight,
            top: 0
        };

        const cells = this.props.columns.map((column, index) => {
            const cellStyle = {
                width: column.width,
                height: this.props.headerHeight
            };

            const headerCell = this.props.headerCellRender(index);

            return (
                <div
                    key={index}
                    className="ibt-header-cell"
                    role="columnheader"
                    id={`${this.props.tableId}-header-${index}`}
                    style={cellStyle}>
                    {headerCell}
                </div>
            );
        });

        return (
            <div
                className="ibt-header"
                role="presentation"
                style={style}
                ref={(div) => {
                    this._headerDiv = div;
                }}>
                <div
                    className="ibt-header-row"
                    role="row">
                    {cells}
                </div>
            </div>
        );
    }
}

HeaderRow.propTypes = propTypes;
