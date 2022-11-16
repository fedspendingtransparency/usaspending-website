/**
 * AboutTheDataByPage.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React from 'react';
import PropTypes from "prop-types";
import AgencyMD from '../../../content/about-the-data/pages/agency.md';

const propTypes = {
    section: PropTypes.string
};

const AboutTheDataByPage = ({ section }) => {
    console.log('section prop', section);
    return (
        <div className="atd-page-section__container">
            <div className="atd__heading">{section.label}</div>
            <hr />
            <AgencyMD />
        </div>
    );
};

AboutTheDataByPage.propTypes = propTypes;
export default AboutTheDataByPage;
