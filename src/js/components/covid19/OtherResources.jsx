/**
 * OtherResources.jsx
 * Created by Max Kendall and Marcy Held 07/08/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

const propTypes = {
    handleExternalLinkClick: PropTypes.func,
    publicLaw: PropTypes.string
};

const OtherResources = ({
    handleExternalLinkClick,
    publicLaw
}) => {
    const handleClick = (e) => {
        e.preventDefault();
        handleExternalLinkClick(e.target.href);
    };
    return (
        <div className={`heading__container ${publicLaw === 'american-rescue-plan' ? 'information-body-arp' : 'information-body'}`}>
            <div className="resources__container">
                <div className="bottomSection">
                    <h2 className="dsm__heading">Other Resources</h2>
                    <ul className="otherResources__list">
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                    American Rescue Plan -
                                </span>
                                <a
                                    href="https://www.whitehouse.gov/american-rescue-plan/"
                                    onClick={handleClick}>
                                    https://www.whitehouse.gov/american-rescue-plan/&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                    Pandemic Response Accountability Committee (PRAC) -
                                </span>
                                <a
                                    href="https://www.pandemicoversight.gov/"
                                    onClick={handleClick}>
                                    https://www.pandemicoversight.gov/&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                    American Rescue Plan Act Infographic (PRAC) -
                                </span>
                                <a
                                    href="https://www.pandemicoversight.gov/media/file/american-rescue-plan-act-infographicpdf"
                                    onClick={handleClick}>
                                    https://www.pandemicoversight.gov/media/file/american-rescue-plan-act-infographicpdf&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                    Federal Reserve Board -
                                </span>
                                <a
                                    href="https://www.federalreserve.gov/covid-19.htm"
                                    onClick={handleClick}>
                                    https://www.federalreserve.gov/covid-19.htm&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                    Department of Agriculture -
                                </span>
                                <a
                                    href="https://www.usda.gov/coronavirus"
                                    onClick={handleClick}>
                                    https://www.usda.gov/coronavirus&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                    Department of Defense -
                                </span>
                                <a
                                    href="https://www.defense.gov/Explore/Spotlight/Coronavirus/"
                                    onClick={handleClick}>
                                    https://www.defense.gov/Explore/Spotlight/Coronavirus/&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                    Department of Education -
                                </span>
                                <a
                                    href="https://www.ed.gov/coronavirus"
                                    onClick={handleClick}>
                                    https://www.ed.gov/coronavirus&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                Department of Homeland Security -
                                </span>
                                <a
                                    href="https://www.dhs.gov/coronavirus/overview-dhs-response"
                                    onClick={handleClick}>
                                    https://www.dhs.gov/coronavirus/overview-dhs-response&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                    Department of Labor -
                                </span>
                                <a
                                    href="https://oui.doleta.gov/unemploy/docs/cares_act_funding_state.html"
                                    onClick={handleClick}>
                                    https://oui.doleta.gov/unemploy/docs/cares_act_funding_state.html&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                    Department of Transportation -
                                </span>
                                <a
                                    href="https://www.transportation.gov/coronavirus"
                                    onClick={handleClick}>
                                    https://www.transportation.gov/coronavirus&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                    Department of the Treasury -
                                </span>
                                <a
                                    href="https://www.irs.gov/statistics/soi-tax-stats-coronavirus-aid-relief-and-economic-security-act-cares-act-statistics"
                                    onClick={handleClick}>
                                    https://www.irs.gov/statistics/soi-tax-stats-coronavirus-aid-relief-and-economic-security-act-cares-act-statistics&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />,{' '}
                                    </span>
                                </a>
                                <a
                                    href="https://home.treasury.gov/policy-issues/coronavirus"
                                    onClick={handleClick}>
                                    https://home.treasury.gov/policy-issues/coronavirus&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />,{' '}
                                    </span>
                                </a>
                                <a
                                    href="https://home.treasury.gov/system/files/136/ERA-Subawards-USASpending-File.xlsx">
                                    https://home.treasury.gov/system/files/136/ERA-Subawards-USASpending-File.xlsx,
                                </a>{' '}
                                <a
                                    href="https://home.treasury.gov/system/files/136/SLFRF-Subaward-USASpending-File.xlsx">
                                    https://home.treasury.gov/system/files/136/SLFRF-Subaward-USASpending-File.xlsx
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                    Department of Veterans Affairs -
                                </span>
                                <a
                                    href="https://www.publichealth.va.gov/n-coronavirus/"
                                    onClick={handleClick}>
                                    https://www.publichealth.va.gov/n-coronavirus/&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                    Department of Health &amp; Human Services -
                                </span>
                                <a
                                    href="https://www.hhs.gov/coronavirus"
                                    onClick={handleClick}>
                                    https://www.hhs.gov/coronavirus&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                    Housing &amp; Urban Development -
                                </span>
                                <a
                                    href="https://www.hud.gov/coronavirus"
                                    onClick={handleClick}>
                                    https://www.hud.gov/coronavirus&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                    Small Business Administration -
                                </span>
                                <a
                                    href="https://www.sba.gov/funding-programs/loans/covid-19-relief-options"
                                    onClick={handleClick}>
                                    https://www.sba.gov/funding-programs/loans/covid-19-relief-options&nbsp;
                                    <span className="other-resources__link__icon">
                                        <FontAwesomeIcon size="sm" icon="external-link-alt" />
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="other-resources__link__container">
                                <span className="other-resources__link__text">
                                    The Opportunity Project -
                                </span>
                                <Link to="/disaster/covid-19/the-opportunity-project">
                                    https://www.usaspending.gov/disaster/covid-19/the-opportunity-project
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

OtherResources.propTypes = propTypes;

export default OtherResources;
