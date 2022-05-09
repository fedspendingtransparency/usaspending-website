/**
 * ExplorerTooltip.jsx -> RecipientMapTooltip.jsx
 * Created by Jonathan Hill 07/21/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    y: PropTypes.number,
    x: PropTypes.number,
    name: PropTypes.string,
    amount: PropTypes.object,
    awards: PropTypes.object
};

export default class RecipientMapTooltip extends React.Component {
    componentDidMount() {
        this.positionTooltip();
    }
    componentDidUpdate() {
        this.positionTooltip();
    }

    positionTooltip() {
    // we need to wait for the tooltip to render before we can full position it due to its
    // dynamic width
        const tooltipWidth = this.div.offsetWidth;
        const containerX = this.containerDiv.getBoundingClientRect().left;
        const windowWidth = window.innerWidth;

        // determine the tooltip direction
        let direction = 'left';
        // // allow 20px padding
        if (tooltipWidth + containerX + this.props.x >= windowWidth - 20) {
            direction = 'right';
        }

        // offset the tooltip position to account for its arrow/pointer
        let offset = -9;
        if (direction === 'right') {
            offset = 9 + tooltipWidth;
        }

        this.div.style.top = `${this.props.y - 15}px`;
        this.div.style.left = `${this.props.x - offset}px`;
        this.div.className = `tooltip ${direction}`;
        this.pointerDiv.className = `tooltip-pointer ${direction}`;
    }

    render() {
        const truncatedName = truncate(this.props.name, { length: 90 });
        const dollarValue = MoneyFormatter.formatTreemapValues(this.props.amount.value);

        return (
            <div
                className="visualization-tooltip"
                ref={(div) => {
                    this.containerDiv = div;
                }}>
                <div
                    className="tooltip"
                    ref={(div) => {
                        this.div = div;
                    }}>
                    <div
                        className="tooltip-pointer"
                        ref={(div) => {
                            this.pointerDiv = div;
                        }} />
                    <div className="tooltip-title">
                        {truncatedName}
                    </div>
                    <div className="tooltip-body">
                        <div className="tooltip-left">
                            <div className="tooltip-value">
                                {dollarValue}
                            </div>
                            <div className="tooltip-label">
                                {this.props.amount.label}
                            </div>
                        </div>
                        <div className="tooltip-right">
                            <div className="tooltip-value">
                                {this.props.awards.value}
                            </div>
                            <div className="tooltip-label">
                                {this.props.awards.label}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RecipientMapTooltip.propTypes = propTypes;
