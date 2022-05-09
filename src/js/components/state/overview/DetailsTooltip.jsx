/**
 * DetailsTooltip.jsx
 * Created by Lizzie Salita 5/8/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    closeTooltip: PropTypes.func,
    showInfoTooltip: PropTypes.bool
};

const tooltipWidth = 300;
const margin = 15;
const tooltipPadding = 6;

export default class DetailsTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            iconTop: 0,
            iconLeft: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.handleWindowScroll = throttle(this.handleWindowScroll.bind(this), 50);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
        window.addEventListener('scroll', this.handleWindowScroll);
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.removeEventListener('scroll', this.handleWindowScroll);
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    getPosition() {
        const icon = document.getElementById('details__info_icon');
        const iconTop = (icon.getBoundingClientRect().top - tooltipPadding) + window.scrollY;

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
            // width changed, update the position
            const position = this.getPosition();

            this.setState({
                windowWidth,
                iconTop: position.iconTop,
                iconLeft: position.iconLeft
            });
        }
    }

    handleWindowScroll() {
        const position = this.getPosition();

        this.setState({
            iconTop: position.iconTop,
            iconLeft: position.iconLeft
        });
    }

    render() {
        return (

            <div
                ref={this.setWrapperRef}
                onBlur={this.props.closeTooltip}
                onMouseLeave={this.props.closeTooltip}
                className="state-overview-tooltip"
                style={{
                    top: this.state.iconTop,
                    left: this.state.iconLeft
                }}>
                <div className="state-overview-tooltip__info_icon">
                    <Icons.InfoCircle />
                </div>
                <div className="state-overview-tooltip__text_holder">
                    <div className="state-overview-tooltip__tooltip_title">
                        Data Sources
                    </div>
                    <div className="state-overview-tooltip__tooltip_text">
                        <p>
                            The amounts used are based on U.S. Census data of specific years noted in parentheses.
                        </p>
                        <p>
                            <strong>Awarded Amount Per Capita</strong> is calculated using the Total Award Amount of the
                            selected time period, divided by the population amount shown in the table.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

DetailsTooltip.propTypes = propTypes;
