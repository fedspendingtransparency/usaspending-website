/**
 * DataSourcesAndMethodology.jsx
 * Created by Max Kendall and Marcy Held 07/08/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import kGlobalConstants from 'GlobalConstants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    handleExternalLinkClick: PropTypes.func
};

const DataSourcesAndMethodology = ({
    handleExternalLinkClick
}) => {
    const handleClick = (e) => {
        e.preventDefault();
        handleExternalLinkClick(e.target.href);
    };
    return (
        <div className="heading__container information-body">
            <div className="information-top dsm--border-radius" />
            <div className="dsm__container">
                <h2 className="dsm__heading">Data Sources &amp; Methodology</h2>
                <div className="dsm__topSection">
                    <p>Government spending funded by COVID-19 supplemental appropriations is tracked through the use of Disaster Emergency Fund Codes (DEFC). This page brings together agency financial and award data submitted monthly, covering activity beginning April 1, 2020. The data in all tables and visualizations are aggregates of all records tagged with an appropriate COVID-19 DEFC.</p>
                    <p>Learn more about our <a href="#/disaster/covid-19/data-sources">data sources and calculation methods</a>, including details about our COVID-19 download options. {!kGlobalConstants.CARES_ACT_RELEASED_2 && <strong>Check back for more information in the coming days as we continue to update the data on this page.</strong>}</p>
                </div>
                <div className="bottomSection">
                    <h2 className="dsm__heading">Other Resources</h2>
                    <ul className="otherResources__list">
                        <li>
                            Pandemic Response Accountability Committee (PRAC) -
                            <a
                                href=" https://pandemic.oversight.gov/track-the-money "
                                onClick={handleClick}>
                                {" https://pandemic.oversight.gov/track-the-money "}
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Federal Reserve Board -
                            <a
                                href=" https://www.federalreserve.gov/covid-19.htm "
                                onClick={handleClick}>
                                {" https://www.federalreserve.gov/covid-19.htm "}
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Department of Agriculture -
                            <a
                                href=" https://www.usda.gov/coronavirus "
                                onClick={handleClick}>
                                {" https://www.usda.gov/coronavirus "}
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Department of Defense -
                            <a
                                href=" https://www.defense.gov/Explore/Spotlight/Coronavirus/ "
                                onClick={handleClick}>
                                {" https://www.defense.gov/Explore/Spotlight/Coronavirus/ "}
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Department of Education -
                            <a
                                href=" https://www.ed.gov/coronavirus "
                                onClick={handleClick}>
                                {" https://www.ed.gov/coronavirus "}
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Department of Homeland Security -
                            <a
                                href=" https://www.dhs.gov/coronavirus/overview-dhs-response "
                                onClick={handleClick}>
                                {" https://www.dhs.gov/coronavirus/overview-dhs-response "}
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Department of Labor -
                            <a
                                href=" https://www.dol.gov/coronavirus "
                                onClick={handleClick}>
                                {" https://www.dol.gov/coronavirus "}
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Department of Transportation -
                            <a
                                href=" https://www.transportation.gov/coronavirus "
                                onClick={handleClick}>
                                {" https://www.transportation.gov/coronavirus "}
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Department of the Treasury -
                            <a
                                href=" https://home.treasury.gov/policy-issues/cares "
                                onClick={handleClick}>
                                {" https://home.treasury.gov/policy-issues/cares "}
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Department of Veterans Affairs -
                            <a
                                href=" https://www.publichealth.va.gov/n-coronavirus/ "
                                onClick={handleClick}>
                                {" https://www.publichealth.va.gov/n-coronavirus/ "}
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Department of Health &amp; Human Services -
                            <a
                                href=" https://www.hhs.gov/coronavirus "
                                onClick={handleClick}>
                                {" https://www.hhs.gov/coronavirus "}
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Housing &amp; Urban Development -
                            <a
                                href=" https://www.hud.gov/coronavirus "
                                onClick={handleClick}>
                                {" https://www.hud.gov/coronavirus "}
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Small Business Administration -
                            <a
                                href=" https://www.sba.gov/page/coronavirus-covid-19-small-business-guidance-loan-resources "
                                onClick={handleClick}>
                                {" https://www.sba.gov/page/coronavirus-covid-19-small-business-guidance-loan-resources "}
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

DataSourcesAndMethodology.propTypes = propTypes;

export default DataSourcesAndMethodology;
