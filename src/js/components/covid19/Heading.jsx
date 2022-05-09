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
        <div className={`heading__container ${publicLaw === 'american-rescue-plan' ? 'information-body-arp' : 'information-body'}`}>
            {publicLaw === 'american-rescue-plan' ?
                <h2 className="heading__title">
                    The Federal Response to COVID-19: <span className="color-blue-arp">The American Rescue Plan</span>
                </h2> :
                <h2 className="heading__title">
                    The Federal Response to <span className="color-purple">COVID-19</span>
                </h2>
            }
            <div className="aligned-heading">
                {publicLaw === 'american-rescue-plan' ?
                    <div className="heading__description">
                        <p>In March 2021, the U.S. Congress appropriated additional funds in response to the COVID-19 pandemic through the American Rescue Plan Act of 2021. See how much has been spent, how spending is categorized, who received funding, and more.</p>
                        <p>
                            <button className="usa-button-link" onClick={jumpToDataSources}>Visit our Data Sources & Methodology</button> section to learn more about the underlying data and find resources about COVID-19 from other agencies.
                        </p>
                    </div>
                    :
                    <div className="heading__description">
                        <p>In early 2020, the U.S. Congress appropriated funds in response to the COVID-19 pandemic. These funds were made possible through the Coronavirus Aid, Relief, and Economic Security (CARES) Act and other supplemental legislation. In March of 2021, additional funds were appropriated through the American Rescue Plan Act.</p>
                        <p>
                            <button className="usa-button-link" onClick={jumpToDataSources}>Visit our Data Sources & Methodology</button> section to learn more about the underlying data and find resources about COVID-19 from other&nbsp;agencies.
                        </p>
                    </div>
                }
                {publicLaw === 'american-rescue-plan' ?
                    <>
                        <picture className="heading__img-arp">
                            <source srcSet="img/ARPA-illustration.webp 1x, img/ARPA-illustration.webp 2x" type="image/webp" />
                            <img src="img/ARPA-illustration.svg" alt="" />
                        </picture>
                    </> :
                    <>
                        <picture className="heading__img-all">
                            <source srcSet="img/All-Public-Laws-Illustration.webp 1x" type="image/webp" />
                            <img src="img/All-Public-Laws-Illustration.svg" alt="" />
                        </picture>
                    </>
                }
            </div>
        </div>
    );
};

Heading.propTypes = propTypes;
export default Heading;
