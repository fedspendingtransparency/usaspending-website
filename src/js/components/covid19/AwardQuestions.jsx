/**
 * AwardQuestion.jsx
 * Created by Jonathan Hill 06/18/20
 */

import React from 'react';
import GlossaryLink from 'components/sharedComponents/GlossaryLink';

const AwardQuestion = () => (
    <div className="award-question__container information-body">
        <div className="information-top" />
        <h2 className="award-question__title">
            Federal Awards in Response to <span className="color-purple">COVID-19</span>
        </h2>
        <div className="award-question__sub-section">
            <p className="award-question__sub-section_paragraph">
                Award spending is a subset of total spending and refers to money given through <span className="glossary-term">contracts</span> <GlossaryLink term="contract" /> or <span className="glossary-term">financial assistance</span> <GlossaryLink term="financial-assistance" /> to individuals, organizations, businesses, or state, local, or tribal governments.
                There are two main categories of awards: contracts and financial assistance. Loan spending is a type of financial assistance with two components: <span className="glossary-term">face value</span> <GlossaryLink term="face-value-of-loan" /> and <span className="glossary-term">subsidy cost</span> <GlossaryLink term="loan-subsidy-cost" />.
            </p>
        </div>
    </div>
);

export default AwardQuestion;

