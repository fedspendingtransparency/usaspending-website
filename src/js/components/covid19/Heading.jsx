/**
 * Heading.jsx
 * Created by Jonathan Hill 06/10/20
 */

import React from 'react';
import { jumpToSection } from 'helpers/covid19Helper';

const Heading = () => {
    const jumpToDataSources = () => {
        jumpToSection('data_sources_and_methodology');
    };
    return (
        <div className="heading__container information-body">
            <div className="heading__title">
                The Federal Response to <span className="color-purple">COVID-19</span>
            </div>
            <div className="heading__description">
                <p>In early 2020, the U.S. Congress appropriated funds in response to the COVID-19 pandemic. These funds were made possible through the Coronavirus Aid, Relief, and Economic Security (CARES) Act and other supplemental legislation. In March of 2021, additional funds were appropriated through the American Rescue Plan Act.</p>
                <p>
                    Visit our <button className="usa-button-link" onClick={jumpToDataSources}>Data Sources & Methodology</button> section to learn more about the underlying data and find resources about COVID-19 from other agencies.
                </p>
            </div>
            <div style={{ marginLeft: "auto" }} className="heading__img-wrapper">
                <img
                    className="heading__img"
                    src="img/desktop@2x.png"
                    alt="" />
            </div>
            <div style={{ marginLeft: "auto" }} className="heading__img-wrapper">
                <img
                    className="heading__img-mobile"
                    src="img/mobile@2x.png"
                    alt="" />
            </div>
        </div>
    );
};

export default Heading;
