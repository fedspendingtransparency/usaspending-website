/**
 * AwardQuestion.jsx
 * Created by Jonathan Hill 06/18/20
 */

import React from 'react';
import GlossaryLink from 'components/sharedComponents/GlossaryLink';
import ReadMore from './ReadMore';

const AwardQuestion = () => (
    <div className="award-question__container information-body">
        <div className="information-top" />
        <h2 className="award-question__title">
            How much has the federal government spent on <span className="color-purple">awards</span> in response to COVID-19?
        </h2>
        <div className="award-question__sub-section">
            <p className="award-question__sub-section_paragraph">
                Award spending is a subset of total spending and refers to money given through <span className="glossary-term">contracts</span> <GlossaryLink currentUrl="disaster/covid-19" term="contract" /> or <span className="glossary-term">financial assistance</span> <GlossaryLink currentUrl="disaster/covid-19" term="financial-assistance" /> to individuals, organizations, businesses, or state, local, or tribal governments.
                There are two main categories of awards: contracts and financial assistance. Loan spending is a type of financial assistance with two components: <span className="glossary-term">face value</span> <GlossaryLink currentUrl="disaster/covid-19" term="face-value" /> and <span className="glossary-term">subsidy cost</span> <GlossaryLink currentUrl="disaster/covid-19" term="subsidy-cost" />.
            </p>
            <ReadMore>
                <p className="award-question__sub-section_paragraph">
                    In the following sections, we break down award spending into three categories: recipients of award funds; agencies that gave out award funds; and financial assistance programs supporting these award funds.
                </p>
            </ReadMore>

        </div>
    </div>
);

export default AwardQuestion;

