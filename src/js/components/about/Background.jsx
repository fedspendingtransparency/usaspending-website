/**
 * Background.jsx
 * Created by Mike Bray 11/20/20178
 */

import React from 'react';

export default class Background extends React.Component {
    render() {
        return (
            <div
                className="about-section-wrapper"
                id="about-background">
                <div className="about-section-title">
                    <h2>Background</h2>
                </div>
                <div className="about-subtitle">
                    <h3>A continuing effort.</h3>
                </div>
                <div className="about-section-content">
                    <p>
                        USAspending.gov was created by the Federal Funding Accountability and
                        Transparency Act of 2006 (FFATA) and was launched in 2007.
                    </p>
                    <p>
                        The transparency efforts of FFATA were expanded with the enactment of the
                        Digital Accountability and Transparency Act (DATA Act) Pub. L. 113-101 on
                        May 9, 2014.  The DATA Act requires that:
                    </p>
                </div>
                <div className="about-subtitle">
                    <h3>DATA Act Requirements:</h3>
                </div>
                <div className="about-section-content">
                    <ul>
                        <li>
                            Agency spending by specific federal programs be linked to federal
                            contract, grant, loan, and direct payment awards so it is easier to
                            see what program funds each award.
                        </li>
                        <li>
                            Government-wide data definitions be created to provide consistent
                            and accurate data;
                        </li>
                        <li>
                            Agency reporting be simplified to reduce the cost to agencies while
                            improving transparency of the data;
                        </li>
                        <li>
                            The quality of data submitted to USAspending.gov be improved;  and
                        </li>
                        <li>
                            Federal agencies be held responsible for the data they report.
                        </li>
                    </ul>
                </div>
                <div className="about-section-content">
                    <p>
                        The new DATA Act data was displayed for the first time on May 9, 2017
                        and is updated quarterly.
                    </p>
                </div>
            </div>
        );
    }
}
