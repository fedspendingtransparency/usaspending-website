/**
 * OtherResources.jsx
 * Created by Max Kendall and Marcy Held 07/08/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const propTypes = {
    handleExternalLinkClick: PropTypes.func
};

const OtherResources = ({ handleExternalLinkClick }) => {
    const handleClick = (e) => {
        e.preventDefault();
        handleExternalLinkClick(e.target.href);
    };
    return (
        <div className="resources__container">
            <h4>Other Resources</h4>
            <hr />
            <div className="other-resources__link__container">
                <ul className="otherResources__list">
                    <li>
                        <a
                            href="https://www.pandemicoversight.gov/"
                            onClick={handleClick}>
                                        Pandemic Response Accountability Committee (PRAC)
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.pandemicoversight.gov/media/file/american-rescue-plan-act-infographicpdf"
                            onClick={handleClick}>
                                        American Rescue Plan Act Infographic (PRAC)
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.federalreserve.gov/covid-19.htm"
                            onClick={handleClick}>
                                        Federal Reserve Board
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.usda.gov/coronavirus"
                            onClick={handleClick}>
                                    Department of Agriculture
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.defense.gov/Explore/Spotlight/Coronavirus/"
                            onClick={handleClick}>
                                    Department of Defense
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.ed.gov/coronavirus"
                            onClick={handleClick}>
                                    Department of Education
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.dhs.gov/coronavirus/overview-dhs-response"
                            onClick={handleClick}>
                                    Department of Homeland Security
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://oui.doleta.gov/unemploy/docs/cares_act_funding_state.html"
                            onClick={handleClick}>
                                    Department of Labor
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.transportation.gov/coronavirus"
                            onClick={handleClick}>
                                    Department of Transportation
                        </a>
                    </li>
                </ul>


                <ul className="otherResources__list">
                    <li>
                        <a
                            href="https://home.treasury.gov/policy-issues/coronavirus"
                            onClick={handleClick}>
                                    Department of the Treasury
                        </a>
                        <ul className="indent-link">
                            <li>
                                <a
                                    href="https://www.irs.gov/statistics/soi-tax-stats-coronavirus-aid-relief-and-economic-security-act-cares-act-statistics"
                                    onClick={handleClick}>
                                        Internal Revenue Service
                                </a>
                            </li>
                            <li>
                                <a
                                    className="indent-link"
                                    href="https://home.treasury.gov/system/files/136/ERA-Subawards-USASpending-File.xlsx">
                                        ERA -Subawards (Excel)
                                </a>
                            </li>
                            <li>
                                <a
                                    className="indent-link"
                                    href="https://home.treasury.gov/system/files/136/SLFRF-Subaward-USASpending-File.xlsx">
                                        SLFRF Subaward (Excel)
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            href="https://www.publichealth.va.gov/n-coronavirus/"
                            onClick={handleClick}>
                                    Department of Veterans Affairs
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.hhs.gov/coronavirus"
                            onClick={handleClick}>
                                        Department of Health & Human Services
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.sba.gov/funding-programs/loans/covid-19-relief-options"
                            onClick={handleClick}>
                                    Small Business Administration
                        </a>
                    </li>
                    <li>
                        <Link to="/disaster/covid-19/the-opportunity-project">
                                    The Opportunity Project
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

OtherResources.propTypes = propTypes;

export default OtherResources;
