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
                    Join the conversation
                </h2>
                <p
                    className="homepage-community__description">
                    We want to know how we can serve you better. Drop by our community page to ask questions, propose new features, sign up for testing, and join the conversation about federal spending data.
                </p>
                <a
                    className="homepage-community__link"
                    href="https://usaspending-help.zendesk.com/hc/en-us/community/topics"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={clickedHomepageLink.bind(null, 'https://usaspending-help.zendesk.com/hc/en-us/community/topics')}>
                    Visit our community page
                </a>
            </div>
            <div className="homepage-community__image-wrapper homepage-community__image-wrapper_desktop">
                <img
                    src="img/homepage-community.png"
                    srcSet="img/homepage-community.png 1x, img/homepage-community@2x.png 2x"
                    alt="Speech bubbles" />
            </div>
        </div>
    </section>
);

export default Community;
