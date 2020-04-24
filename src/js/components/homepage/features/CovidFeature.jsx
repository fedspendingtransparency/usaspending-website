/**
 * CovidFeature.jsx
 * Created By Jonathan Hill 04/23/2020
 */

import React from 'react';

/* eslint-disable import/prefer-default-export */
export const CovidFeature = () => (
    <div className="feature-covid">
        <h2 className="covid-title">Message from USAspending about Federal Government Spending on the 2019 novel coronavirus (COVID-19):</h2>
        <p className="covid-paragraph">The team at USAspending.gov has been working with Federal agencies to finalize a plan to collect and display data capturing how the Federal government is spending resources provided by the Coronavirus Aid, Relief, and Economic Security Act (CARES Act), as well as other COVID-19 response appropriations, to help address America's needs during the pandemic.</p>
        <p className="covid-paragraph">On USAspending.gov, our goal is to ensure that we capture data in the right format so that, when the data is published, you can understand where the money is going and what it will be used for. We are finalizing changes to how the data is captured necessary for us to track this money all the way from the supplementals down to the Federal Awards they fund; once finalized, the data will be collected and published as quickly as possible. With that in mind, we wanted to provide you with a brief schedule to let you know when you can expect to see these new data.</p>
        <ul className="covid-list">
            <li className="covid-list__item">In late May, we will launch an analysis on the Data Lab showing Coronavirus supplemental spending by Federal agency and Federal account.</li>
            <li className="covid-list__item">In late July, we will integrate data on USAspending.gov showing Coronavirus supplemental loans, grants, and other awards made by Federal agencies.</li>
            <li className="covid-list__item">In the meantime, while contracts are just a small part of Coronavirus supplemental spending, we wanted to make you aware that the General Services Administration and the Office of Management and Budget have put together an analysis of contracts related to the Coronavirus (though not necessarily funded by the CARES Act or other Coronavirus supplementals). It is available on GSA's website here [link TBD].</li>
        </ul>
        <p className="covid-paragraph">If you&#8217;re interested in checking out the changes to our data model on USAspending.gov to get a sense of how we will be capturing Coronavirus spending data, check out <a target="_blank" role="button" rel="noopener noreferrer" href="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf">OMB M-20-21</a> and the <a target="_blank" role="button" rel="noopener noreferrer" href="https://fiscal.treasury.gov/data-transparency/DAIMS-v2.0.html">DATA Act Information Model Schema (DAIMS) 2.0.</a></p>
    </div>
);
