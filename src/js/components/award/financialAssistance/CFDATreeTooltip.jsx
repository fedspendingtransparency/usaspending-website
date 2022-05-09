
/**
 * CFDATreeTooltip.jsx
 * Created by Jonathan Hill 03/19/20
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    y: PropTypes.number,
    x: PropTypes.number,
    cfdaNumber: PropTypes.string,
    cfdaTitle: PropTypes.string,
    federalActionOblicationAmount: PropTypes.string,
    percentOfTotal: PropTypes.string,
    cfdaFederalAgency: PropTypes.string
};

export default class CFDATreeTooltip extends React.Component {
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
        if (adjustedX.toString().startsWith('-')) {
            direction = 'left';
            adjustedX = (this.props.x - adjustedX);
        }

        this.setState({
            direction,
            tooltipStyle: {
                transform: `translate(${adjustedX}px,${this.props.y}px)`
            }
        });
    }

    render() {
        const {
            cfdaNumber,
            cfdaTitle,
            percentOfTotal,
            cfdaFederalAgency,
            federalActionOblicationAmount
        } = this.props;

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
                        {`${cfdaNumber} - ${cfdaTitle}`}
                    </div>
                    <div className="tooltip-subtitle">
                        FEDERAL AGENCY: {cfdaFederalAgency}
                    </div>
                    <div className="tooltip-body">
                        <div className="tooltip-left">
                            <div className="tooltip-value">
                                {federalActionOblicationAmount}
                            </div>
                            <div className="tooltip-label">
                                Funded Amount
                            </div>
                        </div>
                        <div className="tooltip-right">
                            <div className="tooltip-value">
                                {percentOfTotal}
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

CFDATreeTooltip.propTypes = propTypes;
