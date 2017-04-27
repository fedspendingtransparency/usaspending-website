/**
 * BudgetProcess.jsx
 * Created by Destin Frasier 04/27/2017
 **/

import React from 'react';
import * as AboutIcons from 'components/sharedComponents/icons/about/AboutIcons';

export default class NextSteps extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <div className="block-wrap">
                    <div className="icon-wrap">
                        <div className="faq-icon">
                            <AboutIcons.QAIcon className="usa-da-qa-icon" />
                        </div>
                    </div>
                    <h6>Frequently Asked Questions</h6>
                    <p>Get answers to commonly asked questions</p>
                    <a href="#">
                        <button className="usa-button-outline" title="View FAQ" aria-label="View FAQ">View FAQ</button>
                    </a>
                </div>
                <div className="block-wrap">
                    <div className="icon-wrap">
                        <div className="contact-icon">
                            <AboutIcons.ContactIcon className="usa-da-contact-icon" />
                        </div>
                    </div>
                    <h6>Contact Us</h6>
                    <p>We want to hear your questions and comments</p>
                    <a href="#">
                        <button className="usa-button-outline" title="Email Us" aria-label="Email Us">Email Us</button>
                    </a>
                </div>
                <div className="block-wrap">
                    <div className="icon-wrap">
                        <div className="download-icon">
                            <AboutIcons.DownloadIcon className="usa-da-download-icon" />
                        </div>
                    </div>
                    <h6>Agency Raw Submission Files</h6>
                    <p>Access the data files submitted directly by agencies</p>
                    <a href="#">
                        <button className="usa-button-outline" title="Download Files" aria-label="Download Files">Download Files</button>
                    </a>
                </div>
                <div className="block-wrap">
                    <div className="icon-wrap">
                        <div className="next-icon">
                            <AboutIcons.WhatsNextIcon className="usa-da-whats-next-icon" />
                        </div>
                    </div>
                    <h6>What’s Next</h6>
                    <p>We&#8216;re adding new pages, features, and fixes every two weeks</p>
                    <a href="#">
                        <button className="usa-button-outline" title="Read More" aria-label="Read More">Read More</button>
                    </a>
                </div>
            </div>
        );
    }
}
