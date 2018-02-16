/**
 * MoreInfo.jsx
 * Created by Kevin Li 2/7/18
 */

import React from 'react';

const MoreInfo = () => (
    <div
        className="about-section-wrapper"
        id="about-more-info">
        <div className="about-section-title">
            <h2>More Information</h2>
        </div>
        <div className="about-section-content">
            <p>
                For more information about the data, see the&nbsp;
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://usaspending-help.zendesk.com/hc/en-us/sections/115000739433-Frequently-Ask-Questions-">
                    FAQs
                </a>
                &nbsp;and the&nbsp;
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://fedspendingtransparency.github.io/data-dictionary/">
                    Data Dictionary
                </a>
                .
            </p>
            <p>
                You can also see an interactive report on how frequently federal agencies use
                competitive practices when issuing contracts for goods and services in our&nbsp;
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://datalab.usaspending.gov/competition-contracting.html">
                    Data Lab
                </a>
                .
            </p>
        </div>
    </div>
);

export default MoreInfo;
