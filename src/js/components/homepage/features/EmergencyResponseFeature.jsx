/**
 * EmergencyResponseFeature.jsx
 * Created By Jonathan Hill 04/23/2020
 */

import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RedirectModal from 'components/sharedComponents/RedirectModal';


const EmergencyResponseFeature = () => {
    const [isRedirectModalMounted, setIsRedirectModalMounted] = useState(false);
    const [redirectModalURL, setRedirectModalURL] = useState('');

    const onRedirectModalClick = (e) => {
        setRedirectModalURL(e.currentTarget.value);
        setIsRedirectModalMounted(true);
    };

    const closeRedirectModal = () => {
        setRedirectModalURL('');
        setIsRedirectModalMounted(false);
    };

    return (
        <div className="feature-emergency-response-container">
            <h3 className="feature-emergency-response__title">AN IMPORTANT MESSAGE ABOUT COVID-19</h3>
            <div className="feature-emergency-response">
                <div className="feature-emergency-response__body">
                    <div className="feature-emergency-response__body-icon">
                        <FontAwesomeIcon size="lg" icon="info-circle" />
                    </div>
                    <div className="feature-emergency-response__body-content award-viz">
                        <h3 className="feature-emergency-response__body-title">
                            A message from USAspending.gov about Federal Government Spending on the 2019 novel
                            coronavirus (COVID-19):
                        </h3>
                        <div className="feature-emergency-response__body-section">
                            <h3 className="feature-emergency-response__body-section__title">
                                COVID-19 spending data will soon be available on USAspending.gov
                            </h3>
                            <p className="feature-emergency-response__body-section__paragraph">
                                The team at USAspending.gov has been working with Federal agencies
                                to finalize a plan to <span className="feature-emergency-response__underline">collect and display</span> data capturing how the
                                Federal government is using resources provided by the Coronavirus
                                Aid, Relief, and Economic Security (CARES) Act, as well as other
                                COVID-19 response appropriations, to help address America&#8217;s needs
                                during the pandemic. Our goal is to ensure that we capture data from
                                Federal agencies in the right manner so that, when it is published,
                                you can understand where the money is going and what it will be used
                                for.
                            </p>
                            <p className="feature-emergency-response__body-section__paragraph">
                            The first part of this plan is complete: we have finalized changes to our
                            data model that will allow you to track COVID-19 money all the way
                            from the appropriation to the Federal awards that are funded. Now
                            that these changes are finalized, the data will be collected and
                            published as quickly as possible. With that in mind, we wanted to
                            provide you with a sense of when you can expect to see these new data.
                            </p>
                        </div>
                        <div className="feature-emergency-response__body-section">
                            <h3 className="feature-emergency-response__body-section__title">
                                Expect the new data at the end of July
                            </h3>
                            <p className="feature-emergency-response__body-section__paragraph">
                                In late July, we will integrate the new data into USAspending.gov
                                showing COVID-19 supplemental loans, grants, and other awards made
                                by Federal agencies.
                            </p>
                            <p className="feature-emergency-response__body-section__paragraph">
                                In the meantime, we want to let you know about two options for
                                obtaining information on COVID-19 spending before July:
                            </p>
                        </div>
                        <div className="feature-emergency-response__body-section">
                            <h3 className="feature-emergency-response__body-section__title">
                                Obtaining information on COVID-19 spending before July
                            </h3>
                            <div className="feature-emergency-response__body-section__sub-section">
                                <h4 className="feature-emergency-response__body-section__sub-title">
                                    Searching by Keyword
                                </h4>
                                <p className="feature-emergency-response__body-section__paragraph">
                                    You can use the &#34;keyword search&#34; or the keyword
                                    feature in &#34;advanced search&#34; to search for awards
                                    that are COVID-19 related today. Try searching for
                                    &#34;COVID-19,&#34; &#34;Coronavirus,&#34; or &#34;N95,&#34; as
                                    examples.
                                </p>
                            </div>
                            <div className="feature-emergency-response__body-section__sub-section">
                                <h4 className="feature-emergency-response__body-section__sub-title">
                                    Contract Analysis from GSA and OMB
                                </h4>
                                <p className="feature-emergency-response__body-section__paragraph">
                                    While contracts are just a small part of
                                    COVID-19 supplemental spending, we wanted to make you
                                    aware that the General Services Administration (GSA) and
                                    the Office of Management and Budget (OMB) have put together
                                    an analysis of contracts related to COVID-19
                                    (though not necessarily funded by the CARES Act or
                                    other COVID-19 supplementals). It is available on GSA&#8217;s website&nbsp;
                                    <button
                                        className="feature-emergency-response__link-button"
                                        onClick={onRedirectModalClick}
                                        value="https://d2d.gsa.gov/report/covid-19-contract-obligation-tracking-dashboard">
                                        here.
                                    </button>
                                </p>
                            </div>
                        </div>
                        <div className="feature-emergency-response__body-section">
                            <h3 className="feature-emergency-response__body-section__title">
                                For more information on our data model changes
                            </h3>
                            <p className="feature-emergency-response__body-section__paragraph">
                            If you&#8217;re interested in checking out the changes to our data model on&nbsp;
                                <a
                                    target="_blank"
                                    role="button"
                                    rel="noopener noreferrer"
                                    href="https://www.usaspending.gov/#/">
                                    USAspending.gov
                                </a>
                                &nbsp;to get a sense of how we will be capturing COVID-19 supplemental
                            spending data, check out&nbsp;
                                <button
                                    className="feature-emergency-response__link-button"
                                    onClick={onRedirectModalClick}
                                    value="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf">
                                    OMB M-20-21
                                </button>
                                &nbsp;and the&nbsp;
                                <button
                                    className="feature-emergency-response__link-button"
                                    onClick={onRedirectModalClick}
                                    value="https://fiscal.treasury.gov/data-transparency/DAIMS-v2.0.html">
                                    DATA Act Information Model Schema (DAIMS) 2.0.
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <RedirectModal
                mounted={isRedirectModalMounted}
                hideModal={closeRedirectModal}
                url={redirectModalURL} />
        </div>
    );
};

export default EmergencyResponseFeature;
