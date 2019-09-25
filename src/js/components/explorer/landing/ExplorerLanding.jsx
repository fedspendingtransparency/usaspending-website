/**
 * ExplorerLanding.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { Glossary } from 'components/sharedComponents/icons/Icons';

import ExplorerWrapperPage from '../ExplorerWrapperPage';
import ExplorerLandingOption from './ExplorerLandingOption';

export default class ExplorerLanding extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.toggleDetail = this.toggleDetail.bind(this);
    }

    toggleDetail() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        const expandLabel = this.state.expanded ? 'Hide' : 'Learn More';
        let content = null;
        if (this.state.expanded) {
            content = (
                <div className="explorer-description__content">
                    <p>
                        Drawing on agencies&apos; financial data, this tool provides an interactive way to explore federal spending (known as Obligations  <a href="#/explorer/?glossary=obligation"><Glossary alt="Definition of Obligation" /></a>) from top to bottom. Use this tool to get a better sense of how Congress distributes funding to agencies and how agencies spend that funding on activities that fulfill their missions &mdash; in short, how this funding powers the work that agencies are known for.
                    </p>
                    <p>
                        Use three different entry points &mdash; Budget Function <a href="#/explorer/?glossary=budget-function"><Glossary alt="Definition of Budget Function" /></a>, Agency <a href="#/explorer/?glossary=agency"><Glossary alt="Definition of Agency" /></a>, and Object Class <a href="#/explorer/?glossary=object-class"><Glossary alt="Definition of Object Class" /></a> &mdash; to see how federal spending breaks down along different themes. Explore by Budget Function if you&apos;re most interested in the broad categories of federal spending; by Agency if you&apos;re focused on specific agencies&apos; work; and by Object Class if you&apos;d like to frame spending in terms of the types of goods and services the government buys.
                    </p>
                    <p>
                        The data powering the Spending Explorer is reported through a newly implemented law (the Digital Accountability and Transparency Act of 2014 (<a href="https://www.gpo.gov/fdsys/pkg/PLAW-113publ101/html/PLAW-113publ101.htm" target="_blank" rel="noopener noreferrer">DATA Act</a>)) that requires agencies to link their financial data, in addition to the award data that agencies were already reporting under the Federal Funding Accountability and Transparency Act of 2006 (FFATA). This data was first collected in the second quarter of fiscal year 2017. The data displayed on the site may not be complete or match official publications (e.g., the President&apos;s Budget, Agency Financial Reports), due to agencies&apos; different reporting schedules and the fact that some data elements aren&apos;t required to be reported. Notably, the Department of Defense (DoD) doesn&apos;t report their financial data using the same schedule as other major agencies; the DATA Act gives them an exemption that allows them to report later.  That said, we publish all the data agencies submit to provide as comprehensive a view as possible, and we expect available data to become more complete in the future.
                    </p>
                    <p>
                        Now, for the first time ever, agency financial data is connected to award data in a way that&apos;s easy (and fun) to explore. If you have suggestions on how we can improve the Spending Explorer, share your thoughts on the <a href="https://usaspending-help.zendesk.com/hc/en-us/community/topics" target="_blank" rel="noopener noreferrer">Community page</a>.
                    </p>
                </div>
            );
        }

        return (
            <ExplorerWrapperPage>
                <div className="explorer-landing">
                    <div className="explorer-landing__intro">
                        <h2
                            className="explorer-landing__title">
                            Explore the spending landscape.
                        </h2>
                        <div className="explorer-landing__detail">
                            <div className="explorer-landing__detail-content explorer-description">
                                <h3
                                    className="explorer-description__title">
                                    The Spending Explorer makes it easy to understand the big picture of federal spending.
                                </h3>
                                <div className="explorer-description__animations">
                                    <CSSTransitionGroup
                                        transitionName="explorer-description-slide"
                                        transitionLeaveTimeout={195}
                                        transitionEnterTimeout={195}
                                        transitionLeave>
                                        {content}
                                    </CSSTransitionGroup>
                                </div>
                                <button
                                    className="explorer-description__expand"
                                    onClick={this.toggleDetail}>
                                    {expandLabel}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="explorer-landing__options">
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
