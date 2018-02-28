/**
 * Hero.jsx
 * Created by Kevin Li 1/19/18
 */

import React from 'react';

import * as Icons from 'components/sharedComponents/icons/Icons';
import HeroButton from './HeroButton';
import HeroTooltip from './HeroTooltip';

export default class Hero extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfoTooltip: false
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
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

    render() {
        let tooltip = null;
        if (this.state.showInfoTooltip) {
            tooltip = (
                <HeroTooltip
                    closeTooltip={this.closeTooltip} />
            );
        }

        return (
            <section className="homepage-hero" aria-label="Introduction">
                <div
                    id="homepage-hero__wrapper"
                    className="homepage-hero__wrapper">
                    <div className="homepage-hero__content">
                        <h1 className="homepage-hero__headline" tabIndex={-1}>
                            In 2017, the government spent <strong className="homepage-hero__headline homepage-hero__headline_weight_bold">$3.98 trillion.</strong>
                            <span
                                id="homepage-hero__info_icon"
                                className="homepage-hero__info_icon"
                                onFocus={this.showTooltip}
                                onMouseEnter={this.showTooltip}
                                onClick={this.showTooltip}>
                                <Icons.InfoCircle />
                            </span>
                        </h1>
                        {tooltip}
                        <hr className="homepage-hero__divider" />
                        <div className="homepage-hero__description">
                            <strong className="homepage-hero__description homepage-hero__description_weight_bold">Curious to see how this money was spent?</strong> We hope so &mdash; we&apos;ve opened the conversation around federal spending and provide the tools to help you navigate the budget from top to bottom.
                        </div>
                    </div>
                    <HeroButton />
                </div>
            </section>
        );
    }
};
