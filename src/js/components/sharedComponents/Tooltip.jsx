/**
 * Tooltip.jsx
 * Created by David Trinh 2/28/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    content: PropTypes.object, // Pass in a JSX object here as a render prop
    closeTooltip: PropTypes.func,
    showInfoTooltip: PropTypes.bool
};

const tooltipWidth = 160;
const margin = 15;
const tooltipPadding = 6;

export default class Tooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            iconTop: 0,
            iconLeft: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    getPosition() {
        const container = document.getElementById('');
        const conatinerOffsetY = container.getBoundingClientRect().top;

        const icon = document.getElementById('');
        const iconTop = icon.getBoundingClientRect().top - conatinerOffsetY - tooltipPadding;
        let iconLeft = icon.getBoundingClientRect().left - tooltipPadding;

        const windowWidth = window.innerWidth;
        if ((iconLeft + tooltipWidth) > windowWidth) {
            iconLeft = windowWidth - tooltipWidth - margin;
        }

        return { iconTop, iconLeft };
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.props.showInfoTooltip && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.closeTooltip();
        }
    }

    handleWindowResize() {
    // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            // width changed, update the visualization width
            const position = this.getPosition();

            this.setState({
                windowWidth,
                iconTop: position.iconTop,
                iconLeft: position.iconLeft
            });
        }
    }

    render() {
        return (
            <div
                ref={this.setWrapperRef}
                className="tooltip"
                onMouseLeave={this.props.closeTooltip}
                onBlur={this.props.closeTooltip}
                style={{
                    top: this.state.iconTop,
                    left: this.state.iconLeft
                }}>
                <div className="tooltip__icon">
                    <Icons.InfoCircle />
                </div>
                <div className="homepage-hero-tooltip__text_holder">
                    <div className="tooltip__content">
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    }
}

Tooltip.propTypes = propTypes;
