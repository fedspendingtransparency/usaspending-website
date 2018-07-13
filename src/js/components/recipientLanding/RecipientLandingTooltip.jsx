/**
 * RecipientLandingTooltip.jsx
 * Created by David Trinh on 7/11/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    closeTooltip: PropTypes.func,
    message: PropTypes.string,
    placement: PropTypes.string
};


const tooltipPadding = 12;

export default class RecipientLandingTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            iconTop: 0,
            iconLeft: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    getPosition() {
        const icon = document.getElementById(this.props.placement);
        const iconTop = icon.offsetTop;
        const iconLeft = (icon.offsetLeft + icon.offsetWidth) - tooltipPadding;

        return { iconTop, iconLeft };
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
                className="homepage-hero-tooltip"
                onMouseLeave={this.props.closeTooltip}
                style={{
                    top: this.state.iconTop,
                    left: this.state.iconLeft
                }}>
                <div className="homepage-hero-tooltip__info_icon">
                    <Icons.InfoCircle />
                </div>
                <div className="homepage-hero-tooltip__text_holder">
                    <div className="homepage-hero-tooltip__tooltip_text">
                        {this.props.message}
                    </div>
                </div>
            </div>
        );
    }
};

RecipientLandingTooltip.propTypes = propTypes;
