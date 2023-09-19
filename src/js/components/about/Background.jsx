/**
 * Background.jsx
 * Created by Mike Bray 11/20/20178
 */

import React from 'react';

const Background = () => (
    <div
        className="about-section-wrapper"
        id="about-background">
        <h2 className="about-section-title">
                Background
        </h2>
        <h3 className="about-subtitle">
                A continuing effort.
        </h3>
        <div className="about-section-content">
            <p>
                    The Federal Funding Accountability and Transparency Act of 2006 (FFATA)
                    was signed into law on September 26, 2006. The legislation required that
                    federal contract, grant, loan, and other financial assistance awards of
                    more than $25,000 be displayed on a publicly accessible and searchable
                    website to give the American public access to information on how their
                    tax dollars are being spent. In 2008, FFATA was amended by the Government
                    Funding Transparency Act, which required prime recipients to report
                    details on their first-tier sub-recipients for awards made as of
                    October 1, 2010.
            </p>
            <p>
                    The transparency efforts of FFATA were expanded with the enactment of
                    the Digital Accountability and Transparency Act (DATA Act) Pub. L.
                    113-101 on May 9, 2014.
            </p>
            <p>
                <strong>
                        The purpose of the DATA Act, as directed by Congress, is to:
                </strong>
            </p>
            <ul>
                <li>
                        Expand FFATA by disclosing direct agency expenditures and linking
                        federal contract, loan, and grant spending information to federal
                        agency programs
                </li>
                <li>
                        Establish government-wide data standards for financial data and
                        provide consistent, reliable, and searchable data that is displayed
                        accurately
                </li>
                <li>
                        Simplify reporting, streamline reporting requirements, and reduce
                        compliance costs, while improving transparency
                </li>
                <li>
                        Improve the quality of data submitted to USAspending.gov by holding
                        agencies accountable.
                </li>
            </ul>
        </div>
    </div>
);

export default Background;
