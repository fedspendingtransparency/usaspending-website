/**
 * AboutTheDataLink.jsx
 * Created by Andrea Blackwell 04/17/2023
 */

import React from 'react';
import PropTypes from 'prop-types';

import schema from "dataMapping/aboutTheDataSchema";
import { Link } from "react-router";
import { getDrilldownEntrySectionAndId } from "helpers/aboutTheDataSidebarHelper";
import { showSlideout } from '../../helpers/slideoutHelper';

const propTypes = {
    entry: PropTypes.string
};

const AboutTheDataLink = ({ slug, children }) => {
    const item = getDrilldownEntrySectionAndId(schema, slug);
    const entry = item.section.fields[item?.entryId];
    const openAboutTheDataSidebar = (e) => {
        showSlideout('atd', { term: entry });
        e.stopPropagation();
    };
    return (
        <Link
            to=""
            className="usda-atd-link"
            aria-label="Open the About the Data"
            onClick={(e) => openAboutTheDataSidebar(e)}>
            {children}
        </Link>
    );
};

AboutTheDataLink.propTypes = propTypes;
export default AboutTheDataLink;
