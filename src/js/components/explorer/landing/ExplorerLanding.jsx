/**
 * ExplorerLanding.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';

import { defaultFiscalYear } from 'helpers/fiscalYearHelper';

import ExplorerWrapperPage from '../ExplorerWrapperPage';
import ExplorerLandingOption from './ExplorerLandingOption';

const ExplorerLanding = () => (
    <ExplorerWrapperPage>
        <div className="explorer-landing-page">
            <div className="landing-intro">
                <h2>Explore spending for Fiscal Year {defaultFiscalYear()}</h2>
                <div className="description">
                    <div className="highlight">
                        Choose a starting point to begin.
                    </div>
                    We&apos;ll begin by seeing spending broken down by your starting point. From there you can dive deeper and explore several other breakdowns of spending.
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

export default ExplorerLanding;
