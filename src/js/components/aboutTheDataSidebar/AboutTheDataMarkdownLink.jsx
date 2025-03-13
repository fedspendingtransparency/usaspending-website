/**
 * AboutTheDataMarkdownLink.jsx
 * Created by Brian Petway 12/09/22
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    slug: PropTypes.string,
    openPanel: PropTypes.bool
};

export const AboutTheDataMarkdownLink = ({ name, slug, openPanel = false }) => {
    const dispatch = useDispatch();
    const obj = {
        name,
        slug
    };
    const clickFunction = (e) => {
        e.preventDefault();
        if (openPanel) {
            dispatch(aboutTheDataActions.showAboutTheData());
            e.stopPropagation();
        }
        dispatch(aboutTheDataActions.setAboutTheDataTerm(obj));
    };
    return (
        <a href={`?about-the-data=${slug}`} onClick={clickFunction}>
            {name}
        </a>
    );
};

AboutTheDataMarkdownLink.propTypes = propTypes;
export default AboutTheDataMarkdownLink;
