/**
 * NextSteps.jsx
 * Created by Destin Frasier 04/27/2017
 **/

import React from 'react';

import NextStepsBox from './NextStepsBox';

export default class NextSteps extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <NextStepsBox
                    icon="faq"
                    sectionTitle="Frequently Asked Questions"
                    iconClass="qa-icon"
                    sectionText="Get answers to commonly asked questions."
                    linkText="View FAQ"
                    ariaLabel="FAQ"
                    title="Frequently Asked Questions"
                    linkUrl="#/FAQ" />
                <NextStepsBox
                    icon="contact"
                    sectionTitle="Contact Us"
                    iconClass="contact-icon"
                    sectionText="We want to hear your questions and comments."
                    linkText="Contact Us"
                    ariaLabel="Contact Us"
                    title="Contact US"
                    linkUrl="mailto:usaspending.help-submitonly@fiscal.treasury.gov?subject=Contact Us" />
                <NextStepsBox
                    icon="download"
                    sectionTitle="Agency Submission Files"
                    iconClass="download-icon"
                    sectionText="Access the data files submitted directly by agencies."
                    linkText="Download Files"
                    ariaLabel="Download Files"
                    title="Download Files"
                    linkUrl="http://usaspending-submissions.s3-website-us-gov-west-1.amazonaws.com/" />
                <NextStepsBox
                    icon="next"
                    sectionTitle="What’s New"
                    iconClass="next-icon"
                    sectionText="See details on our latest updates."
                    linkText="Read More"
                    ariaLabel="Read More"
                    title="Read More"
                    linkUrl="#/WhatsNew" />
            </div>
        );
    }
}
