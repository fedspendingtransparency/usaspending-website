/**
 * ExplorerTooltip.jsx
 * Created by Kevin Li 8/25/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    y: PropTypes.number,
    x: PropTypes.number,
    name: PropTypes.string,
    amount: PropTypes.number,
    percent: PropTypes.number,
    total: PropTypes.number
};

export default class ExplorerTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            direction: 'top',
            tooltipStyle: {
                transform: ''
            },
            windowWidth: 0,
            windowHeight: 0
        };

        this.measureWindow = this.measureWindow.bind(this);
    }
    componentDidMount() {
        this.measureWindow();
        window.addEventListener('resize', this.measureWindow);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.x !== this.props.x || prevProps.y !== this.props.y) {
            this.positionTooltip();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureWindow);
    }

    measureWindow() {
        const windowWidth = window.innerWidth || document.documentElement.clientWidth
            || document.body.clientWidth;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight
            || document.body.clientHeight;

        this.setState({
            windowWidth,
            windowHeight
        }, () => {
            this.positionTooltip();
        });
    }

    positionTooltip() {
    // measure the tooltip width
        const tooltipWidth = this.div.offsetWidth;

        let direction = 'top';

        // adjust the X position so the tooltip is centered at X
        let adjustedX = this.props.x - (tooltipWidth / 2);
        if (this.props.x + tooltipWidth >= this.state.windowWidth) {
            direction = 'right';
            adjustedX = this.props.x - tooltipWidth - 20;
        }

        this.setState({
            direction,
            tooltipStyle: {
                transform: `translate(${adjustedX}px,${this.props.y}px)`
            }
        });
    }

    render() {
        const dollarValue = MoneyFormatter.formatMoney(this.props.amount);
        const totalDollar = MoneyFormatter.formatTreemapValues(this.props.total);
        const percentString = `${(Math.round(this.props.percent * 1000) / 10)}%`;

        let hideDisclaimer = 'hide';
        if ((this.props.amount !== this.props.total) && this.props.name !== 'Non-Award Spending') {
            hideDisclaimer = '';
        }

        return (
            <div className="visualization-tooltip">
                <div
                    className={`tooltip ${this.state.direction}`}
                    style={this.state.tooltipStyle}
                    ref={(div) => {
                        this.div = div;
                    }}>
                    <div
                        className={`tooltip-pointer ${this.state.direction}`} />
                    <div className="tooltip-title">
                        Award ID: {this.props.name}
                    </div>
                    <div className="tooltip-body">
                        <div className="tooltip-left">
                            <div className="tooltip-value">
                                {dollarValue}
                            </div>
                            <div className="tooltip-label">
                                Total Amount
                            </div>
                        </div>
                        <div className="tooltip-right">
                            <div className="tooltip-value">
                                {percentString}
                            </div>
                            <div className="tooltip-label">
                                Percent
                            </div>
                        </div>
                    </div>
                    <div className={`disclaimer-total ${hideDisclaimer}`}>
                        The amount shown above is a portion of a larger award that is {totalDollar}.
                    </div>
                </div>
            </div>
        );
    }
}

ExplorerTooltip.propTypes = propTypes;
