/**
 * MoreInfo.jsx
 * Created by Kevin Li 2/7/18
 */

import React from 'react';
import { Link } from 'react-router-dom';


const MoreInfo = () => (
    <div
        className="about-section-wrapper"
        id="about-more-info">
        <h2 className="about-section-title">
            More Information
        </h2>
        <div className="about-section-content">
            <p>
                For more information about the data, see the{' '}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://fiscalservice.force.com/usaspending/s/">
                    FAQs
                </a>
                &nbsp;and the{' '}
                <Link to="/data-dictionary">
                    Data Dictionary
                </Link>
                .
            </p>
        </div>
    </div>
);

export default MoreInfo;
