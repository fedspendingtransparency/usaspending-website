/**
 * DataSourcesAndMethodology.jsx
 * Created by Max Kendall and Marcy Held 07/08/20
 */

import React from 'react';
import PropTypes from 'prop-types';
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
                <h2 className="dsm__topHeading">Data Sources &amp; Methodology</h2>
                <div className="dsm__topSection">
                    <div className="topSection__data-sources">
                        <h3 className="topSection__secondHeading">Data Sources</h3>
                        <p>Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                    </div>
                    <div className="topSection__methodology">
                        <h3 className="topSection__secondHeading">Methodology</h3>
                        <p>Maecenas sed diam eget risus varius blandit sit amet non magna. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus mollis interdum. Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue.</p>
                    </div>
                </div>
                <div className="bottomSection">
                    <h2 className="dsm__topHeading">Other Resources</h2>
                    <ul className="otherResources__list">
                        <li>
                            Department of Health and Human Services -
                            <a
                                href="URLhere.gov"
                                onClick={handleClick}>
                                    URLhere.gov
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Department of Labor -
                            <a
                                href="URLhere.gov"
                                onClick={handleClick}>
                                    URLhere.gov
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Department of the Treasury -
                            <a
                                href="URLhere.gov"
                                onClick={handleClick}>
                                    URLhere.gov
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Federal Reserve -
                            <a
                                href="URLhere.gov"
                                onClick={handleClick}>
                                    URLhere.gov
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            General Services Administration -
                            <a
                                href="URLhere.gov"
                                onClick={handleClick}>
                                    URLhere.gov
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Pandemic Response Accountability Committee -
                            <a
                                href="URLhere.gov"
                                onClick={handleClick}>
                                    URLhere.gov
                                <FontAwesomeIcon size="sm" icon="external-link-alt" />
                            </a>
                        </li>
                        <li>
                            Small Business Administration -
                            <a
                                href="URLhere.gov"
                                onClick={handleClick}>
                                    URLhere.gov
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
