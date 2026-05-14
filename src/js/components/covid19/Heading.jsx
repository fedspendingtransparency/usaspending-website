/**
 * Heading.jsx
 * Created by Jonathan Hill 06/10/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { jumpToSection } from 'helpers/covid19Helper';

const propTypes = {
    publicLaw: PropTypes.string
};

const Heading = ({ publicLaw }) => {
    const jumpToDataSources = () => {
        jumpToSection('data_sources_and_methodology');
    };
    return (
        <div
            className={`heading__container 
            ${publicLaw === 'american-rescue-plan' ? 'information-body-arp' : 'information-body'}`}>
            <div className="aligned-heading">
                {publicLaw === 'american-rescue-plan' ?
                    <div className="heading__description">
                        <p>In March 2021, the U.S. Congress appropriated additional funds in response to the COVID-19 pandemic through the American Rescue Plan Act of 2021. See how much has been spent, how spending is categorized, who received funding, and more.</p>
                        <p>
                            Visit our <button className="usa-button-link" onClick={jumpToDataSources}> Data Sources & Methodology </button> section to learn more about the underlying data, downloading the data, and resources about COVID-19 from other agencies.
                        </p>
                    </div>
                    :
                    <div className="heading__description">
                        <p>In early 2020, the U.S. Congress appropriated funds in response to the COVID-19 pandemic. These funds were made possible through the Coronavirus Aid, Relief, and Economic Security (CARES) Act and other supplemental legislation. In March of 2021, additional funds were appropriated through the American Rescue Plan Act.</p>
                        <p>
                            Visit our <button className="usa-button-link" onClick={jumpToDataSources}>Data Sources & Methodology</button> section to learn more about the underlying data, downloading the data, and resources about COVID-19 from other agencies.
                        </p>
                    </div>
                }

            </div>
        </div>
    );
};

Heading.propTypes = propTypes;
export default Heading;
