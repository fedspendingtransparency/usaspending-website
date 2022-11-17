/**
 * AboutTheDataByPage.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React, { useState } from 'react';
import PropTypes from "prop-types";
import AgencyMD from '../../../content/about-the-data/pages/agency.md';

const propTypes = {
    section: PropTypes.string,
    url: PropTypes.string
};

const AboutTheDataByPage = ({ section, url }) => {
    console.log('section prop', section);
    console.log('url prop', url);

    const [markdownFilename, setMarkdownFilename] = useState();

    const checkSchemaForUrlSlug = (url) => {
        // map through each section.fields.route and if any of those match the url
        // then make .route the markdownFilename
    };

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
