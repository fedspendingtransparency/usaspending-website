/**
 * FederalAccountsTreeTooltip.jsx
 * Created by Jonathan Hill 5/2/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    y: PropTypes.number,
    x: PropTypes.number,
    _federalAccountName: PropTypes.string,
    _obligatedAmount: PropTypes.number,
    _percent: PropTypes.number,
    _fundingAgencyName: PropTypes.string,
    _fundingAgencyAbbreviation: PropTypes.string,
    _fundingAgencyId: PropTypes.number,
    federalAccountName: PropTypes.string,
    obligatedAmount: PropTypes.string,
    percent: PropTypes.string,
    fundingAgencyName: PropTypes.string,
    fundingAgencyAbbreviation: PropTypes.string,
    fundingAgencyId: PropTypes.number
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
        const { percent, obligatedAmount, _federalAccountName } = this.props;
        const subtitle =
        `${this.props._fundingAgencyName} (${this.props._fundingAgencyAbbreviation})`;

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
                        {_federalAccountName}
                    </div>
                    <div className="tooltip-subtitle">
                        FUNDING AGENCY: {subtitle}
                    </div>
                    <div className="tooltip-body">
                        <div className="tooltip-left">
                            <div className="tooltip-value">
                                {obligatedAmount}
                            </div>
                            <div className="tooltip-label">
                                Funded Amount
                            </div>
                        </div>
                        <div className="tooltip-right">
                            <div className="tooltip-value">
                                {percent}
                            </div>
                            <div className="tooltip-label">
                                Percent of Total
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

FederalAccountsTreeTooltip.propTypes = propTypes;
