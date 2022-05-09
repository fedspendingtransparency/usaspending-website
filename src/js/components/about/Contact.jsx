/**
 * Contact.jsx
 * Created by Mike Bray 11/20/20178
 */

import React from 'react';

export default class Contact extends React.Component {
    render() {
        return (
            <div
                className="about-section-wrapper"
                id="about-contact">
                <h2 className="about-section-title">
                    Contact Us
                </h2>
                <h3 className="about-subtitle">
                    How to reach us.
                </h3>
                <div className="about-section-content">
                    <p>
                        We look forward to hearing from you and having the opportunity to answer
                        your questions and comments.
                    </p>
                    <div className="about-section-content-inline-buttons">
                        <div className="button-holder">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://fiscalservice.force.com/usaspending/s/">
                                <button
                                    className="usa-button-outline"
                                    aria-label="Visit Our Community Page"
                                    title="Visit Our Community Page">
                                    Visit Our Community Page
                                </button>
                            </a>
                        </div>
                        <div className="button-holder">
                            <a href="mailto:usaspending.help@fiscal.treasury.gov?subject=Contact%20Us">
                                <button
                                    className="usa-button-outline"
                                    aria-label="Send Us A Message"
                                    title="Send Us A Message">
                                    Send Us A Message
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
