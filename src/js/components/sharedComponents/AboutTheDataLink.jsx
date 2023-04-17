/**
 * AboutTheDataLink.jsx
 * Created by Andrea Blackwell 04/17/2023
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import schema from "dataMapping/aboutTheDataSchema";
import { showAboutTheData, setAboutTheDataTerm } from "redux/actions/aboutTheDataSidebar/aboutTheDataActions";
import { setLastOpenedSlideout } from 'redux/actions/slideouts/slideoutActions';
import { Link } from "react-router-dom";

const propTypes = {
    entry: PropTypes.string
};

const AboutTheDataLink = ({ slug, children }) => {
    const dispatch = useDispatch();
    const sections = Object.keys(schema);
    let entry;
    for (let i = 0; i < sections.length; i++) {
        entry = schema[sections[i]].fields.find((item) => item.slug === slug);
        if (entry && Object.keys(entry).length > 0) {
            break;
        }
    }

    const openAboutTheDataSidebar = (e) => {
        dispatch(setAboutTheDataTerm(entry));
        dispatch(showAboutTheData());
        dispatch(setLastOpenedSlideout('atd'));
        e.stopPropagation();
    };
    return (
        <Link
            className="usda-atd-link"
            aria-label="Open the About the Data"
            onClick={(e) => openAboutTheDataSidebar(e)}>
            {children}
        </Link>
    );
};

AboutTheDataLink.propTypes = propTypes;
export default AboutTheDataLink;
