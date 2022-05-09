/**
 * Community.jsx
 * Created by Kevin Li 1/26/18
 */

import React from 'react';
import Analytics from 'helpers/analytics/Analytics';

const clickedHomepageLink = (route) => {
    Analytics.event({
        category: 'Homepage - Link',
        action: route
    });
};

const Community = () => (
    <section
        className="homepage-community"
        aria-label="Community">
        <div className="homepage-community__wrapper">
            <div className="homepage-community__content">
                <h2
                    className="homepage-community__title"
                    tabIndex={-1}>
                    Join the Conversation
                </h2>
                <p
                    className="homepage-community__description">
                    We want to know how we can serve you better. Drop by our community page or send us a message to ask questions, propose new features, sign up to be a user tester, and join the conversation about federal spending data.
                </p>
                <div className="homepage-community-button__container">
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        tabIndex={-1}
                        href="https://fiscalservice.force.com/usaspending/s/"
                        onClick={clickedHomepageLink.bind(null, 'https://fiscalservice.force.com/usaspending/s/')}>
                        <button
                            className="homepage-community-button__visit"
                            aria-label="Visit Our Community Page"
                            title="Visit Our Community Page">
                            Visit Our Community Page
                        </button>
                    </a>
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        tabIndex={-1}
                        href="mailto:usaspending.help@fiscal.treasury.gov?subject=Contact%20Us"
                        onClick={clickedHomepageLink.bind(
                            null,
                            'mailto:usaspending.help@fiscal.treasury.gov?subject=Contact%20Us'
                        )}>
                        <button
                            className="homepage-community-button__email"
                            aria-label="Send Us A Message"
                            title="Send Us A Message">
                            Send Us A Message
                        </button>
                    </a>
                </div>
            </div>
            <div className="homepage-community__image-wrapper homepage-community__image-wrapper_desktop">
                <img
                    src="img/homepage-community/homepage-community@1-5x.png"
                    srcSet="img/homepage-community/homepage-community@1-5x.webp 1x, img/homepage-community/homepage-community@2x.webp 2x"
                    alt=""
                    role="presentation" />
            </div>
        </div>
    </section>
);

export default Community;
