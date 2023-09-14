/**
 * Development.jsx
 * Created by Lizzie Salita 7/10/19
 */

import React from 'react';

import * as redirectHelper from 'helpers/redirectHelper';

const Development = () => {
    const clickedLink = () => {
        redirectHelper.showRedirectModal('https://github.com/fedspendingtransparency/usaspending-website/wiki');
    };

    return (
        <div
            className="about-section-wrapper"
            id="about-development">
            <h2 className="about-section-title">
                Development and Releases
            </h2>
            <div className="about-section-content">
                <p>
                    USAspending.gov is developed using agile methods. Our current release approach is a two-week development sprint, followed by a two-week testing period, followed by public release. We begin coding the next sprint at the same time we&rsquo;re testing the first sprint, so updates are published to the website about every two weeks. If you want us to send you the Release Notes when an update goes out, please{' '}
                    <a
                        href="mailto:join-usaspending@lists.fiscal.treasury.gov?subject=Yes!%20I'd%20like%20to%20receive%20updates.">
                        sign up here
                    </a>. Previous Release Notes are available&nbsp;
                    <button
                        className="usa-button-link"
                        role="link"
                        onClick={clickedLink}>
                        here
                    </button>.
                </p>
            </div>
        </div>
    );
};

export default Development;

