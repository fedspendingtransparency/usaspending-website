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
                    icon="guide"
                    sectionTitle="Guide"
                    iconClass="guide-icon"
                    sectionText="Descriptions of commonly used terms."
                    linkText="Download Descriptions"
                    ariaLabel="Guide"
                    title="Guide"
                    linkUrl="/graphics/USAspendingGuide.xlsx" />
                <NextStepsBox
                    icon="contact"
                    sectionTitle="Contact Us"
                    iconClass="contact-icon"
                    sectionText="We want to hear your questions and comments."
                    linkText="Email Us"
                    ariaLabel="Email Us"
                    title="Email US"
                    linkUrl="mailto:datapmo@fiscal.treasury.gov" />
                <NextStepsBox
                    icon="download"
                    sectionTitle="Agency Submission Files"
                    iconClass="download-icon"
                    sectionText="Access the data files submitted directly by agencies."
                    linkText="Download Files"
                    ariaLabel="Download Files"
                    title="Download Files"
                    linkUrl="" />
                <NextStepsBox
                    icon="next"
                    sectionTitle="What’s New"
                    iconClass="next-icon"
                    sectionText="We're adding new pages, features, and fixes every two weeks."
                    linkText="Read More"
                    ariaLabel="Read More"
                    title="Read More"
                    linkUrl="" />
            </div>
        );
    }
}
