/**
 * ExplorerLanding.jsx
 * Created by Kevin Li 8/16/17
 */

import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transitioning';

import ExplorerWrapperPage from '../ExplorerWrapperPage';
import ExplorerLandingOption from './ExplorerLandingOption';
import GlossaryLink from "../../sharedComponents/GlossaryLink";

/* eslint-disable max-len */
const ExplorerDescription = () => (
    <div className="explorer-description__content">
        <p>
                Drawing on agencies&apos; financial data, this tool provides an interactive way to explore federal spending (known as Obligations  <GlossaryLink term="obligation" alt="Definition of Obligation" />) from top to bottom. Use this tool to get a better sense of how Congress distributes funding to agencies and how agencies spend that funding on activities that fulfill their missions &mdash; in short, how this funding powers the work that agencies are known for.
        </p>
        <p>
                Use three different entry points &mdash; Budget Function <GlossaryLink term="budget-function" alt="Definition of Budget Function" />, Agency <GlossaryLink term="agency" alt="Definition of Agency" />, and Object Class <GlossaryLink term="object-class" alt="Definition of Object Class" />&mdash; to see how federal spending breaks down along different themes. Explore by Budget Function if you&apos;re most interested in the broad categories of federal spending; by Agency if you&apos;re focused on specific agencies&apos; work; and by Object Class if you&apos;d like to frame spending in terms of the types of goods and services the government buys.
        </p>
        <p>
                The data powering the Spending Explorer is reported through a newly implemented law (the Digital Accountability and Transparency Act of 2014 (<a href="https://www.gpo.gov/fdsys/pkg/PLAW-113publ101/html/PLAW-113publ101.htm" target="_blank" rel="noopener noreferrer">DATA Act</a>)) that requires agencies to link their financial data, in addition to the award data that agencies were already reporting under the Federal Funding Accountability and Transparency Act of 2006 (FFATA). This data was first collected in the second quarter of fiscal year 2017. The data displayed on the site may not be complete or match official publications (e.g., the President&apos;s Budget, Agency Financial Reports), due to agencies&apos; different reporting schedules and the fact that some data elements aren&apos;t required to be reported. Notably, the Department of Defense (DoD) doesn&apos;t report their financial data using the same schedule as other major agencies; the DATA Act gives them an exemption that allows them to report later.  That said, we publish all the data agencies submit to provide as comprehensive a view as possible, and we expect available data to become more complete in the future.
        </p>
        <p>
                Now, for the first time ever, agency financial data is connected to award data in a way that&apos;s easy (and fun) to explore. If you have suggestions on how we can improve the Spending Explorer, share your thoughts on the <a href="https://fiscalservice.force.com/usaspending/s/" target="_blank" rel="noopener noreferrer">Community page</a>.
        </p>
    </div>
);

const explorerLandingDescription = {
    title: "The Spending Explorer makes it easy to understand the big picture of federal spending.",
    budget_function: "See spending divided by a high level categorization based on purpose.",
    agency: "See spending divided by all U.S. government agencies.",
    object_class:
        "See spending grouped by the types of items and services purchased by the federal government."
};
/* eslint-enable max-len */

const ExplorerLanding = () => {
    const [expanded, setExpanded] = useState(false);
    const [showAboutTheDataIcon, setShowAboutTheDataIcon] = useState(false);

    const onOptionClick = () => {
        setShowAboutTheDataIcon(!showAboutTheDataIcon);
    };

    const onToggleClick = () => {
        setExpanded(!expanded);
    };

    const expandLabel = expanded ? 'Hide' : 'Learn More';

    return (
        <ExplorerWrapperPage showShareIcon showAboutTheDataIcon>
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
                                {explorerLandingDescription.title}
                            </h3>
                            <div className="explorer-description__animations">
                                <TransitionGroup>
                                    {expanded && (
                                        <CSSTransition
                                            classNames="explorer-description-slide"
                                            timeout={195}
                                            exit>
                                            <ExplorerDescription />
                                        </CSSTransition>
                                    )}
                                </TransitionGroup>
                            </div>
                            <button
                                className="explorer-description__expand"
                                onClick={onToggleClick}>
                                {expandLabel}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="explorer-landing__options">
                    <ExplorerLandingOption
                        icon="budget_function"
                        title="Budget Function"
                        description={explorerLandingDescription.budget_function}
                        url="/explorer/budget_function"
                        term="budget-function"
                        onClick={onOptionClick} />
                    <ExplorerLandingOption
                        icon="agency"
                        title="Agency"
                        description={explorerLandingDescription.agency}
                        url="/explorer/agency"
                        term="agency"
                        onClick={onOptionClick} />
                    <ExplorerLandingOption
                        icon="object_class"
                        title="Object Class"
                        description={explorerLandingDescription.object_class}
                        url="/explorer/object_class"
                        term="object-class"
                        onClick={onOptionClick} />
                </div>
            </div>
        </ExplorerWrapperPage>
    );
};

export default ExplorerLanding;
