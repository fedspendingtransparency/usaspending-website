/**
 * AwardSpendingIntro.jsx
 * Created by Brian Petway 11/04/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import GlossaryLink from '../../sharedComponents/GlossaryLink';

const propTypes = {
    name: PropTypes.string.isRequired
};

const AwardSpendingIntro = ({ name }) => (
    <div className="status-of-funds__intro-wrapper">
        <div className="status-of-funds__intro-section-title">
            How much is {name} spending on contracts and financial assistance?
        </div>
        <div className="status-of-funds__intro-section-text" data-testid="introCopy" >
            Federal agencies use some portion of their <span className="status-of-funds__glossary-term">budgetary resources</span> <GlossaryLink term="budgetary-resources" /> for awards to recipients in the form of contracts and financial assistance. Each award consists of a roll-up of individual <span className="status-of-funds__glossary-term">transactions</span> <GlossaryLink term="transaction" />, including transactions that obligate money. In this section, we show which sub-agencies of {name} have issued awards through different types of contracts or financial assistance and how much each sub-agency has obligated (promised to spend).
        </div>
    </div>
);

AwardSpendingIntro.propTypes = propTypes;
export default AwardSpendingIntro;
