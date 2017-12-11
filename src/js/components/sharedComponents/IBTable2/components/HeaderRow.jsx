/**
 * HeaderRow.jsx
 * Created by Kevin Li 12/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ScrollManager from './ScrollManager';
import RenderQueue from './RenderQueue';

const propTypes = {
    contentWidth: PropTypes.number,
    headerHeight: PropTypes.number,
    columns: PropTypes.array
};

export default class HeaderRow extends React.Component {
    constructor(props) {
        super(props);

        this.scrollListener = null;
        this.lastX = 0;

        this.tableScrolled = this.tableScrolled.bind(this);
    }

    componentDidMount() {
        this.scrollListener = ScrollManager.subscribe(this.tableScrolled);
    }

    componentWillUnmount() {
        if (this.scrollListener) {
            ScrollManager.unsubscribe(this.scrollListener);
        }
    }

    tableScrolled(scroll) {
        if (scroll.x !== this.lastX) {
            const headerOperation = {
                operation: () => {
                    if (this.headerDiv) {
                        this.headerDiv.style.transform = `translate(${-1 * scroll.x}px, 0px)`;
                    }
                },
                type: 'header',
                isSingle: true,
                args: []
            };

            RenderQueue.addWrite(headerOperation);

            this.lastX = scroll.x;
        }
    }

    render() {
        const style = {
            width: this.props.contentWidth,
            height: this.props.headerHeight,
            top: 0
        };

        const cells = this.props.columns.map((column) => {
            const cellStyle = {
                width: column.width,
                height: this.props.headerHeight
            };

            const headerData = column.header();

            const headerCell = React.createElement(
                headerData.headerClass,
                headerData.additionalProps
            );
            return (
                <div
                    key={column.identifier}
                    className="ibt-header-cell"
                    style={cellStyle}>
                    {headerCell}
                </div>
            );
        });

        return (
            <div
                className="ibt-header"
                style={style}
                ref={(div) => {
                    this.headerDiv = div;
                }}>
                <div
                    className="ibt-header-row">
                    {cells}
                </div>
            </div>
        );
    }
}

HeaderRow.propTypes = propTypes;
