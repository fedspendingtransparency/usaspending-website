/**
 * Hero.jsx
 * Created by Kevin Li 1/19/18
 */

import React from 'react';

import { InfoCircle } from 'components/sharedComponents/icons/Icons';
import HeroButton from './HeroButton';
import HeroTooltip from './HeroTooltip';

// Fiscal year, spending amount constants, to be updated yearly
// last updated: 10/28/2019
const fiscalYear = 2019;
const fiscalSpendingAmount = `$4.45 trillion`;

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
                    fiscalYear={fiscalYear}
                    showInfoTooltip={this.state.showInfoTooltip}
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
                            In {fiscalYear}, the government spent <strong className="homepage-hero__headline homepage-hero__headline_weight_bold">{fiscalSpendingAmount}.</strong>
                            <span className="homepage-hero__info_icon_holder">
                                <button
                                    id="homepage-hero__info_icon"
                                    className="homepage-hero__info_icon"
                                    onFocus={this.showTooltip}
                                    onMouseEnter={this.showTooltip}
                                    onClick={this.showTooltip}>
                                    <InfoCircle />
                                </button>
                            </span>
                        </h1>
                        {tooltip}
                        <hr className="homepage-hero__divider" />
                        <div className="homepage-hero__description">
                            <strong className="homepage-hero__description homepage-hero__description_weight_bold">USA Spending tracks federal spending to ensure taxpayers can see how their money is being used</strong> in communities across America. Learn more on how this money was spent with tools to help you navigate spending from top to bottom.
                        </div>
                    </div>
                    <HeroButton />
                </div>
            </section>
        );
    }
};
