/**
 * CovidFeature.jsx
 * Created By Jonathan Hill 04/23/2020
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* eslint-disable import/prefer-default-export */
export const CovidFeature = () => (
    <div className="feature-covid-container">
        <h2 className="feature-covid__title">AN IMPORTANT MESSAGE ABOUT COVID-19</h2>
        <div className="feature-covid">
            <div className="feature-covid__body">
                <div className="feature-covid__body-icon">
                    <FontAwesomeIcon size="lg" icon="info-circle" />
                </div>
                <div className="feature-covid__body-content">
                    <h1 className="feature-covid__body-title">
                        A message from USAspending about Federal Government Spending on the 2019 novel
                        coronavirus (COVID-19)
                    </h1>
                    <div className="feature-covid__body-section">
                        <h2 className="feature-covid__body-section__title">
                            Coronavirus spending data will soon be available on USAspending.gov
                        </h2>
                        <p className="feature-covid__body-section__paragraph">
                            The team at USAspending.gov has been working with Federal agencies
                            to finalize a plan to collect and display data capturing how
                            the Federal government is using resources provided by the
                            Coronavirus Aid, Relief, and Economic Security Act (CARES Act), as
                            well as other COVID-19 response appropriations, to help address
                            America&#8217;s needs during the pandemic.
                        </p>
                        <p className="feature-covid__body-section__paragraph">
                            Our goal is to ensure that we capture data in the right
                            manner so that, when it is published, you can understand
                            where the money is going and what it will be used for. We are
                            finalizing the changes to our data model to allow you to track
                            COVID-19 money all the way from the appropriation to the
                            Federal awards that are funded. Once these changes finalized,
                            the data will be collected and published as quickly as possible.
                        </p>
                    </div>
                    <div className="feature-covid__body-section">
                        <h2 className="feature-covid__body-section__title">
                            Expect the new data in late July
                        </h2>
                        <p className="feature-covid__body-section__paragraph">
                            <strong>In late July</strong> we will integrate the new data into
                            USAspending.gov showing Coronavirus supplemental loans,
                            grants, and other awards made by Federal agencies.
                        </p>
                    </div>
                    <div className="feature-covid__body-section">
                        <h2 className="feature-covid__body-section__title">
                            Obtaining information on coronavirus spending before July
                        </h2>
                        <div className="feature-covid__body-section__sub-section">
                            <h3 className="feature-covid__body-section__sub-title">
                                Searching by Keyword
                            </h3>
                            <p className="feature-covid__body-section__paragraph">
                                You can use the &#34;keyword search&#34; or the keyword
                                feature in &#34;advanced search&#34; to search for awards
                                that are Coronavirus related today. Try searching for
                                &#34;COVID-19,&#34; &#34;Coronavirus,&#34; or &#34;N95,&#34; as
                                examples.
                            </p>
                        </div>
                        <div className="feature-covid__body-section__sub-section">
                            <h3 className="feature-covid__body-section__sub-title">
                                Contract Analysis from GSA and OMB
                            </h3>
                            <p className="feature-covid__body-section__paragraph">
                                While contracts are just a small part of
                                Coronavirus supplemental spending, we wanted to make you
                                aware that the General Services Administration and
                                the Office of Management and Budget have put together
                                an analysis of contracts related to the Coronavirus
                                (though not necessarily funded by the CARES Act or
                                other Coronavirus supplementals).
                            </p>
                            <p className="feature-covid__body-section__paragraph">
                                It is available on GSA&#8217;s website
                                <a
                                    target="_blank"
                                    role="button"
                                    rel="noopener noreferrer"
                                    href="www.google.com">
                                    &nbsp;here.
                                </a>
                            </p>
                        </div>
                        <div className="feature-covid__body-section__sub-section">
                            <h3 className="feature-covid__body-section__sub-title">
                                Data Lab Analysis
                            </h3>
                            <p className="feature-covid__body-section__paragraph">
                                In late May, we will launch an analysis on the Data Lab
                                showing Coronavirus supplemental spending by Federal
                                agency and Federal account.
                            </p>
                        </div>
                    </div>
                    <div className="feature-covid__body-section">
                        <h2 className="feature-covid__body-section__title">
                            For more information on our data model changes
                        </h2>
                        <p className="feature-covid__body-section__paragraph">
                        If you&#8217;re interested in checking out the changes to our data model on
                        USAspending.gov to get a sense of how we will be capturing Coronavirus
                        spending data, check out
                            <a
                                target="_blank"
                                role="button"
                                rel="noopener noreferrer"
                                href="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf">
                                &nbsp;OMB M-20-21&nbsp;
                            </a>
                            and the
                            <a
                                target="_blank"
                                role="button"
                                rel="noopener noreferrer"
                                href="https://fiscal.treasury.gov/data-transparency/DAIMS-v2.0.html">
                                &nbsp;DATA Act Information Model Schema (DAIMS) 2.0.
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
