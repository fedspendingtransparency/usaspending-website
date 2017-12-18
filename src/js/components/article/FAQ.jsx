/**
 * FAQ.jsx
 * Created by Marco Mendoza 05/4/2017
 **/

import React from 'react';

import * as MetaTagHelper from 'helpers/metaTagHelper';

import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import Breadcrumb from './Breadcrumb';

export default class FAQ extends React.Component {
    render() {
        return (
            <div className="usa-da-about-article">
                <MetaTags {...MetaTagHelper.faqPageMetaTags} />
                <Header />
                <Breadcrumb title="FAQs" />
                <div className="article-wrapper">
                    <h1>Frequently Asked Questions</h1>
                    <hr className="results-divider" />
                    <h6>What is different on the new USAspending.gov site?</h6>
                    <p>
                        The new Beta.USAspending.gov site is an expansion of the data that has
                        been published on the site for the past decade. The new site allows
                        taxpayers to examine nearly $4 trillion in federal spending each year and
                        see how this money flows from Congressional appropriations to local
                        communities and businesses.
                    </p>
                    <p>
                        The USAspending.gov site provides summary data on the budget categories
                        and federal spending accounts and breaks the spending down into individual
                        contracts, grants or loans.
                    </p>
                    <p>
                        The data is compiled by the Treasury from federal agencies and authoritative
                        Federal sources and published quarterly beginning in May 2017. The full data
                        set will be updated each quarter with more frequent updates for award
                        information.
                    </p>
                    <p>
                        Users can search by location (state, city, county), by federal agency or by
                        keyword for a specific topic or type of spending. The website also allows for
                        large amounts of data to be accessed easily through an Application
                        Programming Interface (API) for more technical users.
                    </p>
                    <h6>Who developed the new USAspending.gov site?</h6>
                    <p>
                        Treasury developed and manages the new USAspending.gov site. This site was
                        developed in accordance with the DATA Act, which was led by Treasury in
                        coordination with the Office of Management and Budget (OMB) and federal
                        agencies.
                    </p>
                    <h6>Why is the data different on the new USAspending.gov vs. the old site?</h6>
                    <p>
                        The Beta.USAspending.gov site includes all of the new data required by the
                        DATA Act and includes appropriations level data linked to the award data.
                        The old site maintains the award data and all the historical data from the
                        past ten years. Treasury will be moving the historical data over to the new
                        site over the summer. During that time, the award data on the old site will
                        continue to be updated.
                    </p>
                    <h6>What are the limitations of the data presented on the new site when trying
                    to understand government spending?
                    </h6>
                    <p>
                        On May 9th, the public can search the newly linked financial and award level
                        data and download the raw file submissions for the first quarter of reported
                        data (Fiscal Year 17 Q2). Over the summer Treasury will add new functionality
                        to the site including agency and recipient pages, more sophisticated download
                        features and will move the historical data onto the new site. Over time, with
                        each quarter of reporting, the data will become richer and the public will be
                        able to identify more trends in federal spending. The Beta.USAspending.gov
                        website is just the beginning.
                    </p>
                    <h6> If I spot errors in the data or have questions about the site, who do I contact?</h6>
                    <p>
                        Treasury has also launched a new USAspending.gov Service Desk to respond to
                        user questions, issues and feedback.  Users can send an email to the Service
                        Desk directly by clicking the “Contact Us” link on the new USAspending.gov
                        homepage or they can post a question, issue, or comment directly to our
                        “Collaboration Forum.” The Service Desk is committed to providing excellent
                        customer service to help meet users’ needs. The Service Desk will provide
                        responses to user inquiries in an accurate, consistent, professional, and
                        timely manner.
                    </p>
                    <h6>Is the beta site official data? </h6>
                    <p>
                        Yes, the beta site contains official, certified agency data for second
                        quarter FY2017. The view and the display will be improved and we are
                        maintaining the old site over the summer to minimize disruptions for data
                        users.
                    </p>
                    <p>
                        For older data, the current USAspending.gov site remains the source of
                        information.
                    </p>
                    <h6>When will site be updated with new data? </h6>
                    <p>
                        The data is compiled by the Treasury from federal agencies and published
                        quarterly beginning in May 2017.
                    </p>
                    <p>
                        Treasury is working with agencies to determine the next reporting period for
                        third quarter data.
                    </p>
                </div>
                <Footer />
            </div>
        );
    }
}
