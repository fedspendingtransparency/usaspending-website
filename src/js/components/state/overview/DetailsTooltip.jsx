/**
 * DetailsTooltip.jsx
 * Created by Lizzie Salita 5/8/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    closeTooltip: PropTypes.func
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
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
        window.addEventListener('scroll', this.handleWindowScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.removeEventListener('scroll', this.handleWindowScroll);
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
                className="state-overview-tooltip"
                style={{
                    top: this.state.iconTop,
                    left: this.state.iconLeft
                }}>
                <div className="state-overview-tooltip__info_icon">
                    <Icons.InfoCircle />
                </div>
                <button
                    className="state-overview-tooltip__close_icon"
                    onClick={this.props.closeTooltip}>
                    <Icons.Close />
                </button>
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
};

DetailsTooltip.propTypes = propTypes;
