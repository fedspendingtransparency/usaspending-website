/**
 * ExplorerLanding.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';

import ExplorerWrapperPage from '../ExplorerWrapperPage';
import ExplorerLandingOption from './ExplorerLandingOption';

require('pages/explorer/explorerPage.scss');

export default class ExplorerLanding extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDisclaimer: false
        };

        this.toggleDisclaimer = this.toggleDisclaimer.bind(this);
    }

    toggleDisclaimer() {
        this.setState({
            showDisclaimer: !this.state.showDisclaimer
        });
    }

    render() {
        let disclaimerContent = (
            <button
                className="collapsible-disclaimer__button"
                onClick={this.toggleDisclaimer}>
                Learn More
            </button>
        );
        if (this.state.showDisclaimer) {
            disclaimerContent = (
                <div className="collapsible-disclaimer__content">
                    <h2 className="collapsible-disclaimer__subheading">
                        The Spending Explorer makes it easy to understand the big picture of federal spending.
                    </h2>
                    <div className="collapsible-disclaimer__info">
                        <p>
                            Drawing on agencies&apos; financial spending data, it provides interactive visualizations that
                            let you explore the data through three different entry points. Use this tool to get a better
                            sense of how federal award data is channeled into different federal accounts and then spent by
                            agencies on activities that fulfill their missions &mdash; in short, how federal awards power
                            the work that agencies are known for.
                        </p>
                        <p>
                            The Spending Explorer uses data reported by agencies per the <a>DATA Act</a> (2014).
                            All amounts displayed are obligated amounts, and the data itself may not be complete, due
                            to differences in agency reporting. Department of Defense data from the last reported
                            fiscal quarter isn&apos;t included &mdash; learn why in our&nbsp;
                            <a href="https://usaspending-help.zendesk.com/hc/en-us/sections/115000739433-Frequently-Ask-Questions">
                                FAQ
                            </a>.
                        </p>
                    </div>
                    <button
                        className="collapsible-disclaimer__button"
                        onClick={this.toggleDisclaimer}>
                        Hide
                    </button>
                </div>
            );
        }
        return (
            <ExplorerWrapperPage>
                <div className="explorer-landing">
                    <div className="collapsible-disclaimer">
                        <h1 className="collapsible-disclaimer__heading">
                            Explore the spending landscape.
                        </h1>
                        <div className="collapsible-disclaimer__section">
                            {disclaimerContent}
                        </div>
                    </div>
                    <div className="landing-options">
                        <ExplorerLandingOption
                            icon="budget_function"
                            title="Budget Function"
                            description="See spending divided by a high level categorization based on purpose."
                            url="#/explorer/budget_function"
                            term="budget-function" />
                        <ExplorerLandingOption
                            icon="agency"
                            title="Agency"
                            description="See spending divided by all U.S. government agencies."
                            url="#/explorer/agency"
                            term="agency" />
                        <ExplorerLandingOption
                            icon="object_class"
                            title="Object Class"
                            description="See spending grouped by the types of items and services purchased by the federal government."
                            url="#/explorer/object_class"
                            term="object-class" />
                    </div>
                </div>
            </ExplorerWrapperPage>
        );
    }
}
