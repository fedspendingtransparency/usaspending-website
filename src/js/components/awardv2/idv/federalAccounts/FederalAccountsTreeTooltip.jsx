/**
 * FederalAccountsTreeTooltip.jsx
 * Created by Kevin Li 8/25/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    y: PropTypes.number,
    x: PropTypes.number,
    _federalAccountName: PropTypes.string,
    _obligatedAmount: PropTypes.number,
    _percent: PropTypes.number,
    _funding_agency_name: PropTypes.string,
    _funding_agency_abbreviation: PropTypes.string
};

export default class FederalAccountsTreeTooltip extends React.Component {
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
        const name = this.props._federalAccountName;
        const dollarValue = MoneyFormatter.formatTreemapValues(this.props._obligatedAmount);
        const percentString = `${Math.round(this.props._percent)}%`;
        const subtitle =
        `Funding Agency: ${this.props._funding_agency_name} (${this.props._funding_agency_abbreviation})`;

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
                        {name}
                    </div>
                    <div className="tooltip-subtitle">
                        {subtitle}
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
                </div>
            </div>
        );
    }
}

FederalAccountsTreeTooltip.propTypes = propTypes;
