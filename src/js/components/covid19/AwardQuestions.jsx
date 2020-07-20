/**
 * AwardQuestion.jsx
 * Created by Jonathan Hill 06/18/20
 */

import React from 'react';

const AwardQuestion = () => (
    <div className="award-question__container information-body">
        <div className="information-top" />
        <div className="award-question__title">
            How much has the federal government spent on awards to support the COVID-19 Response?
        </div>
        <div className="award-question__sub-section">
            <p className="award-question__sub-section_paragraph">
                The Federal Government provides money to the public in many different
                ways through different types of awards. Some of these award types
                are contracts, grants, and loans.
            </p>
            <p className="award-question__sub-section_paragraph">
                Award spending can further be divided into different categories: by
                recipients who received spending, by agencies who spent spending,
                and by the different federal assistance programs that were funded
                by this spending. Insights about award spending can also be
                identified by charting award spending over time.
            </p>
        </div>
    </div>
);

export default AwardQuestion;

