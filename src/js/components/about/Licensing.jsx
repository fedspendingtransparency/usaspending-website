/**
 * Licensing.jsx
 * Created by Joanthan Hill 07/22/19
 */

import React from 'react';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { showModal } from 'redux/actions/modal/modalActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Licensing = () => {
    const dispatch = useDispatch();
    const onClick = () => dispatch(showModal('https://github.com/fedspendingtransparency'));
    return (
        <div
            className="about-section-wrapper"
            id="about-licensing">
            <h2 className="about-section-title">
                Licensing
            </h2>
            <div className="about-section-content">
                <p>
                    The U.S. Department of the Treasury, Bureau of the Fiscal
                    Service is committed to providing open data to enable effective
                    tracking of federal spending.  The data on this site is available
                    to copy, adapt, redistribute, or otherwise use for non-commercial
                    or for commercial purposes, subject to the Limitation on Permissible
                    Use of Dun &amp; Bradstreet, Inc. Data&nbsp;
                    <Link to="/db_info">
                        noted on the homepage
                    </Link>.
                </p>
                <p>
                    The code in our&nbsp;
                    <button
                        className="usa-button-link"
                        role="link"
                        onClick={onClick}>
                        public github repository
                        <span className="usa-button-link__icon"><FontAwesomeIcon icon="external-link-alt" /></span>
                    </button>
                    &nbsp;is available for public use under the Creative
                    Commons CC0 Public Domain Dedication license.
                </p>
                <h3 className="about-subtitle">Citations</h3>
                <p>There are a few different ways to cite data from USAspending.gov. Reference the examples below, based on the type of data being cited.</p>
                <h4 className="about-citation">Suggested General Citation</h4>
                <p><span className="citation-it">USAspending.gov</span>, U.S. Department of Treasury, Bureau of the Fiscal Service,
                    <br />&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.usaspending.gov">https://www.usaspending.gov</a>. Accessed [Day] [Month]. [Year].
                </p>
                <h4 className="about-citation">Suggested Specific Profile/Award Citations</h4>
                <p>“Contract to Science Systems and Applications, INC.” <span className="citation-it">USAspending.gov</span>,
                    <br />&nbsp;&nbsp;&nbsp;&nbsp;<a href="www.usaspending.gov/award/CONT_AWD_NNG17HP01C_8000_-NONE-_-NONE-">www.usaspending.gov/award/CONT_AWD_NNG17HP01C_8000_-NONE-_-NONE-</a>. Accessed [Day] [Month]. [Year].
                </p>
                <p>“State Profile: Maine.” <span className="citation-it">USAspending.gov</span>,
                    <br />&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.usaspending.gov/state/maine/2025">https://www.usaspending.gov/state/maine/2025</a>. Accessed [Day] [Month]. [Year].
                </p>
            </div>
        </div>
    );
};

export default Licensing;
