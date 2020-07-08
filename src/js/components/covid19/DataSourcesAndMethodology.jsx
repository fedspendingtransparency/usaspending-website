import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DataSourcesAndMethodology = () => (
    <div className="heading__container information-body">
        <div className="information-top" />
        <div className="dsm-section">
                <h2 className="dsm-topHeading">Data Sources &amp; Methodology</h2>
                <div className="dsm-topSection">
                    <div className = "data-sources">
                        <h3 className="dsm-secondHeading">Data Sources</h3>
                        <p>Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                    </div>
                    <div className = "methodology">
                        <h3 className="dsm-secondHeading">Methodology</h3>
                        <p>Maecenas sed diam eget risus varius blandit sit amet non magna. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus mollis interdum. Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue.</p>
                    </div>
                </div>
                <div className = "other-resources">
                    <h2 className="dsm-topHeading">Other Resources</h2>
                    <ul className="dsm-list">
                        <li>Department of Health and Human Services - <a href="tbd">URLhere.gov <FontAwesomeIcon size="sm" icon="external-link-alt" /></a></li>
                        <li>Department of Labor - <a href="tbd">URLhere.gov <FontAwesomeIcon size="sm" icon="external-link-alt" /></a></li>
                        <li>Department of the Treasury - <a href="tbd">URLhere.gov <FontAwesomeIcon size="sm" icon="external-link-alt" /></a></li>
                        <li>Federal Reserve - <a href="tbd">URLhere.gov <FontAwesomeIcon size="sm" icon="external-link-alt" /></a></li>
                        <li>General Services Administration - <a href="tbd">URLhere.gov <FontAwesomeIcon size="sm" icon="external-link-alt" /></a></li>
                        <li>Pandemic Response Accountability Committee - <a href="tbd">URLhere.gov <FontAwesomeIcon size="sm" icon="external-link-alt" /></a></li>
                        <li>Small Business Administration - <a href="tbd">URLhere.gov <FontAwesomeIcon size="sm" icon="external-link-alt" /></a></li>
                    </ul>
                </div>
            </div>
    </div>
);

export default DataSourcesAndMethodology;