/**
 * InfoTooltip.jsx
 * Created by Lizzie Salita 3/8/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { InfoCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    children: PropTypes.node,
    left: PropTypes.bool,
    wide: PropTypes.bool
};

const defaultProps = {
    wide: false
};

export default class InfoTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfoTooltip: false,
            offsetTop: 0,
            offsetRight: 0
        };
        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
        this.measureOffset = throttle(this.measureOffset.bind(this), 16);
    }

    componentDidMount() {
        this.measureOffset();
        window.addEventListener('scroll', this.measureOffset);
        window.addEventListener('resize', this.measureOffset);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.measureOffset);
        window.removeEventListener('resize', this.measureOffset);
    }

    showTooltip() {
        this.setState({
            showInfoTooltip: true
        });
    }

    closeTooltip() {
        this.setState({
            showInfoTooltip: false
        });
    }

    measureOffset() {
        const targetElement = this.referenceDiv;
        const offsetTop = targetElement.offsetTop - 15;
        const tooltipWidth = this.props.wide ? 750 : 375;
        let offsetRight = window.innerWidth - targetElement.offsetLeft - targetElement.clientWidth - tooltipWidth - 30;
        if (this.props.left) {
            offsetRight = (window.innerWidth - targetElement.offsetLeft - 25) + targetElement.clientWidth;
        }
        this.setState({
            offsetTop,
            offsetRight,
            width: tooltipWidth
        });
    }

    render() {
        let tooltip = null;
        const style = {
            top: this.state.offsetTop,
            right: this.state.offsetRight,
            width: this.state.width
        };
        if (this.state.showInfoTooltip) {
            tooltip = (
                <div
                    className="info-tooltip-spacer"
                    style={style}>
                    <div
                        className="info-tooltip"
                        id="info-tooltip"
                        onMouseEnter={this.showTooltip}
                        onMouseLeave={this.closeTooltip}
                        role="tooltip">
                        <div className="info-tooltip__interior">
                            <div
                                className={`tooltip-pointer ${
                                    this.props.left ? "right" : ""
                                }`} />
                            <div className="info-tooltip__content">
                                <div className="info-tooltip__message">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="award__info-wrapper">
                <div
                    ref={(div) => {
                        this.referenceDiv = div;
                    }}>
                    <div
                        role="button"
                        tabIndex="0"
                        onBlur={this.closeTooltip}
                        className="award__icon"
                        onFocus={this.showTooltip}
                        onKeyPress={this.showTooltip}
                        onMouseEnter={this.showTooltip}
                        onClick={this.showTooltip}>
                        <InfoCircle alt="Information" />
                    </div>
                    {tooltip}
                </div>
            </div>
        );
    }
}

InfoTooltip.defaultProps = defaultProps;
InfoTooltip.propTypes = propTypes;
