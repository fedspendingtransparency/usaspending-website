/**
 * AboutTheDataMarkdownLink.jsx
 * Created by Brian Petway 12/09/22
 */

import React from 'react';
import PropTypes from 'prop-types';
import { showSlideout } from '../../helpers/slideoutHelper';

const propTypes = {
    name: PropTypes.string,
    slug: PropTypes.string,
    openPanel: PropTypes.bool
};

export const AboutTheDataMarkdownLink = ({ name, slug, openPanel = false }) => {
    const obj = {
        name,
        slug
    };
    const clickFunction = (e) => {
        e.preventDefault();
        showSlideout('atd', { term: obj, open: openPanel });
        if (openPanel) {
            e.stopPropagation();
        }
    };
    return (
        <a href={`?about-the-data=${slug}`} onClick={clickFunction}>
            {name}
        </a>
    );
};

AboutTheDataMarkdownLink.propTypes = propTypes;
export default AboutTheDataMarkdownLink;
