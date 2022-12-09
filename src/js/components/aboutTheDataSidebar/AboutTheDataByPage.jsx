/**
 * AboutTheDataByPage.jsx
 * Created by Andrea Blackwell 11/14/22
 */

/*
    USAGE - <AboutTheDataByPage section={schema["by-page"]} pathname={pathname} />
    Removed for MVP
*/

import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import AgencyMD from '../../../content/about-the-data/pages/agency.md';

const propTypes = {
    section: PropTypes.object,
    pathname: PropTypes.string
};

const AboutTheDataByPage = ({ section, pathname }) => {
    // eslint-disable-next-line no-unused-vars
    const [markdownFilename, setMarkdownFilename] = useState('');

    const checkSchemaForUrlSlug = () => {
        const splitPathname = pathname.split('/')[1];
        const resultsArray = section.fields.filter((item) => splitPathname.includes(item.route));
        setMarkdownFilename(resultsArray[0]?.route);
    };

    useEffect(() => {
        if (pathname) {
            checkSchemaForUrlSlug();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <div className="atd-page-section__container">
            <div className="atd__heading">{section.label}</div>
            <hr />
            <div className="atd-page-section__body">
                <AgencyMD />
            </div>
        </div>
    );
};

AboutTheDataByPage.propTypes = propTypes;
export default AboutTheDataByPage;
