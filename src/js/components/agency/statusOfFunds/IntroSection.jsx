/**
 * IntroSection.jsx
 * Created by Brian Petway 11/04/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import GlossaryLink from '../../sharedComponents/GlossaryLink';

const propTypes = {
    fy: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    totalItems: PropTypes.number
};

const IntroSection = ({ fy, name, totalItems }) => {
    const agencyBudget = useSelector((state) => state.agency.budgetaryResources?.[fy]?.agencyBudget) || '--';

    return (
        <div className="status-of-funds__intro-wrapper">
            <div className="status-of-funds__intro-section-title">
                How was funding distributed in FY {fy} for {name}?
            </div>
            <div className="status-of-funds__intro-section-text" data-testid="introCopy" >
                Each year federal agencies receive funding from Congress, known as <span className="status-of-funds__glossary-term">budgetary resources</span> <GlossaryLink term="budgetary-resources" />. In FY {fy}, the {name} had {agencyBudget} distributed among its {totalItems} sub-components. Agencies spend available budgetary resources by making financial promises called <span className="status-of-funds__glossary-term">obligations</span> <GlossaryLink term="obligation" />. In this section, we show the total budgetary resources broken out by agency sub-component and how much of that funding has been obligated for the fiscal year selected.
            </div>
            <div className="status-of-funds__intro-section-text" data-testid="introCopy" >
                We also show <span className="status-of-funds__glossary-term">outlays</span> <GlossaryLink term="outlay" /> for each agency sub-component, or the amount of money that has actually been paid out and not just promised (“obligated”). Note that outlays for any given year are not a subset of the agency’s obligations for that year since agencies can pay out funds related to obligations from previous years.
            </div>
            <div className="status-of-funds__intro-section-italic-text">
                Select a segment in the chart below to dive deeper into the data.
            </div>
        </div>
    );
};

IntroSection.propTypes = propTypes;
export default IntroSection;
