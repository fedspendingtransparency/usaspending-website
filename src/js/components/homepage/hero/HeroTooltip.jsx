/**
 * HeroTooltip.jsx
 * Created by michaelbray on 2/28/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    closeTooltip: PropTypes.func
};

const tooltipWidth = 160;
const margin = 15;
const tooltipPadding = 6;

export default class HeroTooltip extends React.Component {
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
        const container = document.getElementById('homepage-hero__wrapper');
        const conatinerOffsetY = container.getBoundingClientRect().top;

        const icon = document.getElementById('homepage-hero__info_icon');
        const iconTop = icon.getBoundingClientRect().top - conatinerOffsetY - tooltipPadding;
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
                style={{
                    top: this.state.iconTop,
                    left: this.state.iconLeft
                }}>
                <div className="homepage-hero-tooltip__info_icon">
                    <Icons.InfoCircle />
                </div>
                <button
                    className="homepage-hero-tooltip__close_icon"
                    onClick={this.props.closeTooltip}>
                    <Icons.Close />
                </button>
                <div className="homepage-hero-tooltip__text_holder">
                    <div className="homepage-hero-tooltip__tooltip_title">
                        Data Source:
                    </div>
                    <div className="homepage-hero-tooltip__tooltip_text">
                        Fiscal Year 2017 net outlays as reported on the&nbsp;
                        <a
                            href="https://www.fiscal.treasury.gov/fsreports/rpt/mthTreasStmt/current.htm"
                            target="_blank"
                            rel="noopener noreferrer">
                            Monthly Treasury Statement
                        </a>
                    </div>
                </div>
            </div>
        );
    }
};

HeroTooltip.propTypes = propTypes;
