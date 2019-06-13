/**
 * FederalAccountsTreeTooltip.jsx
 * Created by Jonathan Hill 5/2/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.object
    // y: PropTypes.number,
    // x: PropTypes.number,
    // _federalAccountName: PropTypes.string,
    // _obligatedAmount: PropTypes.number,
    // _percent: PropTypes.number,
    // _fundingAgencyName: PropTypes.string,
    // _fundingAgencyAbbreviation: PropTypes.string,
    // _fundingAgencyId: PropTypes.number,
    // federalAccountName: PropTypes.string,
    // obligatedAmount: PropTypes.string,
    // percent: PropTypes.string,
    // fundingAgencyName: PropTypes.string,
    // fundingAgencyAbbreviation: PropTypes.string,
    // fundingAgencyId: PropTypes.number
};

export default class IdvActivityTooltip extends React.Component {
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
        if (prevProps.data.x !== this.props.data.x || prevProps.data.y !== this.props.data.y) {
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
        let adjustedX = this.props.data.x - (tooltipWidth / 2);
        if (this.props.data.x + tooltipWidth >= this.state.windowWidth) {
            direction = 'right';
            adjustedX = this.props.data.x - tooltipWidth - 20;
        }

        this.setState({
            direction,
            tooltipStyle: {
                transform: `translate(${adjustedX}px,${this.props.data.y}px)`
            }
        });
    }

    render() {
        // const { percent, obligatedAmount, _federalAccountName } = this.props;
        // const subtitle =
        // `${this.props._fundingAgencyName} (${this.props._fundingAgencyAbbreviation})`;

        return (
            <div className="visualization-tooltip">
                <div
                    className={`tooltip ${this.state.direction}`}
                    style={this.state.tooltipStyle}
                    ref={(div) => {
                        this.div = div;
                    }}>
                      Hi jon
                </div>
            </div>
        );
    }
}

IdvActivityTooltip.propTypes = propTypes;
