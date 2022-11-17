/**
 * AboutTheDataByPage.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import AgencyMD from '../../../content/about-the-data/pages/agency.md';

const propTypes = {
    section: PropTypes.string,
    url: PropTypes.string
};

const AboutTheDataByPage = ({ section, url }) => {
    console.log('url prop', url);

    const [markdownFilename, setMarkdownFilename] = useState('');

    const checkSchemaForUrlSlug = () => {
        // iterate through each section.fields.route and if any of those are in the url
        // then make .route the markdownFilename
        const resultsArray = section.fields.filter((item) => url.includes(item.route));
        console.log('resultsArray', resultsArray);
        setMarkdownFilename(resultsArray[0]?.route);
    };

    useEffect(() => {
        checkSchemaForUrlSlug(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    console.log('markdownFilename', markdownFilename);

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
